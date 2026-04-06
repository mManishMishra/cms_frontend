import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LetsConnectEntity } from 'src/entities/lets.connect.entity';
import { CreateLetsConnectDto } from 'src/modules/lets-connect/dto/create-lets-connect.dto';

@Injectable()
export class LetsConnectRepository {
    constructor(
        @InjectRepository(LetsConnectEntity)
        private readonly letsConnectRepository: Repository<LetsConnectEntity>,
    ) { }

    async createLetsConnect(createLetsConnectDto: CreateLetsConnectDto): Promise<LetsConnectEntity> {
        const newConnect = this.letsConnectRepository.create(createLetsConnectDto);
        return await this.letsConnectRepository.save(newConnect);
    }

    async findAll(): Promise<LetsConnectEntity[]> {
        return await this.letsConnectRepository.find();
    }
}
