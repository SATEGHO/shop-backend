import { User } from './../users/decorators/user.decorator';
import { AuthGuard } from './../auth/guards/auth.guard';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@User('id') userId: string) {
    return this.ordersService.create(userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAll(@User('id') userId: string) {
    return this.ordersService.getAll(userId);
  }
}
