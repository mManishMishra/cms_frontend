import { Injectable } from '@nestjs/common';
import { CreateUserQueryDto } from './dto/create-user_query.dto';
import { UpdateUserQueryDto } from './dto/update-user_query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQuery } from './entities/user_query.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserQueriesService {
  constructor(
    @InjectRepository(UserQuery)
    private readonly userQueryRepository: Repository<UserQuery>,
  ) {}

  create(createUserQueryDto: CreateUserQueryDto) {
    return this.userQueryRepository.save(createUserQueryDto);
  }

  findAll() {
    return this.userQueryRepository.find({ order: { id: 'DESC' } });
  }

  findOne(id: number) {
    return this.userQueryRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserQueryDto: UpdateUserQueryDto) {
    return this.userQueryRepository.update(id, updateUserQueryDto);
  }

  remove(id: number) {
    return this.userQueryRepository.delete(id);
  }
}
