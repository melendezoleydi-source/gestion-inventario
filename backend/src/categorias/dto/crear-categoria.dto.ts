import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CrearCategoriaDto {
  @ApiProperty({
    example: 'Laptop',
    description: 'Nombre de la categoría',
  })
  @IsString()
  @IsNotEmpty()
  nombre!: string;
}