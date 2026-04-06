import { Module } from '@nestjs/common';
import { LookMenuService } from './look_menu.service';
import { LookMenuController } from './look_menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookMenu } from './entities/look_menu.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LookMenu])],
  controllers: [LookMenuController],
  providers: [LookMenuService],
})
export class LookMenuModule {}
