import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { UserRepository } from 'src/repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { getEffectiveCmsPermissions } from 'src/auth/utils/cms-access.util';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginUserDto) {
        const { email, username, password } = loginDto;
        const user = await this.userRepo.findOne({
            where: email ? { email } : { username },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password).catch(() => false);

        if (!isPasswordValid && password !== user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (user.status && user.status !== 'Active') {
            throw new UnauthorizedException('Your CMS access is suspended. Please contact an administrator.');
        }

        const cmsPermissions = getEffectiveCmsPermissions(user);

        // 🌟 FIX: Inject the role into the JWT Token payload!
        const payload = { 
            username: user.username, 
            sub: user.id,
            role: user.role || 'User', // Default to User if none exists
            cms_permissions: cmsPermissions,
        };
        const token = this.jwtService.sign(payload);

        const { password: _, ...userWithoutPassword } = user;

        return {
            message: 'Login successful',
            user: {
                ...userWithoutPassword,
                cms_permissions: cmsPermissions,
            },
            accessToken: token,
        };
    }

    async register(registerDto: RegisterUserDto) {
        try {
            const existingUser = await this.userRepo.findOne({
                where: [{ email: registerDto.email }, { username: registerDto.username }],
            });

            if (existingUser) {
                throw new ConflictException('User with this email or username already exists.');
            }

            const hashedPassword = await bcrypt.hash(registerDto.password, 10);
            const newUser = {
                ...registerDto,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const user = this.userRepo.create(newUser);
            await this.userRepo.save(user);

            const { password, ...userWithoutPassword } = user;
            return {
                message: 'User registered successfully.',
                user: userWithoutPassword,
            };
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while creating the user.');
        }
    }
}
