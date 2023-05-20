import { AuthGuard } from './../auth/guards/auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get()
  getAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@User('id') userId) {
    return userId;
  }
}
