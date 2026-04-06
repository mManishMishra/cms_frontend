// import { Injectable } from '@nestjs/common';
// import { CreateCmsCityDto } from './dto/create-cms_city.dto';
// import { UpdateCmsCityDto } from './dto/update-cms_city.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CityType, CmsCity } from './entities/cms_city.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class CmsCityService {
//   constructor(
//     @InjectRepository(CmsCity)
//     private readonly cmsCityRepository: Repository<CmsCity>,
//   ) {}


//   async create(createCmsCityDto: CreateCmsCityDto, location_image: string, side_image: string) {
//     const cmsCity = this.cmsCityRepository.create({
//       ...createCmsCityDto,
//       location_image,
//       side_image,
//     });
//     return this.cmsCityRepository.save(cmsCity);
//   }

//   async findAll() {
//     const cities = await this.cmsCityRepository.find();
//     const baseUrl = `${process.env.BASE_URL}/uploads/city/`;

//     return cities.map(city => ({
//       ...city,
//       location_image: city.location_image ? `${baseUrl}${city.location_image}` : null,
//       side_image: city.side_image ? `${baseUrl}${city.side_image}` : null,
//     }));
//   }

//   async findOne(city_type: CityType) {
//     const city = await this.cmsCityRepository.findOneBy({ city_type });
//     if (!city) {
//       return null;
//     }
//     const baseUrl = `${process.env.BASE_URL}/uploads/city/`;
//     return {
//       ...city,
//       location_image: city.location_image ? `${baseUrl}${city.location_image}` : null,
//       side_image: city.side_image ? `${baseUrl}${city.side_image}` : null,
//     };
//   }

//   async update(id: number, updateCmsCityDto: UpdateCmsCityDto, location_image: string, side_image: string) {
//     const updateData: Partial<UpdateCmsCityDto & { location_image: string; side_image: string }> = {
//       ...updateCmsCityDto,
//     };

//     if (location_image) {
//       updateData.location_image = location_image;
//     }

//     if (side_image) {
//       updateData.side_image = side_image;
//     }

//     await this.cmsCityRepository.update(id, updateData);
//     return this.cmsCityRepository.findOneBy({ id });
//   }

//   async updateSeoContent(id: number, seo_content: any) {
//     const cityData = await this.cmsCityRepository.findOneBy({ id });
//     if (!cityData) {
//       throw new Error(`City with id ${id} not found`);
//     }
//     await this.cmsCityRepository.update(id, { seo_content });
//     return { message: `SEO content for city with id ${id} has been updated` };
//   }

//   remove(id: number) {
//     return `This action removes a #${id} cmsCity`;
//   }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCmsCityDto } from './dto/create-cms_city.dto';
import { UpdateCmsCityDto } from './dto/update-cms_city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CmsCity } from './entities/cms_city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CmsCityService {
  constructor(
    @InjectRepository(CmsCity)
    private readonly cmsCityRepository: Repository<CmsCity>,
  ) {}

  async create(createCmsCityDto: CreateCmsCityDto, location_image: string, side_image: string) {
    const cmsCity = this.cmsCityRepository.create({
      ...createCmsCityDto,
      location_image,
      side_image,
    });
    return this.cmsCityRepository.save(cmsCity);
  }

  async findAll() {
    const cities = await this.cmsCityRepository.find({ order: { id: 'DESC' } });
    const baseUrl = `${process.env.BASE_URL}/uploads/city/`;

    return cities.map(city => ({
      ...city,
      location_image: city.location_image ? `${baseUrl}${city.location_image}` : null,
      side_image: city.side_image ? `${baseUrl}${city.side_image}` : null,
    }));
  }

  // Updated to accept string instead of Enum
  async findOne(city_type: string) {
    const city = await this.cmsCityRepository.findOneBy({ city_type });
    if (!city) return null;
    const baseUrl = `${process.env.BASE_URL}/uploads/city/`;
    return {
      ...city,
      location_image: city.location_image ? `${baseUrl}${city.location_image}` : null,
      side_image: city.side_image ? `${baseUrl}${city.side_image}` : null,
    };
  }

  async update(id: number, updateCmsCityDto: UpdateCmsCityDto, location_image: string, side_image: string) {
    const updateData: Partial<UpdateCmsCityDto & { location_image: string; side_image: string }> = {
      ...updateCmsCityDto,
    };

    if (location_image) updateData.location_image = location_image;
    if (side_image) updateData.side_image = side_image;

    await this.cmsCityRepository.update(id, updateData);
    return this.cmsCityRepository.findOneBy({ id });
  }

  async updateSeoContent(id: number, seo_content: any) {
    const cityData = await this.cmsCityRepository.findOneBy({ id });
    if (!cityData) throw new Error(`City with id ${id} not found`);
    await this.cmsCityRepository.update(id, { seo_content });
    return { message: `SEO content updated` };
  }

  // --- NEW: DUPLICATE METHOD ---
  async duplicate(id: number) {
    const existingCity = await this.cmsCityRepository.findOneBy({ id });
    if (!existingCity) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }

    // Create a new copy of the data, stripped of the ID
    const newCityData = this.cmsCityRepository.create({
      ...existingCity,
      id: undefined, // Let the DB auto-generate the new ID
      city_type: `${existingCity.city_type}-copy-${Date.now()}`, // Ensure uniqueness
      main_title: `${existingCity.main_title} (Copy)`,
    });

    return await this.cmsCityRepository.save(newCityData);
  }

  remove(id: number) {
    return this.cmsCityRepository.delete(id);
  }
}