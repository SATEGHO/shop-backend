import { IsNotEmpty } from 'class-validator';

export class CreateManufacturerDto {
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  name: string;
}
