import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    Query,
    BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
        const user = req.user;
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll(@Req() req: Request) {
        const user = req.user;
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id: number, @Req() req: Request) {
        const user = req.user;
        return this.usersService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
        const user = req.user;
        return this.usersService.update(id, updateUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: number, @Req() req: Request) {
        const user = req.user;
        return this.usersService.remove(id);
    }

    @Get('check/exists')
    async checkIfUserExists(
        @Query('username') username?: string,
        @Query('email') email?: string,
        @Query('phoneNumber') phoneNumber?: string,
    ) {
        // Check if at least one parameter is provided
        if (!username && !email && !phoneNumber) {
            throw new BadRequestException('At least one parameter (username, email, phoneNumber) is required');
        }
        return await this.usersService.checkIfUserExists({ username, email, phoneNumber });
    }

    // Endpoint to check if user exists and return user data
    @Get('check/user')
    async getUserIfExists(
        @Query('username') username?: string,
        @Query('email') email?: string,
        @Query('phoneNumber') phoneNumber?: string,
    ) {
        // Check if at least one parameter is provided
        if (!username && !email && !phoneNumber) {
            throw new BadRequestException('At least one parameter (username, email, phoneNumber) is required');
        }
        return await this.usersService.getUserIfExists({ username, email, phoneNumber });
    }
}
