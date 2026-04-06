import { Injectable } from '@nestjs/common';
import { Estimatercalculation } from 'src/entities/estimatercalculation.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class EstimaterCalculationsRepository extends Repository<Estimatercalculation> {
    constructor(private dataSource: DataSource) {
        super(Estimatercalculation, dataSource.createEntityManager());
    }


}
