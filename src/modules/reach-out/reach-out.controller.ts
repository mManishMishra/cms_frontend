import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReachOutService } from './reach-out.service';
import { CreateReachOutDto } from './dto/create-reach-out.dto';
import { UpdateReachOutDto } from './dto/update-reach-out.dto';

@Controller('reach-out')
export class ReachOutController {
  constructor(private readonly reachOutService: ReachOutService) {}

  @Post()
  create(@Body() createReachOutDto: CreateReachOutDto) {
    return this.reachOutService.create(createReachOutDto);
  }

  @Get()
  findAll() {
    return this.reachOutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reachOutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReachOutDto: UpdateReachOutDto) {
    return this.reachOutService.update(+id, updateReachOutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reachOutService.remove(+id);
  }
}
