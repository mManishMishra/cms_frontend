import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express'; // Import Express Request type
import { UserQueriesService } from './user_queries.service';
import { CreateUserQueryDto } from './dto/create-user_query.dto';
import { UpdateUserQueryDto } from './dto/update-user_query.dto';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
@Controller('user-queries')
export class UserQueriesController {
  constructor(private readonly userQueriesService: UserQueriesService) {}

  // @Post()
  // create(@Body() createUserQueryDto: CreateUserQueryDto) {
  //   return this.userQueriesService.create(createUserQueryDto);
  // }
  @Post()
  create(@Body() createUserQueryDto: CreateUserQueryDto, @Req() req: Request) {
    // Ensure `forwarded` is treated as a string
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0];

    // If no forwarded IP, fall back to `req.socket.remoteAddress`
    const ip = clientIp || req.socket?.remoteAddress || req.connection?.remoteAddress;

    return this.userQueriesService.create({ 
      ...createUserQueryDto, 
      ip_address: ip // Ensure this matches your database column
    });
  }

  @Get()
  findAll() {
    return this.userQueriesService.findAll();
  }

  @Get('export')
  async exportToExcel(@Res() res: Response) {
    try {
      const userQueries = await this.userQueriesService.findAll();

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('User Queries');

      worksheet.columns = [
        { header: 'SN', key: 'sn', width: 5 },
        { header: 'Full Name', key: 'fullName', width: 30 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Phone Number', key: 'phoneNumber', width: 15 },
        { header: 'Place', key: 'place', width: 20 },
        { header: 'Query', key: 'query', width: 30 },
        { header: 'Lead Form', key: 'leadFormName', width: 30 },
        { header: 'Lead Type', key: 'leadFormType', width: 16 },
        { header: 'Source URL', key: 'sourceUrl', width: 30 },
        { header: 'Trigger', key: 'triggerType', width: 14 },
        { header: 'CTA Text', key: 'ctaText', width: 18 },
        { header: 'Device', key: 'deviceType', width: 14 },
        { header: 'Submitted At', key: 'submittedAt', width: 20 },
      ];

      userQueries.forEach((query, index) => {
        worksheet.addRow({
          sn: index + 1,
          fullName: query.name,
          email: query.email,
          phoneNumber: query.mobile,
          place: query.place,
          query: query.query,
          leadFormName: query.lead_form_name,
          leadFormType: query.lead_form_type,
          sourceUrl: query.source_url,
          triggerType: query.trigger_type,
          ctaText: query.cta_text,
          deviceType: query.device_type,
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
  findOne(@Param('id') id: string) {
    return this.userQueriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserQueryDto: UpdateUserQueryDto) {
    return this.userQueriesService.update(+id, updateUserQueryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userQueriesService.remove(+id);
  }
}
