import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  async crear(data: CrearCategoriaDto) {
    return this.prisma.categoria.create({
      data,
    });
  }

  async listar() {
    return this.prisma.categoria.findMany({
      include: {
        equipos: true,
      },
    });
  }

  async buscarPorId(id: number) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
      include: {
        equipos: true,
      },
    });

    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return categoria;
  }

  async actualizar(id: number, data: ActualizarCategoriaDto) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return this.prisma.categoria.update({
      where: { id },
      data,
    });
  }

  async eliminar(id: number) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}