import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private readonly userRepo: UserRepository) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            console.log('Creating user with data:', createUserDto);
            const newUser = this.userRepo.create({
                ...createUserDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return await this.userRepo.save(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async findAll(): Promise<User[]> {
        try {
            console.log('Fetching all users');
            return await this.userRepo.find();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new InternalServerErrorException('Failed to fetch users');
        }
    }

    async findOne(id: number): Promise<User> {
        try {
            console.log(`Fetching user with ID: ${id}`);
            const user = await this.userRepo.findOneBy({ id });
            if (!user) {
                throw new NotFoundException(`User with ID #${id} not found`);
            }
            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new InternalServerErrorException(`Failed to fetch user with ID #${id}`);
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            console.log(`Updating user with ID: ${id}`);
            const user = await this.findOne(id);
            const updatedUser = {
                ...user,
                ...updateUserDto,
                updatedAt: new Date(),
            };

            await this.userRepo.update(id, updatedUser);
            return this.findOne(id);
        } catch (error) {
            console.error(`Error updating user with ID: ${id}`, error);
            throw new InternalServerErrorException(`Failed to update user with ID #${id}`);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            console.log(`Removing user with ID: ${id}`);
            const user = await this.findOne(id);
            await this.userRepo.remove(user);
        } catch (error) {
            console.error(`Error removing user with ID: ${id}`, error);
            throw new InternalServerErrorException(`Failed to remove user with ID #${id}`);
        }
    }

    async checkIfUserExists(conditions: { username?: string; email?: string; phoneNumber?: string }): Promise<{ exists: boolean }> {
        try {
            const { username, email, phoneNumber } = conditions;
            const user = await this.userRepo.findOne({
                where: [{ username }, { email }, { phoneNumber }],
            });
            return { exists: !!user };
        } catch (error) {
            console.error('Error checking if user exists:', error);
            throw new InternalServerErrorException('Failed to check if user exists');
        }
    }

    async getUserIfExists(conditions: { username?: string; email?: string; phoneNumber?: string }): Promise<User | null> {
        try {
            const { username, email, phoneNumber } = conditions;
            const user = await this.userRepo.findOne({
                where: [{ username }, { email }, { phoneNumber }],
            });
            return user || null;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw new InternalServerErrorException('Failed to fetch user data');
        }
    }
}
