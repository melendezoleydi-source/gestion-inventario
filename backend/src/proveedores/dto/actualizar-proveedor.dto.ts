import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActualizarProveedorDto {
  @ApiPropertyOptional({
    example: 'Tech Perú',
    description: 'Nombre del proveedor',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({
    example: '987654321',
    description: 'Teléfono del proveedor',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional({
    example: 'techperu@gmail.com',
    description: 'Correo electrónico del proveedor',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;
}