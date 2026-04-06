import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PopupRule } from './entities/popup-rule.entity';
import { CreatePopupRuleDto } from './dto/create-popup-rule.dto';

@Injectable()
export class PopupRulesService {
    constructor(
        @InjectRepository(PopupRule)
        private popupRuleRepo: Repository<PopupRule>,
    ) {}

    private normalizePath(input?: string) {
        const trimmedValue = (input || '').trim();

        if (!trimmedValue || trimmedValue === '*') {
            return '*';
        }

        let normalizedPath = trimmedValue.startsWith('/') ? trimmedValue : `/${trimmedValue}`;

        if (normalizedPath.length > 1) {
            normalizedPath = normalizedPath.replace(/\/+$/, '');
        }

        return normalizedPath || '/';
    }

    private buildDefaultLeadFormName(targetUrl: string) {
        if (targetUrl === '*') {
            return 'Global Popup Lead Form';
        }

        return `Lead Form ${targetUrl}`;
    }

    async findAll() {
        return this.popupRuleRepo.find({ order: { created_at: 'DESC' } });
    }

    async createOrUpdate(dto: CreatePopupRuleDto) {
        const targetUrl = this.normalizePath(dto.target_url);
        const sanitizedDto = {
            ...dto,
            target_url: targetUrl,
            heading: dto.heading?.trim() || "Let's Connect",
            sub_heading: dto.sub_heading?.trim() || "Get Your Dream Home Interior. Let Our experts help you",
            cta_text: dto.cta_text?.trim() || 'SEND',
            lead_form_name: dto.lead_form_name?.trim() || this.buildDefaultLeadFormName(targetUrl),
            redirect_url: dto.redirect_url?.trim() || '/thank-you',
            success_message: dto.success_message?.trim() || 'Form submitted successfully!',
        };

        let rule = await this.popupRuleRepo.findOne({ where: { target_url: targetUrl } });
        if (rule) {
            Object.assign(rule, sanitizedDto);
        } else {
            rule = this.popupRuleRepo.create(sanitizedDto);
        }
        return this.popupRuleRepo.save(rule);
    }

    async resolveForPath(path?: string) {
        const normalizedPath = this.normalizePath(path);
        const exactMatch = await this.popupRuleRepo.findOne({
            where: { target_url: normalizedPath },
        });

        if (exactMatch) {
            return exactMatch;
        }

        return this.popupRuleRepo.findOne({
            where: { target_url: '*' },
        });
    }

    async remove(id: number) {
        const rule = await this.popupRuleRepo.findOne({ where: { id } });
        if (!rule) throw new NotFoundException('Rule not found');
        return this.popupRuleRepo.remove(rule);
    }
}
