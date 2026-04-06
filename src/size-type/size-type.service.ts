import { Injectable } from '@nestjs/common';
import { CreateSizeTypeDto } from './dto/create-size-type.dto';
import { UpdateSizeTypeDto } from './dto/update-size-type.dto';

@Injectable()
export class SizeTypeService {
  create(createSizeTypeDto: CreateSizeTypeDto) {
    return 'This action adds a new sizeType';
  }

  findAll() {
    return `This action returns all sizeType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sizeType`;
  }

  update(id: number, updateSizeTypeDto: UpdateSizeTypeDto) {
    return `This action updates a #${id} sizeType`;
  }

  remove(id: number) {
    return `This action removes a #${id} sizeType`;
  }
}
