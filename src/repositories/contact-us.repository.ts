import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactUs } from 'src/entities/contact-us.entity';

@Injectable()
export class ContactUsRepository {
  constructor(
    @InjectRepository(ContactUs) private readonly contactUsRepo: Repository<ContactUs>,
  ) {}

  async create(contact: ContactUs): Promise<ContactUs> {
    return this.contactUsRepo.save(contact);
  }

  async findAll(): Promise<ContactUs[]> {
    return this.contactUsRepo.find();
  }

  async findOne(id: number): Promise<ContactUs> {
    return this.contactUsRepo.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.contactUsRepo.delete(id);
  }
}
