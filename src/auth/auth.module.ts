import { RolesModule } from './../roles/roles.module';
import { CartModule } from './../cart/cart.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './jwt.constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      ...jwtConstants,
    }),
    UsersModule,
    CartModule,
    RolesModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
