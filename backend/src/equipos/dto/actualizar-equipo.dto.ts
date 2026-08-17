import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ActualizarEquipoDto {
  @ApiPropertyOptional({
    example: 'Laptop',
    description: 'Nombre del equipo',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({
    example: 'Laptop para uso del laboratorio',
    description: 'Descripción del equipo',
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({
    example: 'En Mantenimiento',
    description: 'Estado actual del equipo',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  estado?: string;

  @ApiPropertyOptional({
    example: 'LEN-2026-001',
    description: 'Número de serie del equipo',
  })
  @IsString()
  @IsOptional()
  numeroSerie?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador de la categoría',
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  categoriaId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador de la marca',
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  marcaId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador del proveedor',
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  proveedorId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador del almacén',
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  almacenId?: number;
}