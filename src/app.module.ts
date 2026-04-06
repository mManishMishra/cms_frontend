import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { dbConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { EstimaterModule } from './modules/estimater/estimater.module';
import { ContactModule } from './modules/contact/contact.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { ContactUsModule } from './modules/contact-us/contact-us.module';
import { ContentManagerModule } from './modules/content-manager/content-manager.module';
import { QueriesModule } from './modules/queries/queries.module';
import { ConfigModule } from '@nestjs/config';
import { OtpModule } from './modules/otp/otp.module';
import { LetsConnectModule } from './modules/lets-connect/lets-connect.module';
import { ReachOutModule } from './modules/reach-out/reach-out.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { ProductFormModule } from './modules/product-form/product-form.module';
import { EstimatercalculationModule } from './estimatercalculation/estimatercalculation.module';
import { SizeTypeModule } from './size-type/size-type.module';
import { CategoryModule } from './category/category.module';
import { PackageModule } from './package/package.module';
import { PropertySubTypeModule } from './property-sub-type/property-sub-type.module';
import { CmsGalleryDesignModule } from './cms-gallery-design/cms-gallery-design.module';
import { CmsProductModule } from './cms-product/cms-product.module';
import { CmsExperienceCenterModule } from './cms-experience-center/cms-experience-center.module';
import { CmsReallifePortfolioModule } from './cms-reallife-portfolio/cms-reallife-portfolio.module';
import { CmsContentModule } from './cms_content/cms_content.module';
import { CmsCityModule } from './cms_city/cms_city.module';
import { CmsParentChildModule } from './cms_parent_child/cms_parent_child.module';
import { PortfolioProjectModule } from './portfolio_project/portfolio_project.module';
import { CmsBlogModule } from './cms_blog/cms_blog.module';
import { UserQueriesModule } from './user_queries/user_queries.module';
import { ManageJobModule } from './manage_job/manage_job.module';
import { LookMenuModule } from './look_menu/look_menu.module';
import { JobApplicationModule } from './job_application/job_application.module';
import { FooterLinkModule } from './footer_link/footer_link.module';
import { SeoTagModule } from './seo_tag/seo_tag.module';

import { CmsPagesModule } from './cms-pages/cms-pages.module';
import configuration from './config/configuration';
import { RedirectsModule } from './redirects/redirects.module';
import { SiteSettingsModule } from './site-settings/site-settings.module';
import { CmsUsersModule } from './cms-users/cms-users.module';
import { PopupRulesModule } from './popup-rules/popup-rules.module';
import { RobotsTxtModule } from './robots-txt/robots-txt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(dbConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve files from the 'uploads' directory
      serveRoot: '/uploads', // Serve files at the '/uploads' route
    }),
    UsersModule,
    AuthModule,
    EstimaterModule,
    ContactModule,
    BlogsModule,
    ContactUsModule,
    ContentManagerModule,
    QueriesModule,
    OtpModule,
    LetsConnectModule,
    ReachOutModule,
    ExperienceModule,
    ProductFormModule,
    EstimatercalculationModule,
    SizeTypeModule,
    CategoryModule,
    PackageModule,
    PropertySubTypeModule,
    CmsGalleryDesignModule,
    CmsProductModule,
    CmsExperienceCenterModule,
    CmsReallifePortfolioModule,
    CmsContentModule,
    CmsCityModule,
    CmsParentChildModule,
    PortfolioProjectModule,
    CmsBlogModule,
    UserQueriesModule,
    ManageJobModule,
    JobApplicationModule,
    LookMenuModule,
    FooterLinkModule,
    SeoTagModule,

    CmsPagesModule,
    RedirectsModule,
    SiteSettingsModule,
    CmsUsersModule,
    PopupRulesModule,
    RobotsTxtModule
  ],
  })
export class AppModule {}