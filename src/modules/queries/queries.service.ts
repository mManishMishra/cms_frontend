import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateQueryDto } from "./dto/create-query.dto";
import { UpdateQueryDto } from "./dto/update-query.dto";
import { Query } from "src/entities/queries.entity";
import { ReachOutEntity } from "src/entities/reach.out.entity";
import { LetsConnectEntity } from "src/entities/lets.connect.entity";

@Injectable()
export class QueriesService {
    constructor(
        @InjectRepository(Query)
        private readonly queriesRepository: Repository<Query>,
        @InjectRepository(ReachOutEntity)
        private readonly reachOutRepository: Repository<ReachOutEntity>,
        @InjectRepository(LetsConnectEntity)
        private readonly letsConnectRepository: Repository<LetsConnectEntity>,
    ) { }

    async letsConnectDataSave(reqBody: any) {
        try {
            console.log(reqBody);

            const reachOutForm = this.letsConnectRepository.create({
                fullName: reqBody.name,
                email: reqBody.email,
                contact: reqBody.contactNumber,
                query: reqBody.query,
            });
            await this.letsConnectRepository.save(reachOutForm);
            return {
                statusCode: 201,
                status: "Success",
            };
            console.log(reqBody);
        } catch (error) {
            throw error;
        }
    }

    async reachOutDataSave(reqBody: any) {
        try {
            console.log(reqBody);
            const reachOutForm = this.reachOutRepository.create({
                name: reqBody.name,
                pickUpLocation: reqBody.pickUpLocation,
                email: reqBody.email,
                contact: reqBody.contactNumber,
                checkInDate: reqBody.checkInDate,
                checkOutDate: reqBody.checkOutDate,
                query: reqBody.query,
            });
            await this.reachOutRepository.save(reachOutForm);
            return {
                statusCode: 201,
                status: "Success",
            };
        } catch (error) {
            throw error;
        }
    }

    async create(createQueryDto: CreateQueryDto): Promise<Query> {
        const query = this.queriesRepository.create(createQueryDto);
        return await this.queriesRepository.save(query);
    }

    async findAll(): Promise<Query[]> {
        return await this.queriesRepository.find();
    }

    async findOne(id: number): Promise<Query> {
        const query = await this.queriesRepository.findOne({ where: { id } });
        if (!query) {
            throw new NotFoundException(`Query with ID ${id} not found`);
        }
        return query;
    }

    async update(id: number, updateQueryDto: UpdateQueryDto): Promise<Query> {
        const query = await this.queriesRepository.preload({
            id,
            ...updateQueryDto,
        });

        if (!query) {
            throw new NotFoundException(`Query with ID ${id} not found`);
        }
        return await this.queriesRepository.save(query);
    }

    async remove(id: number): Promise<void> {
        const query = await this.findOne(id);
        await this.queriesRepository.remove(query);
    }
}
