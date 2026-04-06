import { Injectable } from '@nestjs/common';
import { CreateLetsConnectDto } from './dto/create-lets-connect.dto';
import { UpdateLetsConnectDto } from './dto/update-lets-connect.dto';
import { LetsConnectRepository } from 'src/repositories/lets-connect.repository';
import { LetsConnectEntity } from 'src/entities/lets.connect.entity';

@Injectable()
export class LetsConnectService {
    constructor(private readonly letsConnectRepository: LetsConnectRepository) {}
    
    async createEntry(createLetsConnectDto: CreateLetsConnectDto): Promise<LetsConnectEntity> {
        return this.letsConnectRepository.createLetsConnect(createLetsConnectDto);
      }

      async getAllEntries(): Promise<LetsConnectEntity[]> {
        return this.letsConnectRepository.findAll();
      }

  create(createLetsConnectDto: CreateLetsConnectDto) {
    return 'This action adds a new letsConnect';
  }

  findAll() {
    return `This action returns all letsConnect`;
  }

  findOne(id: number) {
    return `This action returns a #${id} letsConnect`;
  }

  update(id: number, updateLetsConnectDto: UpdateLetsConnectDto) {
    return `This action updates a #${id} letsConnect`;
  }

  remove(id: number) {
    return `This action removes a #${id} letsConnect`;
  }
}
