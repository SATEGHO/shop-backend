import { IsUUID } from 'class-validator';

export class CreateCartItemDto {
  @IsUUID(undefined, { message: 'Некорректный идентификатор' })
  productId: string;
}
