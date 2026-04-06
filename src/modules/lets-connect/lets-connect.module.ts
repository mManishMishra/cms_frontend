import { Module } from '@nestjs/common';
import { LetsConnectService } from './lets-connect.service';
import { LetsConnectController } from './lets-connect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetsConnectEntity } from 'src/entities/lets.connect.entity';
import { LetsConnectRepository } from 'src/repositories/lets-connect.repository';

@Module({
    imports: [TypeOrmModule.forFeature([LetsConnectEntity])],
    providers: [LetsConnectRepository, LetsConnectService],
    controllers: [LetsConnectController],
})
export class LetsConnectModule {}
