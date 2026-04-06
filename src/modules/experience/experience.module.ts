import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceInquiry } from 'src/entities/experience.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ExperienceInquiry])],
    controllers: [ExperienceController],
    providers: [ExperienceService],
})
export class ExperienceModule {}
