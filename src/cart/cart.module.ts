import { ProductEntity } from './../products/entities/product.entity';
import { UserEntity } from './../users/entities/user.entity';
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartEntity,
      UserEntity,
      CartItemEntity,
      ProductEntity,
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
