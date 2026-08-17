import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProveedoresService } from './proveedores.service';
import { CrearProveedorDto } from './dto/crear-proveedor.dto';
import { ActualizarProveedorDto } from './dto/actualizar-proveedor.dto';

@ApiTags('Proveedores')
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proveedor' })
  crear(@Body() data: CrearProveedorDto) {
    return this.proveedoresService.crear(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los proveedores' })
  listar() {
    return this.proveedoresService.listar();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proveedor por ID' })
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.proveedoresService.buscarPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un proveedor' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarProveedorDto,
  ) {
    return this.proveedoresService.actualizar(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proveedor' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.proveedoresService.eliminar(id);
  }
}