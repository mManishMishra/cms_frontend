import { Module } from '@nestjs/common';
import { SizeTypeService } from './size-type.service';
import { SizeTypeController } from './size-type.controller';

@Module({
  controllers: [SizeTypeController],
  providers: [SizeTypeService],
})
export class SizeTypeModule {}
