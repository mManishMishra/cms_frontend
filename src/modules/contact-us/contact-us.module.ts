import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { ContactUsRepository } from 'src/repositories/contact-us.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactUs } from 'src/entities/contact-us.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactUs])],
  controllers: [ContactUsController],
  providers: [ContactUsService,ContactUsRepository],
  exports: [ContactUsService],
})
export class ContactUsModule {}
