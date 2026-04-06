import { Module } from '@nestjs/common';
import { ReachOutService } from './reach-out.service';
import { ReachOutController } from './reach-out.controller';

@Module({
  controllers: [ReachOutController],
  providers: [ReachOutService],
})
export class ReachOutModule {}
