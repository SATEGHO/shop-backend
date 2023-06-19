import { FilesService } from './../files/files.service';
import { CategoryEntity } from './../categories/entities/category.entity';
import { ManufacturerEntity } from './../manufacturers/entities/manufacturer.entity';
import { OrderItemEntity } from './../orders/entities/order-item.entity';
import { CartEntity } from './../cart/entities/cart.entity';
import { CartItemEntity } from './../cart/entities/cart-item.entity';
import { UserEntity } from './../users/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import {
  FindOptionsOrder,
  FindOptionsOrderValue,
  FindOptionsWhere,
  ILike,
  In,
  Repository,
} from 'typeorm';
import { ProductsFilter } from './interfaces/filter.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ManufacturerEntity)
    private manufacturerRepository: Repository<ManufacturerEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Укажите изображение');
    }

    const filename = file.filename;

    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id: createProductDto.manufacturerId },
    });
    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId },
    });

    if (manufacturer.catalog !== category.catalog) {
      throw new BadRequestException(
        'Производитель или категория не совпадают по типу товара',
      );
    }

    return this.productsRepository.save({
      ...createProductDto,
      catalog: manufacturer.catalog,
      image: filename,
    });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    file: Express.Multer.File,
  ) {
    if (!file && !updateProductDto.file) {
      throw new BadRequestException('Укажите изображение');
    }

    let filename = '';

    if (file) {
      filename = file.filename;
    } else {
      filename = updateProductDto.file;
    }

    delete updateProductDto.file;

    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id: updateProductDto.manufacturerId },
    });
    const category = await this.categoryRepository.findOne({
      where: { id: updateProductDto.categoryId },
    });

    if (manufacturer.catalog !== category.catalog) {
      throw new BadRequestException(
        'Производитель или категория не совпадают по типу товара',
      );
    }

    return this.productsRepository.update(id, {
      ...updateProductDto,
      image: filename,
      catalog: manufacturer.catalog,
    });
  }

  async findAll(user: UserEntity | undefined, filter: ProductsFilter) {
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

    const whereFilterOptions: FindOptionsWhere<ProductEntity> = {};

    if (filter.query) {
      whereFilterOptions.name = ILike(`%${filter.query || ''}%`);
    }

    if (filter.catalogFilter) {
      whereFilterOptions.catalog = filter.catalogFilter;
    }

    if (filter.categoriesFilter) {
      whereFilterOptions.categoryId = In(filter.categoriesFilter);
    }

    if (filter.manufacturersFilter) {
      whereFilterOptions.manufacturerId = In(filter.manufacturersFilter);
    }

    const orderFilterOptions: FindOptionsOrder<ProductEntity> = {};

    if (filter.sortFilter) {
      orderFilterOptions.price = filter.sortFilter as FindOptionsOrderValue;
    } else {
      orderFilterOptions.createdAt = 'DESC';
    }

    const products = await this.productsRepository.find({
      relations: ['productProperties', 'category', 'manufacturer'],
      where: whereFilterOptions,
      order: orderFilterOptions,
    });
    return { productsIdsCart, products };
  }

  async findOne(id: string) {
    return this.productsRepository.findOne({
      where: { id },
      relations: ['productProperties', 'category', 'manufacturer'],
    });
  }

  async remove(id: string) {
    const productInCart = await this.cartItemRepository.findOne({
      where: { productId: id },
    });

    if (productInCart) {
      throw new BadRequestException('Невозможно удалить товар');
    }

    const productInOrder = await this.orderItemRepository.findOne({
      where: { productId: id },
    });

    if (productInOrder) {
      throw new BadRequestException('Невозможно удалить товар');
    }

    return this.productsRepository.delete(id);
  }
}
