import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManageJobService } from './manage_job.service';
import { CreateManageJobDto } from './dto/create-manage_job.dto';
import { UpdateManageJobDto } from './dto/update-manage_job.dto';

@Controller('manage-job')
export class ManageJobController {
  constructor(private readonly manageJobService: ManageJobService) {}

  @Post()
  create(@Body() createManageJobDto: CreateManageJobDto) {
    return this.manageJobService.create(createManageJobDto);
  }

  @Get()
  findAll() {
    return this.manageJobService.findAll();
  }

  @Get(':status')
  findAllByStatus(
    @Param('status') status: string,
  ) {
    return this.manageJobService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manageJobService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManageJobDto: UpdateManageJobDto) {
    return this.manageJobService.update(+id, updateManageJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manageJobService.remove(+id);
  }
}
