import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstimatercalculationDto, GetEstimationQuatationDto } from './dto/create-estimatercalculation.dto';
import { UpdateEstimatercalculationDto } from './dto/update-estimatercalculation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estimatercalculation } from 'src/entities/estimatercalculation.entity';
import { In, Repository } from 'typeorm';
import { SizeType } from 'src/entities/size-type.entity';
import { PropertySubType } from 'src/property-sub-type/entities/property-sub-type.entity';
import { Package } from 'src/package/entities/package.entity';

@Injectable()
export class EstimatercalculationService {

  constructor(
    @InjectRepository(Estimatercalculation)
    private readonly estimaterCalculationRepository: Repository<Estimatercalculation>,
    @InjectRepository(SizeType)
    private readonly sizeTypeRepository: Repository<SizeType>,
    @InjectRepository(PropertySubType)
    private readonly propertySubTypeRepository: Repository<PropertySubType>,
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>
  ) { }

  async create(createEstimatercalculationDto: CreateEstimatercalculationDto) {
    const { size_type_id, property_sub_type_id, package_id, ...rest } = createEstimatercalculationDto;
  
    const sizeType = await this.sizeTypeRepository.findOne({ where: { id: size_type_id } });
    const propertySubType = await this.propertySubTypeRepository.findOne({ where: { id: property_sub_type_id } });
    const packageEntity = await this.packageRepository.findOne({ where: { id: package_id } });
  
    if (!sizeType || !propertySubType || !packageEntity) {
      throw new NotFoundException('Related entity not found');
    }
  
    const newEstimation = this.estimaterCalculationRepository.create({
      ...rest,
      sizeType,
      propertySubType,
      package: packageEntity
    });
  
    return await this.estimaterCalculationRepository.save(newEstimation);
  }

  async findAll(): Promise<Estimatercalculation[]> {
    return await this.estimaterCalculationRepository.find();
  }

  async findWithConditions(ProprtyType: string, RoomName: string, PackageType: string):
    Promise<Estimatercalculation[]> {
    const conditions: any = {};
    conditions.ProprtyType = ProprtyType;

    if (RoomName) {
      conditions.RoomName = RoomName;
    }

    if (PackageType) {
      conditions.PackageType = PackageType;
    }

    return await this.estimaterCalculationRepository.find({ where: conditions });
  }

  async findOne(Id: number): Promise<Estimatercalculation> {
    const estimation = await this.estimaterCalculationRepository.findOne({ where: { id: Id } });
    if (!estimation) {
      throw new NotFoundException(`Estimation with ID ${Id} not found`);
    }
    return estimation;
  }

