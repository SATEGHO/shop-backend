import { ManufacturerEntity } from './../../manufacturers/entities/manufacturer.entity';
import { CategoryEntity } from './../../categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductPropertyEntity } from './product-property.entity';

export enum ProductCatalogTypes {
  APPLIANCES = 'appliances',
  BUILDING_MATERIALS = 'building_materials',
}

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: ProductCatalogTypes.APPLIANCES })
  catalog: ProductCatalogTypes;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column({ default: 1 })
  quantity: number;

  @Column()
  categoryId: string;

  @Column()
  manufacturerId: string;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @ManyToOne(() => ManufacturerEntity)
  @JoinColumn({ name: 'manufacturerId' })
  manufacturer: ManufacturerEntity;

  @OneToMany(
    () => ProductPropertyEntity,
    (productProperty) => productProperty.product,
  )
  productProperties: ProductPropertyEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
