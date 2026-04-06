import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LetsConnectService } from './lets-connect.service';
import { CreateLetsConnectDto } from './dto/create-lets-connect.dto';
import { UpdateLetsConnectDto } from './dto/update-lets-connect.dto';
import { LetsConnectEntity } from 'src/entities/lets.connect.entity';

@Controller('lets-connect')
export class LetsConnectController {
  constructor(private readonly letsConnectService: LetsConnectService) {}

  @Post()
  async createLetsConnect(@Body() createLetsConnectDto: CreateLetsConnectDto): Promise<LetsConnectEntity> {
    return this.letsConnectService.createEntry(createLetsConnectDto);
  }

  @Get()
  async getAllLetsConnect(): Promise<LetsConnectEntity[]> {
    return this.letsConnectService.getAllEntries();
  }

  @Post()
  create(@Body() createLetsConnectDto: CreateLetsConnectDto) {
    return this.letsConnectService.create(createLetsConnectDto);
  }

  @Get()
  findAll() {
    return this.letsConnectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.letsConnectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLetsConnectDto: UpdateLetsConnectDto) {
    return this.letsConnectService.update(+id, updateLetsConnectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.letsConnectService.remove(+id);
  }
}
