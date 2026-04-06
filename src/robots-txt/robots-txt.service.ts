import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RobotsTxt } from './entities/robots-txt.entity';

@Injectable()
export class RobotsTxtService {
  constructor(
    @InjectRepository(RobotsTxt)
    private robotsTxtRepo: Repository<RobotsTxt>,
  ) {}

  async getRobotsTxt() {
    let robotsTxt = await this.robotsTxtRepo.findOne({ where: { id: 1 } });
    if (!robotsTxt) {
      const defaultContent = `User-agent: *
Disallow: /dashboard
Disallow: /login
Disallow: .staging.
Disallow: /privacy-policy
Disallow: /term-and-condition
Disallow: /cancelletion-policy
Allow: /
Sitemap: https://hcinterior.in/sitemap.xml`;
      
      robotsTxt = this.robotsTxtRepo.create({ 
        id: 1, 
        content: defaultContent
      });
      await this.robotsTxtRepo.save(robotsTxt);
    }
    return robotsTxt;
  }

  async updateRobotsTxt(content: string) {
    let robotsTxt = await this.getRobotsTxt();
    robotsTxt.content = content;
    return this.robotsTxtRepo.save(robotsTxt);
  }
}
