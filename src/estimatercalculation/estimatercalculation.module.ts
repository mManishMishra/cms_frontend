import { Module } from '@nestjs/common';
import { EstimatercalculationService } from './estimatercalculation.service';
import { EstimatercalculationController } from './estimatercalculation.controller';
import { EstimaterCalculationsRepository } from 'src/repositories/estimator-calculations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estimatercalculation } from 'src/entities/estimatercalculation.entity';
import { SizeType } from 'src/entities/size-type.entity';
import { PropertySubType } from 'src/property-sub-type/entities/property-sub-type.entity';
import { Package } from 'src/package/entities/package.entity';

@Module({
  controllers: [EstimatercalculationController],
  providers: [EstimatercalculationService, EstimaterCalculationsRepository],
  imports:[TypeOrmModule.forFeature([Estimatercalculation, SizeType, PropertySubType, Package])],
  exports:[EstimatercalculationService]
})
export class EstimatercalculationModule {}
