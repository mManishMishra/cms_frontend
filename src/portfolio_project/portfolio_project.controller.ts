import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Request, UseGuards } from '@nestjs/common';
import { PortfolioProjectService } from './portfolio_project.service';
import { CreatePortfolioProjectDto } from './dto/create-portfolio_project.dto';
import { UpdatePortfolioProjectDto } from './dto/update-portfolio_project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PortfolioPageType } from './entities/portfolio_project.entity';
import { AuthGuard } from '@nestjs/passport';
import { ensureCmsDeletePermission } from '../auth/utils/cms-access.util';

@Controller('portfolio-project')
export class PortfolioProjectController {
  constructor(private readonly portfolioProjectService: PortfolioProjectService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createPortfolioProjectDto: CreatePortfolioProjectDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const imagePath = file ? file.path : null;
    return this.portfolioProjectService.create(createPortfolioProjectDto, imagePath, req.user);
  }

  @Get(':type/page/:page/limit/:limit')
  findAllPaginated(@Param('type') type: PortfolioPageType, @Param('page') page: number, @Param('limit') limit: number) {
    return this.portfolioProjectService.findAllPaginated(type, page, limit);
  }

  //get status=active with pagination
  @Get('active/:type/page/:page/limit/:limit')
  findAllPaginatedStatus(@Param('type') type: PortfolioPageType, @Param('page') page: number, @Param('limit') limit: number) {
    return this.portfolioProjectService.findAllPaginatedActiveStatus(type, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioProjectService.findOne(+id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updatePortfolioProjectDto: UpdatePortfolioProjectDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const imagePath = file ? file.path : null;
    return this.portfolioProjectService.update(+id, updatePortfolioProjectDto, imagePath, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update-child-image/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateChildImage(
    @Param('id') id: string,
    @Body('childImageIndex') childImageIndex: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file.path : null;
    return this.portfolioProjectService.updateChildImage(+id, childImageIndex, imagePath);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    ensureCmsDeletePermission(req.user);
    return this.portfolioProjectService.remove(+id);
  }
}
