import { IsEmail, IsNotEmpty } from 'class-validator';

export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class SignUpDto {
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  fullName: string;

  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  password: string;
}
