import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CrearEquipoDto {
  @ApiProperty({
    example: 'Laptop',
    description: 'Nombre del equipo',
  })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiPropertyOptional({
    example: 'Laptop para uso del laboratorio',
    description: 'Descripción del equipo',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    example: 'Operativo',
    description: 'Estado actual del equipo',
  })
  @IsString()
  @IsNotEmpty()
  estado!: string;

  @ApiPropertyOptional({
    example: 'LEN-2026-001',
    description: 'Número de serie del equipo',
  })
  @IsOptional()
  @IsString()
  numeroSerie?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador de la categoría',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  categoriaId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador de la marca',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  marcaId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador del proveedor',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  proveedorId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador del almacén',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  almacenId?: number;
}