import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Redirect } from './entity/redirect.entity';
import { CreateRedirectDto } from './dto/create-redirect.dto';
import { resolveBooleanPublishState } from '../auth/utils/cms-access.util';

@Injectable()
export class RedirectsService {
  constructor(
    @InjectRepository(Redirect)
    private readonly redirectRepository: Repository<Redirect>,
  ) {}

  private formatUrl(url: string): string {
    if (!url || url === '/') return '/';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (!url.startsWith('/')) return `/${url}`;
    return url;
  }

  async create(createRedirectDto: CreateRedirectDto, user?: any) {
    createRedirectDto.old_url = this.formatUrl(createRedirectDto.old_url);
    createRedirectDto.new_url = this.formatUrl(createRedirectDto.new_url);
    const resolvedActiveState = resolveBooleanPublishState(
      createRedirectDto.is_active ?? true,
      user,
    );
    
    const redirect = this.redirectRepository.create({
      ...createRedirectDto,
      is_active:
        typeof resolvedActiveState === 'boolean'
          ? resolvedActiveState
          : createRedirectDto.is_active ?? true,
    });
    return await this.redirectRepository.save(redirect);
  }

  // --- BULK REDIRECT SUPPORT ---
  async createBulk(redirectsData: CreateRedirectDto[], user?: any) {
    const formattedRedirects = redirectsData.map(item => {
      const resolvedActiveState = resolveBooleanPublishState(true, user);
      return this.redirectRepository.create({
        old_url: this.formatUrl(item.old_url),
        new_url: this.formatUrl(item.new_url),
        status_code: Number(item.status_code) || 301,
        is_active: typeof resolvedActiveState === 'boolean' ? resolvedActiveState : true,
      });
    });
    return await this.redirectRepository.save(formattedRedirects);
  }

  async findAll() {
    return await this.redirectRepository.find({ order: { created_at: 'DESC' } });
  }

  async findAllActive() {
    return await this.redirectRepository.find({ where: { is_active: true } });
  }

  async findOne(id: number) {
    const redirect = await this.redirectRepository.findOne({ where: { id } });
    if (!redirect) throw new NotFoundException(`Redirect ID ${id} not found`);
    return redirect;
  }

  async update(id: number, updateData: any, user?: any) {
    const redirect = await this.findOne(id);
    if (updateData.old_url) updateData.old_url = this.formatUrl(updateData.old_url);
    if (updateData.new_url) updateData.new_url = this.formatUrl(updateData.new_url);
    if (updateData.is_active !== undefined) {
      const resolvedActiveState = resolveBooleanPublishState(updateData.is_active, user);
      updateData.is_active =
        typeof resolvedActiveState === 'boolean'
          ? resolvedActiveState
          : updateData.is_active;
    }

    Object.assign(redirect, updateData);
    return await this.redirectRepository.save(redirect);
  }

  async remove(id: number) {
    const redirect = await this.findOne(id);
    return await this.redirectRepository.remove(redirect);
  }
}
