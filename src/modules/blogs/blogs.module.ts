import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BlogRepository } from 'src/repositories/blogs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/entities/blogs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  controllers: [BlogsController],
  providers: [BlogsService,BlogRepository],
  exports: [BlogsService],
})
export class BlogsModule {}
