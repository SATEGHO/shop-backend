import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_properties')
export class ProductPropertyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  productId: string;

  @ManyToOne(() => ProductEntity, (product) => product.productProperties)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
