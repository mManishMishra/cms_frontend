import { Module } from '@nestjs/common';
import { EstimaterService } from './estimater.service';
import { EstimaterController } from './estimater.controller';
import { EstimaterRepository } from 'src/repositories/estimator.repository';
import { Estimater } from 'src/entities/estimater.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Estimater])],
    controllers: [EstimaterController],
    providers: [EstimaterService,EstimaterRepository],
    exports: [EstimaterService],
})
export class EstimaterModule {}
