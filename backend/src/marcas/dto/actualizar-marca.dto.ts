import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActualizarMarcaDto {
  @ApiPropertyOptional({
    example: 'Lenovo',
    description: 'Nombre de la marca',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nombre?: string;
}