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
import { CategoriasService } from './categorias.service';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto';

@ApiTags('Categorías')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  crear(@Body() data: CrearCategoriaDto) {
    return this.categoriasService.crear(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  listar() {
    return this.categoriasService.listar();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.buscarPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarCategoriaDto,
  ) {
    return this.categoriasService.actualizar(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.eliminar(id);
  }
}