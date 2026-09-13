import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category name required' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
