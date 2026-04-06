import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { ContactUs } from 'src/entities/contact-us.entity';
import { CreateContactDto } from '../contact/dto/create-contact.dto';
import { Contact } from 'src/entities/contact.entity';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(ContactUs)
    private readonly contactUsRepository: Repository<ContactUs>,
  ) {}

  async create(createContactUsDto: CreateContactUsDto): Promise<ContactUs> {
    const contactUs = this.contactUsRepository.create(createContactUsDto);
    return await this.contactUsRepository.save(contactUs);
  }

  async findAll(): Promise<ContactUs[]> {
    return await this.contactUsRepository.find();
  }

  async findOne(id: number): Promise<ContactUs> {
    const contactUs = await this.contactUsRepository.findOne({ where: { id } });
    if (!contactUs) {
      throw new NotFoundException(`Contact entry with ID ${id} not found`);
    }
    return contactUs;
  }

  async update(id: number, updateContactUsDto: UpdateContactUsDto): Promise<ContactUs> {
    const contactUs = await this.contactUsRepository.preload({
      id,
      ...updateContactUsDto,
    });

    if (!contactUs) {
      throw new NotFoundException(`Contact entry with ID ${id} not found`);
    }
    return await this.contactUsRepository.save(contactUs);
  }

  async remove(id: number): Promise<void> {
    const contactUs = await this.findOne(id);
    await this.contactUsRepository.remove(contactUs);
  }
}
