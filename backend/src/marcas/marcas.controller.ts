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
import { MarcasService } from './marcas.service';
import { CrearMarcaDto } from './dto/crear-marca.dto';
import { ActualizarMarcaDto } from './dto/actualizar-marca.dto';

@ApiTags('Marcas')
@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva marca' })
  crear(@Body() data: CrearMarcaDto) {
    return this.marcasService.crear(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las marcas' })
  listar() {
    return this.marcasService.listar();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una marca por ID' })
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.marcasService.buscarPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una marca' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarMarcaDto,
  ) {
    return this.marcasService.actualizar(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una marca' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.marcasService.eliminar(id);
  }
}