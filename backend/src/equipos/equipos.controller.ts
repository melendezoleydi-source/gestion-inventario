import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EquiposService } from './equipos.service';
import { CrearEquipoDto } from './dto/crear-equipo.dto';
import { ActualizarEquipoDto } from './dto/actualizar-equipo.dto';
import { EquipoResponseDto } from './dto/equipo-response.dto';

@ApiTags('Equipos')
@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo equipo' })
  @ApiResponse({
    status: 201,
    description: 'Equipo creado correctamente',
    type: EquipoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  crear(@Body() data: CrearEquipoDto) {
    return this.equiposService.crear(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de equipos obtenida correctamente',
    type: [EquipoResponseDto],
  })
  listar() {
    return this.equiposService.listar();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un equipo por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del equipo',
    example: 2,
  })
  @ApiResponse({
    status: 200,
    description: 'Equipo encontrado',
    type: EquipoResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Equipo no encontrado',
  })
  buscarPorId(@Param('id') id: string) {
    return this.equiposService.buscarPorId(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un equipo' })
  @ApiParam({
    name: 'id',
    description: 'ID del equipo',
    example: 2,
  })
  @ApiResponse({
    status: 200,
    description: 'Equipo actualizado correctamente',
    type: EquipoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Equipo no encontrado',
  })
  actualizar(
    @Param('id') id: string,
    @Body() data: ActualizarEquipoDto,
  ) {
    return this.equiposService.actualizar(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un equipo' })
  @ApiParam({
    name: 'id',
    description: 'ID del equipo',
    example: 2,
  })
  @ApiResponse({
    status: 200,
    description: 'Equipo eliminado correctamente',
    type: EquipoResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Equipo no encontrado',
  })
  eliminar(@Param('id') id: string) {
    return this.equiposService.eliminar(Number(id));
  }
}