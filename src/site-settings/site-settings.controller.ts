import { Controller, Get, Patch, Body, ForbiddenException, Request, UseGuards } from '@nestjs/common';
import { SiteSettingsService } from './site-settings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('site-settings')
export class SiteSettingsController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Get()
  getSettings() {
    return this.siteSettingsService.getSettings();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  updateSettings(@Body() data: any, @Request() req) {
    if (req.user?.role !== 'Admin') {
      throw new ForbiddenException('Only admins can update global site settings.');
    }
    return this.siteSettingsService.updateSettings(data);
  }
}
