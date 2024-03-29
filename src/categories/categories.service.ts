import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CategoryEntity,
  ProductCatalogTypes,
} from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.save(createCategoryDto);
  }

  async delete(id: string) {
    return this.categoriesRepository.delete(id);
  }

  async getAll(catalogFilter?: ProductCatalogTypes) {
    if (catalogFilter) {
      return this.categoriesRepository.find({
        where: { catalog: catalogFilter },
      });
    }
    return this.categoriesRepository.find();
  }
}
