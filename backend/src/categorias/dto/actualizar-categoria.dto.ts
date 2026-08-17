import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActualizarCategoriaDto {
  @ApiPropertyOptional({
    example: 'Laptop',
    description: 'Nombre de la categoría',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nombre?: string;
}