import { ProductEntity } from './../../products/entities/product.entity';
import { OrderEntity } from './order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_item')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column({ default: 1 })
  quantity: number;

  @Column()
  orderId: string;

  @Column()
  productId: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
