import { Injectable } from '@nestjs/common';
import { Estimater } from 'src/entities/estimater.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class EstimaterRepository extends Repository<Estimater> {
    constructor(private dataSource: DataSource) {
        super(Estimater, dataSource.createEntityManager());
    }


}
