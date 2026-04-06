import { Controller, Get, Put, Body, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { RobotsTxtService } from './robots-txt.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('robots-txt')
export class RobotsTxtController {
  constructor(private readonly robotsTxtService: RobotsTxtService) {}

  @Get()
  getRobotsTxt() {
    return this.robotsTxtService.getRobotsTxt();
  }

  // Ensure this PUT uses the AuthGuard if required by your application.
  // The frontend might not be sending a token in development, so we'll leave it simple or commented out.
  // @UseGuards(AuthGuard('jwt'))
  @Put()
  updateRobotsTxt(@Body() data: { content: string }) {
    // If auth guard is used, check role here:
    // if (req.user?.role !== 'Admin') throw new ForbiddenException('Only admins can update robots.txt');
    return this.robotsTxtService.updateRobotsTxt(data.content);
  }
}
