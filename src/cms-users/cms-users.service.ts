import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'; 
import { User } from 'src/entities/user.entity';
import { Role } from 'src/auth/enums/role.enum';
import {
    CmsPermissions,
    getDefaultCmsPermissions,
    getEffectiveCmsPermissions,
    normalizeCmsPermissions,
} from 'src/auth/utils/cms-access.util';

@Injectable()
export class CmsUsersService {
    constructor(
        @InjectRepository(User)
        private readonly cmsUserRepo: Repository<User>,
    ) {}

    private serializeCmsUser(user: User): User {
        return {
            ...user,
            cms_permissions: getEffectiveCmsPermissions(user),
        } as User;
    }

    async create(userData: any): Promise<User> {
        // Check if email OR username already exists
        const existing = await this.cmsUserRepo.findOne({
            where: [{ email: userData.email }, { username: userData.username || userData.email }]
        });
        
        if (existing) {
            throw new BadRequestException('An internal user with this email or username already exists.');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const normalizedRole = userData.role === Role.Admin ? Role.Admin : Role.Editor;

        // 🌟 THE FIX: Explicitly mapping the NOT NULL database columns
        const newUser = this.cmsUserRepo.create({
            ...userData,
            role: normalizedRole,
            username: userData.username || userData.email, // Fallback to email if empty
            phoneNumber: userData.phoneNumber || '0000000000', 
            gender: userData.gender || 'Not Specified',
            dateOfBirth: userData.dateOfBirth || new Date(), 
            isVerified: true,
            status: 'Active',
            password: hashedPassword,
            cms_permissions: normalizeCmsPermissions(userData.cms_permissions, normalizedRole),
        } as Partial<User>);

        const savedUser = await this.cmsUserRepo.save(newUser as any);
        return this.serializeCmsUser(savedUser as User);
    }

    async findAll(): Promise<User[]> {
        const users = await this.cmsUserRepo.find({ 
            where: [ { role: 'Admin' }, { role: 'Editor' } ],
            order: { createdAt: 'DESC' } 
        });

        return users.map((user) => this.serializeCmsUser(user));
    }

    async updateRole(id: number, role: string): Promise<User> {
        const user = await this.cmsUserRepo.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        
        const normalizedRole = role === Role.Admin ? Role.Admin : Role.Editor;
        user.role = normalizedRole;
        user.cms_permissions = getDefaultCmsPermissions(normalizedRole);

        const savedUser = await this.cmsUserRepo.save(user as any);
        return this.serializeCmsUser(savedUser as User);
    }

    async updateCmsPermissions(id: number, cmsPermissions: Partial<CmsPermissions>): Promise<User> {
        const user = await this.cmsUserRepo.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');

        user.cms_permissions = normalizeCmsPermissions(cmsPermissions, user.role);
        const savedUser = await this.cmsUserRepo.save(user as any);
        return this.serializeCmsUser(savedUser as User);
    }

    async updateStatus(id: number, status: string): Promise<User> {
        const user = await this.cmsUserRepo.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        
        user.status = status;
        const savedUser = await this.cmsUserRepo.save(user as any);
        return this.serializeCmsUser(savedUser as User);
    }

    async remove(id: number): Promise<void> {
        const user = await this.cmsUserRepo.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        
        await this.cmsUserRepo.remove(user);
    }
}
