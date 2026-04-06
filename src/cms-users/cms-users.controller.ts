import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, UseGuards } from '@nestjs/common';
import { CmsUsersService } from './cms-users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator'; 
import { Role } from 'src/auth/enums/role.enum';

// 🌟 Completely isolated route to avoid Next.js and NestJS routing conflicts!
@Controller('cms-users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Admin) // 🔒 LOCK THE ENTIRE CONTROLLER TO ADMINS ONLY
export class CmsUsersController {
    constructor(private readonly cmsUsersService: CmsUsersService) {}

    @Post()
    create(@Body() body: any) {
        if (!body.email || !body.password || !body.role) {
            throw new BadRequestException('Email, password, and role are required');
        }
        return this.cmsUsersService.create(body);
    }

    @Get()
    findAll() {
        return this.cmsUsersService.findAll();
    }

    @Patch(':id/role')
    updateRole(@Param('id', ParseIntPipe) id: number, @Body('role') role: string) {
        if (!role) throw new BadRequestException('Role is required');
        return this.cmsUsersService.updateRole(id, role);
    }

    @Patch(':id/permissions')
    updatePermissions(
        @Param('id', ParseIntPipe) id: number,
        @Body('cms_permissions') cmsPermissions: any,
        @Body('permissions') permissions: any,
    ) {
        const resolvedPermissions = cmsPermissions || permissions;
        if (!resolvedPermissions) throw new BadRequestException('CMS permissions are required');
        return this.cmsUsersService.updateCmsPermissions(id, resolvedPermissions);
    }

    @Patch(':id/status')
    updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
        if (!status) throw new BadRequestException('Status is required');
        return this.cmsUsersService.updateStatus(id, status);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.cmsUsersService.remove(id);
    }
}
