import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EquipoResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del equipo',
  })
  id!: number;

  @ApiProperty({
    example: 'Laptop',
    description: 'Nombre del equipo',
  })
  nombre!: string;

  @ApiPropertyOptional({
    example: 'Laptop para uso del laboratorio',
    description: 'Descripción del equipo',
  })
  descripcion?: string;

  @ApiProperty({
    example: 'Operativo',
    description: 'Estado actual del equipo',
  })
  estado!: string;

  @ApiPropertyOptional({
    example: 'LEN-2026-001',
    description: 'Número de serie del equipo',
  })
  numeroSerie?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador de la categoría',
  })
  categoriaId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador de la marca',
  })
  marcaId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador del proveedor',
  })
  proveedorId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Identificador del almacén',
  })
  almacenId?: number;

  @ApiPropertyOptional({
    example: {
      id: 1,
      nombre: 'Laptops',
    },
    description: 'Categoría del equipo',
  })
  categoria?: {
    id: number;
    nombre: string;
  };

  @ApiPropertyOptional({
    example: {
      id: 1,
      nombre: 'Lenovo',
    },
    description: 'Marca del equipo',
  })
  marca?: {
    id: number;
    nombre: string;
  };

  @ApiPropertyOptional({
    example: {
      id: 1,
      nombre: 'Tech Perú',
      telefono: '987654321',
      email: 'techperu@gmail.com',
    },
    description: 'Proveedor del equipo',
  })
  proveedor?: {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
  };

  @ApiPropertyOptional({
    example: {
      id: 1,
      nombre: 'Almacén Principal',
      ubicacion: 'Laboratorio de Cómputo',
    },
    description: 'Almacén donde se encuentra el equipo',
  })
  almacen?: {
    id: number;
    nombre: string;
    ubicacion?: string;
  };

  @ApiProperty({
    example: '2026-08-14T13:48:30.491Z',
    description: 'Fecha de creación del equipo',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-08-14T15:20:30.491Z',
    description: 'Fecha de última actualización del equipo',
  })
  updatedAt!: Date;
}