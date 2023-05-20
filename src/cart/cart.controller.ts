import { AuthGuard } from './../auth/guards/auth.guard';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { User } from '../users/decorators/user.decorator';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { DeleteCartItemDto } from './dto/delete-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllItems(@User('id') userId: string) {
    return this.cartService.getAllItems(userId);
  }

  @UseGuards(AuthGuard)
  @Post('add')
  createCartItem(
    @User('id') userId: string,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartService.createCartItem(userId, createCartItemDto);
  }

  @UseGuards(AuthGuard)
  @Post('delete')
  deleteCartItem(@Body() deleteCartItemDto: DeleteCartItemDto) {
    return this.cartService.deleteCartItem(deleteCartItemDto);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  updateCartItem(@Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartService.updateCartItem(updateCartItemDto);
  }
}
