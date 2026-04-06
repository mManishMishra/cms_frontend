import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SizeTypeService } from './size-type.service';
import { CreateSizeTypeDto } from './dto/create-size-type.dto';
import { UpdateSizeTypeDto } from './dto/update-size-type.dto';

@Controller('size-type')
export class SizeTypeController {
  constructor(private readonly sizeTypeService: SizeTypeService) {}

  @Post()
  create(@Body() createSizeTypeDto: CreateSizeTypeDto) {
    return this.sizeTypeService.create(createSizeTypeDto);
  }

  @Get()
  findAll() {
    return this.sizeTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sizeTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSizeTypeDto: UpdateSizeTypeDto) {
    return this.sizeTypeService.update(+id, updateSizeTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sizeTypeService.remove(+id);
  }
}
