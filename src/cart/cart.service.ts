import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemEntity } from './entities/cart-item.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { DeleteCartItemDto } from './dto/delete-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemsRepository: Repository<CartItemEntity>,
  ) {}

  async createCart(createCartDto: CreateCartDto) {
    return this.cartRepository.save(createCartDto);
  }

  async createCartItem(userId: string, createCartItemDto: CreateCartItemDto) {
    console.log(userId, createCartItemDto);

    const cart = await this.cartRepository.findOneBy({ userId });

    if (!cart) {
      throw new BadRequestException('Не удалось загрузить корзину');
    }
    return this.cartItemsRepository.save({
      ...createCartItemDto,
      cartId: cart.id,
    });
  }

  async deleteCartItem(dto: DeleteCartItemDto) {
    return this.cartItemsRepository.delete(dto.id);
  }

  async updateCartItem(dto: UpdateCartItemDto) {
    return this.cartItemsRepository.update(dto.id, dto);
  }

  async getAllItems(userId: string) {
    const cart = await this.cartRepository.findOneBy({ userId });

    if (!cart) {
      throw new BadRequestException('Не удалось загрузить корзину');
    }
    return this.cartItemsRepository.find({
      where: { cartId: cart.id },
      relations: ['product'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
