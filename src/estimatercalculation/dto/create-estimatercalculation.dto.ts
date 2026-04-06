import { IsEnum, IsNotEmpty, IsString, IsInt, IsDecimal, IsBoolean, IsOptional } from 'class-validator';

export class CreateEstimatercalculationDto {
  @IsInt()
  @IsNotEmpty()
  package_id: number;

  @IsInt()
  @IsNotEmpty()
  size_type_id: number;

  @IsInt()
  @IsNotEmpty()
  property_sub_type_id: number;

  @IsEnum(['furniture', 'modular', 'services'])
  @IsNotEmpty()
  category: 'furniture' | 'modular' | 'services';

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  rate: number;

  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsBoolean()
  @IsOptional()
  movable_furniture: boolean;
}

export class GetEstimationQuatationDto {

  @IsInt()
  @IsNotEmpty()
  size_type: number;

  @IsInt()
  @IsNotEmpty()
  bedroom: number;

  @IsInt()
  @IsNotEmpty()
  toilet: number;

  @IsInt()
  @IsNotEmpty()
  living: number;

  @IsInt()
  @IsNotEmpty()
  kitchen: number;

  @IsInt()
  @IsNotEmpty()
  package_id: number;

  @IsBoolean()
  @IsOptional()
  isfuniture_movable: boolean;
}
