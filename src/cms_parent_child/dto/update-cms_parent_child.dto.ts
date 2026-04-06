import { PartialType } from '@nestjs/swagger';
import { CreateCmsParentChildDto } from './create-cms_parent_child.dto';

export class UpdateCmsParentChildDto extends PartialType(CreateCmsParentChildDto) {
    childContentIndex: number;
    title: string;
    description: string;
    image?: string;
}