  async update(id: number, updateEstimatercalculationDto: UpdateEstimatercalculationDto): Promise<Estimatercalculation> {
    const { size_type_id, property_sub_type_id, package_id, ...rest } = updateEstimatercalculationDto;
  
    const sizeType = size_type_id ? await this.sizeTypeRepository.findOne({ where: { id: size_type_id } }) : null;
    const propertySubType = property_sub_type_id ? await this.propertySubTypeRepository.findOne({ where: { id: property_sub_type_id } }) : null;
    const packageEntity = package_id ? await this.packageRepository.findOne({ where: { id: package_id } }) : null;
  
    if (size_type_id && !sizeType) {
      throw new NotFoundException('SizeType not found');
    }
    if (property_sub_type_id && !propertySubType) {
      throw new NotFoundException('PropertySubType not found');
    }
    if (package_id && !packageEntity) {
      throw new NotFoundException('Package not found');
    }
  
    const updateData = {
      ...rest,
      ...(sizeType && { sizeType }),
      ...(propertySubType && { propertySubType }),
      ...(packageEntity && { package: packageEntity })
    };
  
    await this.estimaterCalculationRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.estimaterCalculationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Estimation with ID ${id} not found`);
    }
  }

  // async findAllByCategory(packageId: number): Promise<any> {
  //   const estimations = await this.estimaterCalculationRepository.find({
  //     where: { package: { id: packageId } },
  //     relations: ['sizeType', 'propertySubType', 'package']
  //   });

  //   const groupedEstimations = estimations.reduce((acc, estimation) => {
  //     const { propertySubType, sizeType } = estimation;

  //     if (!acc[sizeType.name]) {
  //       acc[sizeType.name] = {};
  //     }

  //     if (!acc[sizeType.name][propertySubType.name]) {
  //       acc[sizeType.name][propertySubType.name] = [];
  //     }

  //     acc[sizeType.name][propertySubType.name].push(estimation);

  //     return acc;
  //   }, {});

  //   return groupedEstimations;
  // }

  async findAllByCategory(packageId: number): Promise<any> {
    const estimations = await this.estimaterCalculationRepository.find({
      where: { package: { id: packageId } },
      relations: ['sizeType', 'propertySubType', 'package']
    });
  
    const groupedEstimations = estimations.reduce((acc, estimation) => {
      const { propertySubType, sizeType } = estimation;
  
      const sizeTypeData = {
        id: sizeType.id,
        name: sizeType.name
      };
  
      const propertySubTypeData = {
        id: propertySubType.id,
        name: propertySubType.name
      };
  
      const estimationData = {
        id: estimation.id,
        category: estimation.category,
        description: estimation.description,
        quantity: estimation.quantity,
        rate: estimation.rate,
        amount: estimation.amount,
        movable_furniture: estimation.movable_furniture,
        created_at: estimation.created_at,
        updated_at: estimation.updated_at
      };
  
      const existingEntry = acc.find(
        entry => entry.sizeType.id === sizeType.id && entry.propertySubType.id === propertySubType.id
      );
  
      if (existingEntry) {
        existingEntry.estimationData.push(estimationData);
      } else {
        acc.push({
          sizeType: sizeTypeData,
          propertySubType: propertySubTypeData,
          estimationData: [estimationData]
        });
      }
  
      return acc;
    }, []);
  
    return groupedEstimations;
  }

  async getEstimationQuatation(data: GetEstimationQuatationDto): Promise<any> {
    const { size_type, bedroom, toilet, living, kitchen, package_id, isfuniture_movable } = data;
    const sizeTypeData = await this.sizeTypeRepository.findOne({ where: { id: size_type } });

    let totalAmount = 0;
    let type = sizeTypeData.name;
    let room = [];
    let modular = [];
    let furniture = [];
    let services = [];

    const addDescriptionToCategory = (
      category: 'modular' | 'furniture' | 'services',
      description: string
    ) => {
      if (category === 'modular' && !modular.includes(description)) {
        modular.push(description);
      } else if (category === 'furniture' && !furniture.includes(description)) {
        furniture.push(description);
      } else if (category === 'services' && !services.includes(description)) {
        services.push(description);
      }
    };

    if (bedroom > 0) {
      room.push(`bedroom-${bedroom}`);

      const bedroomEstimations = await this.estimaterCalculationRepository.find({
        where: {
          propertySubType: { name: 'bedroom' },
          package: { id: package_id },
          sizeType: { id: size_type },
        },
        relations: ['propertySubType', 'package', 'sizeType']
      });
      console.log("bedroomEstimations", bedroomEstimations);

      if (!bedroomEstimations || bedroomEstimations.length === 0) {
        throw new NotFoundException('Estimation not found for Bedroom');
      }

      for (const estimation of bedroomEstimations) {
        //calculation based on furniture is movable or not
        if (estimation.category === 'furniture' && isfuniture_movable) {
          totalAmount += estimation.amount;
        } else if (estimation.category !== 'furniture') {
          totalAmount += estimation.amount;
        }
        addDescriptionToCategory(estimation.category, estimation.description);
      }
    }

    if (living > 0) {
      room.push(`living`);
      const livingEstimations = await this.estimaterCalculationRepository.find({
        where: {
          propertySubType: { name: 'living' },
          package: { id: package_id },
          sizeType: { id: size_type },
        },
        relations: ['propertySubType', 'package', 'sizeType']
      });

      if (!livingEstimations || livingEstimations.length === 0) {
        throw new NotFoundException('Estimation not found for Living Room');
      }

      for (const estimation of livingEstimations) {
        //calculation based on furniture is movable or not
        if (estimation.category === 'furniture' && isfuniture_movable) {
          totalAmount += estimation.amount;
        } else if (estimation.category !== 'furniture') {
          totalAmount += estimation.amount;
        }
        addDescriptionToCategory(estimation.category, estimation.description);
      }
    }

    if (toilet > 0) {
      room.push(`toilet`);
      const toiletEstimations = await this.estimaterCalculationRepository.find({
        where: {
          propertySubType: { name: 'toilet' },
          package: { id: package_id },
          sizeType: { id: size_type },
        },
        relations: ['propertySubType', 'package', 'sizeType']
      });

      if (!toiletEstimations || toiletEstimations.length === 0) {
        throw new NotFoundException('Estimation not found for Toilet');
      }

      for (const estimation of toiletEstimations) {
        totalAmount += estimation.amount;
        addDescriptionToCategory(estimation.category, estimation.description);
      }
    }

    if (kitchen > 0) {
      room.push(`kitchen`);
      const kitchenEstimations = await this.estimaterCalculationRepository.find({
        where: {
          propertySubType: { name: 'kitchen' },
          package: { id: package_id },
          sizeType: { id: size_type },
        },
        relations: ['propertySubType', 'package', 'sizeType']
      });

      if (!kitchenEstimations || kitchenEstimations.length === 0) {
        throw new NotFoundException('Estimation not found for Kitchen');
      }

      for (const estimation of kitchenEstimations) {
        totalAmount += estimation.amount;
        addDescriptionToCategory(estimation.category, estimation.description);
      }
    }

    // services calculation
    room.push(`services`);
    const servicesEstimations = await this.estimaterCalculationRepository.find({
      where: {
        propertySubType: { name: 'services' },
        package: { id: package_id },
        sizeType: { id: size_type },
      },
      relations: ['propertySubType', 'package', 'sizeType']
    });

    if (!servicesEstimations || servicesEstimations.length === 0) {
      throw new NotFoundException('Estimation not found for Services');
    }

    for (const estimation of servicesEstimations) {
      totalAmount += estimation.amount;
      addDescriptionToCategory(estimation.category, estimation.description);
    }

    return {
      totalAmount,
      type,
      room,
      modular,
      furniture,
      services
    }
  }
}