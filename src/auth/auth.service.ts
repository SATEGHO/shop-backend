import { RolesService } from './../roles/roles.service';
import { CartService } from './../cart/cart.service';
import { UserEntity } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { UserRoles, SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private cartService: CartService,
    private rolesService: RolesService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findByEmail(signInDto.email);

    if (!user) {
      throw new BadRequestException('Пользователя с таким email не существует');
    }
    const passwordEquals = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!passwordEquals) {
      throw new BadRequestException('Неверный пароль');
    }
    return this.generateToken(user);
  }

  async signUp(signUpDto: SignUpDto) {
    const candidate = await this.usersService.findByEmail(signUpDto.email);

    if (candidate) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }
    const role = await this.rolesService.findByValue(
      signUpDto.email === 'admin@admin.com' ? UserRoles.ADMIN : UserRoles.USER,
    );

    if (!role) {
      throw new BadRequestException('Роль пользователя не найдена');
    }
    const hashPassword = await bcrypt.hash(signUpDto.password, 10);

    const userEntity = new UserEntity();
    userEntity.fullName = signUpDto.fullName;
    userEntity.email = signUpDto.email;
    userEntity.password = hashPassword;
    userEntity.roleId = role.id;

    const user = await this.usersService.create(userEntity);
    user.role = role;

    await this.cartService.createCart({ userId: user.id });
    return this.generateToken(user);
  }

  private async generateToken(user: UserEntity) {
    const payload = {
      id: user.id,
      sub: user.id,
      name: user.fullName,
      email: user.email,
      roles: [user.role.name],
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
