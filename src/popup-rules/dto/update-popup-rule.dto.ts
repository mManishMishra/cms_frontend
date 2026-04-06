import { PartialType } from '@nestjs/swagger';
import { CreatePopupRuleDto } from './create-popup-rule.dto';

export class UpdatePopupRuleDto extends PartialType(CreatePopupRuleDto) {}
