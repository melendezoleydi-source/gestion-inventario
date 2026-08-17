import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CrearMarcaDto {
  @ApiProperty({
    example: 'Lenovo',
    description: 'Nombre de la marca',
  })
  @IsString()
  @IsNotEmpty()
  nombre!: string;
}