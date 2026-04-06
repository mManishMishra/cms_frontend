// import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe, UploadedFiles } from '@nestjs/common';
// import { CmsCityService } from './cms_city.service';
// import { CreateCmsCityDto } from './dto/create-cms_city.dto';
// import { UpdateCmsCityDto } from './dto/update-cms_city.dto';
// import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
// import { CityType } from './entities/cms_city.entity';

// @Controller('cms-city')
// export class CmsCityController {
//   constructor(private readonly cmsCityService: CmsCityService) {}

//   // @Post()
//   // create(@Body() createCmsCityDto: CreateCmsCityDto) {
//   //   return this.cmsCityService.create(createCmsCityDto);
//   // }
 
//   @Post()
//   @UseInterceptors(FileInterceptor('location_image'), FileInterceptor('side_image'))
//   async uploadFiles(
//     @Body() createCmsCityDto: CreateCmsCityDto,
//     @UploadedFile() locationImage: Express.Multer.File,
//     @UploadedFile() sideImage: Express.Multer.File,
//   ) {
//     if (!locationImage || !sideImage) {
//       throw new Error('Files are not uploaded');
//     }
//     const locationImagePath = locationImage.filename;
//     const sideImagePath = sideImage.filename;
//     return this.cmsCityService.create(createCmsCityDto, locationImagePath, sideImagePath);
//   }

//   @Get()
//   findAll() {
//     return this.cmsCityService.findAll();
//   }

//   @Get(':city_type')
//   findOne(@Param('city_type') cityType: CityType) {
//     return this.cmsCityService.findOne(cityType);
//   }

//   @Patch(':id')
//   @UseInterceptors(FileFieldsInterceptor([
//     { name: 'location_image', maxCount: 1 },
//     { name: 'side_image', maxCount: 1 },
//   ]))
//   async update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() updateCmsCityDto: UpdateCmsCityDto,
//     @UploadedFiles() files: { location_image?: Express.Multer.File[], side_image?: Express.Multer.File[] }
//   ) {
//     const location_image = files.location_image ? files.location_image[0].filename : null
//     const side_image = files.side_image ? files.side_image[0].filename : null
    

//     return this.cmsCityService.update(id, updateCmsCityDto, location_image, side_image);
//   }

//   @Patch('seo-content/:id')
//   async updateSeoContent(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() seo_content: any
//   ) {
//     return this.cmsCityService.updateSeoContent(id, seo_content);
//   }


//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.cmsCityService.remove(+id);
//   }
// }

import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe, UploadedFiles } from '@nestjs/common';
import { CmsCityService } from './cms_city.service';
import { CreateCmsCityDto } from './dto/create-cms_city.dto';
import { UpdateCmsCityDto } from './dto/update-cms_city.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('cms-city')
export class CmsCityController {
  constructor(private readonly cmsCityService: CmsCityService) {}
 
  @Post()
  @UseInterceptors(FileInterceptor('location_image'), FileInterceptor('side_image'))
  async uploadFiles(
    @Body() createCmsCityDto: CreateCmsCityDto,
    @UploadedFile() locationImage: Express.Multer.File,
    @UploadedFile() sideImage: Express.Multer.File,
  ) {
    if (!locationImage || !sideImage) {
      throw new Error('Files are not uploaded');
    }
    const locationImagePath = locationImage.filename;
    const sideImagePath = sideImage.filename;
    return this.cmsCityService.create(createCmsCityDto, locationImagePath, sideImagePath);
  }

  @Get()
  findAll() {
    return this.cmsCityService.findAll();
  }

  // CHANGED: cityType is now a standard string instead of an Enum
  @Get(':city_type')
  findOne(@Param('city_type') cityType: string) {
    return this.cmsCityService.findOne(cityType);
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'location_image', maxCount: 1 },
    { name: 'side_image', maxCount: 1 },
  ]))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCmsCityDto: UpdateCmsCityDto,
    @UploadedFiles() files: { location_image?: Express.Multer.File[], side_image?: Express.Multer.File[] }
  ) {
    const location_image = files.location_image ? files.location_image[0].filename : null
    const side_image = files.side_image ? files.side_image[0].filename : null
    
    return this.cmsCityService.update(id, updateCmsCityDto, location_image, side_image);
  }

  @Patch('seo-content/:id')
  async updateSeoContent(
    @Param('id', ParseIntPipe) id: number,
    @Body() seo_content: any
  ) {
    return this.cmsCityService.updateSeoContent(id, seo_content);
  }

  // NEW: Duplicate Endpoint for CMS
  @Post(':id/duplicate')
  duplicate(@Param('id', ParseIntPipe) id: number) {
    return this.cmsCityService.duplicate(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cmsCityService.remove(+id);
  }
}