import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CmsPagesService } from './cms-pages.service';
import { CreateCmsPageDto } from './dto/create-cms-page.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('cms-pages')
export class CmsPagesController {
    constructor(private readonly cmsPagesService: CmsPagesService) {}

    // 🔒 Protect Creation (Extract req.user to enforce editor rules)
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createCmsPageDto: CreateCmsPageDto, @Request() req) {
        return this.cmsPagesService.create(createCmsPageDto, req.user);
    }

    // Public or Admin fetching all
    @Get()
    findAll() {
        return this.cmsPagesService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('all')
    findAllForCms() {
        return this.cmsPagesService.findAllForCms();
    }

    // Public single fetch by slug
    @Get('slug/:slug')
    findBySlug(@Param('slug') slug: string) {
        return this.cmsPagesService.findBySlug(slug);
    }

    // Fetch single by ID
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cmsPagesService.findOne(+id);
    }

    // 🔒 Protect Update (Extract req.user to enforce editor rules)
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: any, @Request() req) {
        return this.cmsPagesService.update(+id, updateData, req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('seo-content/:id')
    updateSeoContent(@Param('id') id: string, @Body() seo_content: any, @Request() req) {
        return this.cmsPagesService.updateSeoContent(+id, seo_content, req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/duplicate')
    duplicate(@Param('id') id: string) {
        return this.cmsPagesService.duplicate(+id);
    }

    // ⛔ STRICT SECURITY: ONLY Admins can delete pages
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cmsPagesService.remove(+id);
    }
}
