import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from 'src/entities/queries.entity';

@Injectable()
export class QueriesRepository {
  constructor(
    @InjectRepository(Query) private readonly queryRepo: Repository<Query>,
  ) {}

  async create(query: Query): Promise<Query> {
    return this.queryRepo.save(query);
  }

  async findAll(): Promise<Query[]> {
    return this.queryRepo.find();
  }

  async findOne(id: number): Promise<Query> {
    return this.queryRepo.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.queryRepo.delete(id);
  }
}
