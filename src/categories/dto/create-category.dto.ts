import { ProductCatalogTypes } from './../../products/entities/product.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  name: string;

  @IsEnum(ProductCatalogTypes, { message: 'Укажите тип товара' })
  catalog: ProductCatalogTypes;
}
