import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductPropertyDto {
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  name: string;

  description: string;

  @IsUUID(undefined, { message: 'Некорректный идентификатор' })
  productId: string;
}
