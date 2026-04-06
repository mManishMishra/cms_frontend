import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsUsersService } from './cms-users.service';
import { CmsUsersController } from './cms-users.controller';
import { CmsUser } from './entities/cms-user.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CmsUsersController],
  providers: [CmsUsersService],
})
export class CmsUsersModule {}