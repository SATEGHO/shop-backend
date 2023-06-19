import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ManufacturerEntity,
  ProductCatalogTypes,
} from './entities/manufacturer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private manufacturersRepository: Repository<ManufacturerEntity>,
  ) {}

  async create(createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturersRepository.save(createManufacturerDto);
  }

  async delete(id: string) {
    return this.manufacturersRepository.delete(id);
  }

  async getAll(catalogFilter?: ProductCatalogTypes) {
    if (catalogFilter) {
      return this.manufacturersRepository.find({
        where: { catalog: catalogFilter },
      });
    }
    return this.manufacturersRepository.find();
  }
}
