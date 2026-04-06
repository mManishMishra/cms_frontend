import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PopupRulesService } from './popup-rules.service';
import { PopupRulesController } from './popup-rules.controller';
import { PopupRule } from './entities/popup-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PopupRule])],
  controllers: [PopupRulesController],
  providers: [PopupRulesService],
})
export class PopupRulesModule {}