import { CartEntity } from './../cart/entities/cart.entity';
import { CartItemEntity } from './../cart/entities/cart-item.entity';
import { UserEntity } from './../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  async findAll(user: UserEntity | undefined, query: string) {
    let productsIdsCart: string[] = [];

    if (user?.id) {
      const cart = await this.cartRepository.findOne({
        where: { userId: user.id },
      });
      const cartItems = await this.cartItemRepository.find({
        where: { cartId: cart.id },
      });
      productsIdsCart = cartItems.map((item) => item.productId);
    }

    const products = await this.productsRepository.find({
      relations: ['productProperties', 'category', 'manufacturer'],
      where: {
        name: ILike(`%${query || ''}%`),
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return { productsIdsCart, products };
  }

  async findOne(id: string) {
    return this.productsRepository.findOne({
      where: { id },
      relations: ['productProperties', 'category', 'manufacturer'],
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productsRepository.delete(id);
  }
}
