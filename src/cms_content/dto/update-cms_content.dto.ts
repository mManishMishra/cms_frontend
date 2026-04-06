import { PartialType } from '@nestjs/swagger';
import { CreateCmsContentDto } from './create-cms_content.dto';

export class UpdateCmsContentDto extends PartialType(CreateCmsContentDto) {
    json_content?: any;
    title?: string;
    description?: string;
    designation?: string;
}

export class UpdateJsonContentChildImageDto {
    item_index?: number;
    title: string;
    description: string;
    designation?: string;
}

export class UpdateCmsContentHomepageBannerDto {
    title: string;
    sub_title: string;
    top_slogan: string;
    item_index?: number;
}
