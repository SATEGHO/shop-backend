import { FilesModule } from './../files/files.module';
import { OrderItemEntity } from './../orders/entities/order-item.entity';
import { CartItemEntity } from './../cart/entities/cart-item.entity';
import { CartEntity } from './../cart/entities/cart.entity';
import { ManufacturerEntity } from './../manufacturers/entities/manufacturer.entity';
import { CategoryEntity } from './../categories/entities/category.entity';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductPropertyEntity } from './entities/product-property.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductPropertyEntity,
      CategoryEntity,
      ManufacturerEntity,
      CartEntity,
      CartItemEntity,
      OrderItemEntity,
    ]),
    FilesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
