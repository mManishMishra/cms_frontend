import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PopupRulesService } from './popup-rules.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreatePopupRuleDto } from './dto/create-popup-rule.dto';

@Controller('popup-rules')
export class PopupRulesController {
    constructor(private readonly popupRulesService: PopupRulesService) {}

    // Public route - Frontend fetches a resolved rule for the current page.
    @Get('resolve')
    resolveForPath(@Query('path') path: string) {
        return this.popupRulesService.resolveForPath(path);
    }

    // Public route - Frontend/CMS fetches all rules to apply them
    @Get()
    findAll() {
        return this.popupRulesService.findAll();
    }

    // Protected Admin routes
    @UseGuards(AuthGuard('jwt'), RolesGuard)
        @Roles(Role.Admin)
    @Post()
    createOrUpdate(@Body() dto: CreatePopupRuleDto) {
        return this.popupRulesService.createOrUpdate(dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
        @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.popupRulesService.remove(+id);
    }
}
