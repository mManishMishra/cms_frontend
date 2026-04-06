import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertySubTypeService } from './property-sub-type.service';
import { CreatePropertySubTypeDto } from './dto/create-property-sub-type.dto';
import { UpdatePropertySubTypeDto } from './dto/update-property-sub-type.dto';

@Controller('property-sub-type')
export class PropertySubTypeController {
  constructor(private readonly propertySubTypeService: PropertySubTypeService) {}

  @Post()
  create(@Body() createPropertySubTypeDto: CreatePropertySubTypeDto) {
    return this.propertySubTypeService.create(createPropertySubTypeDto);
  }

  @Get()
  findAll() {
    return this.propertySubTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertySubTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertySubTypeDto: UpdatePropertySubTypeDto) {
    return this.propertySubTypeService.update(+id, updatePropertySubTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertySubTypeService.remove(+id);
  }
}
