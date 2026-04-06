import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EstimatercalculationService } from './estimatercalculation.service';
import { CreateEstimatercalculationDto, GetEstimationQuatationDto } from './dto/create-estimatercalculation.dto';
import { UpdateEstimatercalculationDto } from './dto/update-estimatercalculation.dto';

@Controller('estimatercalculation')
export class EstimatercalculationController {
  constructor(private readonly estimatercalculationService: EstimatercalculationService) {}

  // Create data or save data
  @Post()
  create(@Body() createEstimatercalculationDto: CreateEstimatercalculationDto) {
    return this.estimatercalculationService.create(createEstimatercalculationDto);
  }

  //Get all data
  @Get()
  findAll() {
    return this.estimatercalculationService.findAll();
  }

  //Get data on behalf of given condition(s)
  @Get('recordbytype/')
  findRecords(
    @Query('propertyType') propertyType: string,
    @Query('room') room?: string,
    @Query('packageType') packageType?: string,

  ) {
    return this.estimatercalculationService.findWithConditions(propertyType,room,packageType);
  }

  //Get data on behalf of id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estimatercalculationService.findOne(+id);
  }

  //udate data
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstimatercalculationDto: UpdateEstimatercalculationDto) {
    return this.estimatercalculationService.update(+id, updateEstimatercalculationDto);
  }

  //Delete data
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estimatercalculationService.remove(+id);
  }

  //findAllBy Category
  @Get('packagetype/:packageId')
  findAllByCategory(@Param('packageId') packageId: number) {
    return this.estimatercalculationService.findAllByCategory(packageId);
  }

  //getEstimationQuatation
  @Post('getEstimationQuatation')
  getEstimationQuatation(@Body() data: GetEstimationQuatationDto) {
    return this.estimatercalculationService.getEstimationQuatation(data);
  }
}
