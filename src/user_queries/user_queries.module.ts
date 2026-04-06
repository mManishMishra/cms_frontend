import { Module } from '@nestjs/common';
import { UserQueriesService } from './user_queries.service';
import { UserQueriesController } from './user_queries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuery } from './entities/user_query.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserQuery])],
  controllers: [UserQueriesController],
  providers: [UserQueriesService],
})
export class UserQueriesModule {}
