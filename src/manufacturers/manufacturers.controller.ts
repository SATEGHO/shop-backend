import { RolesGuard } from './../auth/guards/roles.guard';
import { Roles } from './../auth/decorators/roles-auth.decorator';
import { AuthGuard } from './../auth/guards/auth.guard';
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
import { ManufacturersService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { ProductCatalogTypes } from './entities/manufacturer.entity';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @Get()
  getAll(@Query('catalogFilter') catalogFilter: ProductCatalogTypes) {
    return this.manufacturersService.getAll(catalogFilter);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturersService.create(createManufacturerDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.manufacturersService.delete(id);
  }
}
