import { Module } from '@nestjs/common';
import { PropertySubTypeService } from './property-sub-type.service';
import { PropertySubTypeController } from './property-sub-type.controller';

@Module({
  controllers: [PropertySubTypeController],
  providers: [PropertySubTypeService],
})
export class PropertySubTypeModule {}
