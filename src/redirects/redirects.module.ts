import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedirectsService } from './redirects.service';
import { RedirectsController } from './redirects.controller';
import { Redirect } from './entity/redirect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Redirect])],
  controllers: [RedirectsController],
  providers: [RedirectsService],
  exports: [RedirectsService],
})
export class RedirectsModule {}