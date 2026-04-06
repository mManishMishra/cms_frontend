import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotsTxt } from './entities/robots-txt.entity';
import { RobotsTxtService } from './robots-txt.service';
import { RobotsTxtController } from './robots-txt.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RobotsTxt])],
  controllers: [RobotsTxtController],
  providers: [RobotsTxtService],
  exports: [RobotsTxtService],
})
export class RobotsTxtModule {}
