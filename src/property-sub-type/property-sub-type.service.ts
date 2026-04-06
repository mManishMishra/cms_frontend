import { Injectable } from '@nestjs/common';
import { CreatePropertySubTypeDto } from './dto/create-property-sub-type.dto';
import { UpdatePropertySubTypeDto } from './dto/update-property-sub-type.dto';

@Injectable()
export class PropertySubTypeService {
  create(createPropertySubTypeDto: CreatePropertySubTypeDto) {
    return 'This action adds a new propertySubType';
  }

  findAll() {
    return `This action returns all propertySubType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertySubType`;
  }

  update(id: number, updatePropertySubTypeDto: UpdatePropertySubTypeDto) {
    return `This action updates a #${id} propertySubType`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertySubType`;
  }
}
