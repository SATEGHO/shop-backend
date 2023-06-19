import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductCatalogTypes {
  APPLIANCES = 'appliances',
  BUILDING_MATERIALS = 'building_materials',
}

@Entity('manufacturers')
export class ManufacturerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: ProductCatalogTypes.APPLIANCES })
  catalog: ProductCatalogTypes;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
