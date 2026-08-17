import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CrearAlmacenDto {
  @ApiProperty({
    description: 'Nombre del almacén',
    example: 'Almacén Principal',
  })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiPropertyOptional({
    description: 'Ubicación del almacén',
    example: 'Av. La Marina 250',
  })
  @IsString()
  @IsOptional()
  ubicacion?: string;
}