import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CmsPage } from './entities/cms-page.entity';
import { CreateCmsPageDto } from './dto/create-cms-page.dto';
import { CmsStatus } from '../auth/enums/cms-status.enum';
import {
    canPublishCmsContent,
    resolvePublishStatus,
} from '../auth/utils/cms-access.util';

@Injectable()
export class CmsPagesService {
    constructor(
        @InjectRepository(CmsPage)
        private readonly cmsPageRepository: Repository<CmsPage>,
    ) {}

    // 🌟 Added 'user' parameter to check roles
    async create(createCmsPageDto: CreateCmsPageDto, user?: any) {
        const safeDto = {
            ...createCmsPageDto,
            status: resolvePublishStatus(createCmsPageDto.status || CmsStatus.Draft, user),
        };

        const newPage = this.cmsPageRepository.create(safeDto);
        return await this.cmsPageRepository.save(newPage);
    }

    async findAll() {
        return await this.cmsPageRepository.find({
            where: { status: CmsStatus.Published },
            order: { created_at: 'DESC' }
        });
    }

    async findAllForCms() {
        return await this.cmsPageRepository.find({
            order: { created_at: 'DESC' }
        });
    }

    async findOne(id: number) {
        const page = await this.cmsPageRepository.findOne({ where: { id } });
        if (!page) {
            throw new NotFoundException(`Page with ID ${id} not found`);
        }
        return page;
    }

    // 🌟 Added 'user' parameter to check roles
    async update(id: number, updateData: any, user?: any) {
        const page = await this.findOne(id);
        const safeUpdateData = { ...updateData };

        if (safeUpdateData.status !== undefined) {
            safeUpdateData.status = resolvePublishStatus(safeUpdateData.status, user);
        }

        Object.assign(page, safeUpdateData);
        return await this.cmsPageRepository.save(page);
    }

    async updateSeoContent(id: number, seo_content: any, user?: any) {
        const page = await this.findOne(id);
        page.seo_content = seo_content;
        if (!canPublishCmsContent(user) && page.status === CmsStatus.Published) {
            page.status = CmsStatus.Pending;
        }
        return await this.cmsPageRepository.save(page);
    }

    async findBySlug(slug: string) {
        const pages = await this.cmsPageRepository.find({ where: { status: CmsStatus.Published } });
        const page = pages.find(p => p.seo_content && p.seo_content.slug === slug);
        
        if (!page) {
            throw new NotFoundException(`Published page with slug ${slug} not found`);
        }
        return page;
    }

    async duplicate(id: number) {
        const originalPage = await this.findOne(id);
        
        const duplicateData = {
            ...originalPage,
            title: `${originalPage.title} (Copy)`,
            status: CmsStatus.Draft,
            id: undefined, 
            seo_content: null, 
            created_at: undefined,
            updated_at: undefined,
        };

        const newPage = this.cmsPageRepository.create(duplicateData);
        return await this.cmsPageRepository.save(newPage);
    }

    async remove(id: number) {
        const page = await this.findOne(id);
        return await this.cmsPageRepository.remove(page);
    }
}
