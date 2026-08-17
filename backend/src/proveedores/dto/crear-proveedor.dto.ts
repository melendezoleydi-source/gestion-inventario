import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CrearProveedorDto {
  @ApiProperty({
    example: 'Tech Perú',
    description: 'Nombre del proveedor',
  })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({
    example: '987654321',
    description: 'Teléfono del proveedor',
  })
  @IsString()
  @IsNotEmpty()
  telefono!: string;

  @ApiProperty({
    example: 'techperu@gmail.com',
    description: 'Correo electrónico del proveedor',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}