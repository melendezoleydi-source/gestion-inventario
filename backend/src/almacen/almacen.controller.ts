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
import { AlmacenService } from './almacen.service';
import { CrearAlmacenDto } from './dto/crear-almacen.dto';
import { ActualizarAlmacenDto } from './dto/actualizar-almacen.dto';

@ApiTags('Almacén')
@Controller('almacen')
export class AlmacenController {
  constructor(private readonly almacenService: AlmacenService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo almacén' })
  crear(@Body() data: CrearAlmacenDto) {
    return this.almacenService.crear(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los almacenes' })
  listar() {
    return this.almacenService.listar();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un almacén por ID' })
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.almacenService.buscarPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un almacén' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarAlmacenDto,
  ) {
    return this.almacenService.actualizar(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un almacén' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.almacenService.eliminar(id);
  }
}