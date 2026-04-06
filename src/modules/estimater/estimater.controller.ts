// src/estimater/estimater.controller.ts

import { Controller, Get, Post, Body, Param, Patch, Delete, Res, HttpException, HttpStatus } from '@nestjs/common';
import { EstimaterService } from './estimater.service';
import { CreateEstimaterDto } from './dto/create-estimater.dto';
import { UpdateEstimaterDto } from './dto/update-estimater.dto';
import { Estimater } from 'src/entities/estimater.entity';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';


@Controller('estimater')
export class EstimaterController {
  constructor(private readonly estimaterService: EstimaterService) {}

  @Post()
  create(@Body() createEstimaterDto: CreateEstimaterDto): Promise<Estimater> {
    return this.estimaterService.create(createEstimaterDto);
  }

  @Get()
  findAll(): Promise<Estimater[]> {
    return this.estimaterService.findAll();
  }

  @Get('export')
  async exportToExcel(@Res() res: Response) {
    try {
      const leadsListData = await this.estimaterService.findAll();

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Leads List');

      worksheet.columns = [
        { header: 'SN', key: 'sn', width: 5 },
        { header: 'First Name', key: 'firstName', width: 30 },
        { header: 'Last Name', key: 'lastName', width: 30 },
        { header: 'Phone Number', key: 'mobile', width: 15 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Query', key: 'query', width: 30 },
        { header: 'Selection', key: 'json_content', width: 20 },
        { header: 'Total Price', key: 'total_price', width: 20 },
        { header: 'Submitted At', key: 'submittedAt', width: 20 },
      ];

      leadsListData.forEach((query, index) => {
        worksheet.addRow({
          sn: index + 1,
          firstName: query.firstName,
          lastName: query.lastName,
          mobile: query.mobile,
          email: query.email,
          query: query.query,
          json_content: query.json_content,
          total_price: query.total_price,
          submittedAt: query.created_at,
        });
      });

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=user-queries.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      throw new HttpException('Failed to export data to Excel', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Estimater> {
    return this.estimaterService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEstimaterDto: UpdateEstimaterDto,
  ): Promise<Estimater> {
    return this.estimaterService.update(id, updateEstimaterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.estimaterService.remove(id);
  }
}
