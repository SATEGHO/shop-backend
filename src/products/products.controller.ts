import { fileStorage } from './../files/storage';
import { RolesGuard } from './../auth/guards/roles.guard';
import { Roles } from './../auth/decorators/roles-auth.decorator';
import { UserEntity } from './../users/entities/user.entity';
import { User } from './../users/decorators/user.decorator';
import { AuthGuard } from './../auth/guards/auth.guard';
import { AuthOptionalGuard } from './../auth/guards/auth-optional.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCatalogTypes } from './entities/product.entity';
import { ProductsFilter } from './interfaces/filter.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.update(id, updateProductDto, file);
  }

  @UseGuards(AuthOptionalGuard)
  @Get()
  findAll(
    @Query('query') query: string,
    @Query('catalogFilter') catalogFilter: ProductCatalogTypes,
    @Query('categoriesFilter') categoriesFilter: string[],
    @Query('manufacturersFilter') manufacturersFilter: string[],
    @Query('sortFilter') sortFilter: string,
    @User() user: UserEntity | undefined,
  ) {
    const filter: ProductsFilter = {
      query,
      catalogFilter,
      categoriesFilter,
      manufacturersFilter,
      sortFilter,
    };
    return this.productsService.findAll(user, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
