import { Module } from "@nestjs/common";
import { QueriesService } from "./queries.service";
import { QueriesController } from "./queries.controller";
import { QueriesRepository } from "src/repositories/queries.repository";
import { Query } from "src/entities/queries.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LetsConnectEntity } from "src/entities/lets.connect.entity";
import { ReachOutEntity } from "src/entities/reach.out.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Query, LetsConnectEntity, ReachOutEntity]),
  ],
  controllers: [QueriesController],
  providers: [QueriesService, QueriesRepository],
  exports: [QueriesService],
})
export class QueriesModule {}
