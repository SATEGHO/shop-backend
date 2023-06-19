import { RolesGuard } from './../auth/guards/roles.guard';
import { Roles } from './../auth/decorators/roles-auth.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductCatalogTypes } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAll(@Query('catalogFilter') catalogFilter: ProductCatalogTypes) {
    return this.categoriesService.getAll(catalogFilter);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.categoriesService.delete(id);
  }
}
