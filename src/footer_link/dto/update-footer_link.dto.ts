import { PartialType } from '@nestjs/swagger';
import { CreateFooterLinkDto } from './create-footer_link.dto';

export class UpdateFooterLinkDto extends PartialType(CreateFooterLinkDto) {}
