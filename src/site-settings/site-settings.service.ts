import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSetting } from './entities/site-setting.entity';

@Injectable()
export class SiteSettingsService {
  constructor(
    @InjectRepository(SiteSetting)
    private siteSettingsRepo: Repository<SiteSetting>,
  ) {}

  // Always fetch ID 1 (Since there is only ever one global settings row)
  async getSettings() {
    let settings = await this.siteSettingsRepo.findOne({ where: { id: 1 } });
    if (!settings) {
      settings = this.siteSettingsRepo.create({ 
        id: 1, 
        phone: '+91-9999999999', 
        address: 'Noida, Uttar Pradesh, India',
        email: 'info@hcinterior.in'
      });
      await this.siteSettingsRepo.save(settings);
    }
    return settings;
  }

  async updateSettings(updateData: any) {
    let settings = await this.getSettings();
    Object.assign(settings, updateData);
    return this.siteSettingsRepo.save(settings);
  }
}