import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { CreateProductPropertyDto } from './create-product-property.dto';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  name: string;

  @IsNumber({}, { message: 'Некорректное значение' })
  @Min(1, { message: 'Минимальное значение цены: 1' })
  price: number;

  @IsNotEmpty({ message: 'Укажите изображение' })
  image: string;

  @IsOptional()
  description: string;

  productProperties?: CreateProductPropertyDto[];

  @IsNumber({}, { message: 'Некорректное значение' })
  @Min(1, { message: 'Минимальное значение количества: 1' })
  @IsOptional()
  quantity: number;

  @IsNotEmpty({ message: 'Укажите категорию' })
  @IsUUID(undefined, { message: 'Выберите категорию' })
  categoryId: string;

  @IsNotEmpty({ message: 'Укажите производителя' })
  @IsUUID(undefined, { message: 'Выберите производителя' })
  manufacturerId: string;
}
