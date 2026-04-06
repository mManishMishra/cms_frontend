import { Injectable } from '@nestjs/common';
import { CreateReachOutDto } from './dto/create-reach-out.dto';
import { UpdateReachOutDto } from './dto/update-reach-out.dto';

@Injectable()
export class ReachOutService {
  create(createReachOutDto: CreateReachOutDto) {
    return 'This action adds a new reachOut';
  }

  findAll() {
    return `This action returns all reachOut`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reachOut`;
  }

  update(id: number, updateReachOutDto: UpdateReachOutDto) {
    return `This action updates a #${id} reachOut`;
  }

  remove(id: number) {
    return `This action removes a #${id} reachOut`;
  }
}
