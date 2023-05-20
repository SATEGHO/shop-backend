import { PartialType } from '@nestjs/mapped-types';
import { CreateCartItemDto } from './create-cart-item.dto';
import { IsNumber, IsUUID } from 'class-validator';

export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {
  @IsUUID(undefined, { message: 'Некорректный идентификатор' })
  id: string;

  @IsNumber({}, { message: 'Некорректное значение' })
  quantity: number;
}
