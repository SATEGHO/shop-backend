import { ProductEntity } from './../products/entities/product.entity';
import { CartItemEntity } from './../cart/entities/cart-item.entity';
import { CartEntity } from './../cart/entities/cart.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity, OrderStates } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemsRepository: Repository<CartItemEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemsRepository: Repository<OrderItemEntity>,
  ) {}

  async create(userId: string) {
    const cart = await this.cartRepository.findOneBy({ userId });

    if (!cart) {
      throw new BadRequestException('Не удалось загрузить корзину');
    }

    const cartItems = await this.cartItemsRepository.find({
      where: { cartId: cart.id },
      relations: ['product'],
    });

    if (!cartItems.length) {
      throw new BadRequestException();
    }

    let totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);

    const order = await this.orderRepository.save({
      price: totalPrice,
      userId,
      status: OrderStates.PENDING,
    });

    for (const cartItem of cartItems) {
      await this.orderItemsRepository.save({
        price: cartItem.product.price * cartItem.quantity,
        quantity: cartItem.quantity,
        orderId: order.id,
        productId: cartItem.product.id,
      });
      await this.cartItemsRepository.delete({ productId: cartItem.product.id });

      const product = await this.productRepository.findOne({
        where: { id: cartItem.product.id },
      });

      await this.productRepository.save({
        id: cartItem.product.id,
        quantity: product.quantity - 1,
      });
    }

    return order;
  }

  async getAll(userId: string) {
    return this.orderRepository.find({
      where: { userId },
      relations: ['orderItems', 'orderItems.product'],
    });
  }
}
