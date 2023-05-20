import { IsUUID } from 'class-validator';

export class DeleteCartItemDto {
  @IsUUID(undefined, { message: 'Некорректный идентификатор' })
  id: string;
}
