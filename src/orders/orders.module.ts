import { CartItemEntity } from './../cart/entities/cart-item.entity';
import { CartEntity } from './../cart/entities/cart.entity';
import { ProductEntity } from './../products/entities/product.entity';
import { UserEntity } from './../users/entities/user.entity';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      UserEntity,
      ProductEntity,
      CartEntity,
      CartItemEntity,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
