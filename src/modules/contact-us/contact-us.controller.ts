import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  async create(@Body() createContactUsDto: CreateContactUsDto) {
    try {
      const contactUs = await this.contactUsService.create(createContactUsDto);
      return contactUs;
    } catch (error) {
      throw new HttpException('Failed to create contact entry', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return await this.contactUsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const contactUs = await this.contactUsService.findOne(+id);
    if (!contactUs) {
      throw new HttpException('Contact entry not found', HttpStatus.NOT_FOUND);
    }
    return contactUs;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContactUsDto: UpdateContactUsDto) {
    try {
      return await this.contactUsService.update(+id, updateContactUsDto);
    } catch (error) {
      throw new HttpException('Failed to update contact entry', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.contactUsService.remove(+id);
    } catch (error) {
      throw new HttpException('Failed to delete contact entry', HttpStatus.BAD_REQUEST);
    }
  }
}
