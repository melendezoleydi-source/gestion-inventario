import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearMarcaDto } from './dto/crear-marca.dto';
import { ActualizarMarcaDto } from './dto/actualizar-marca.dto';

@Injectable()
export class MarcasService {
  constructor(private prisma: PrismaService) {}

  async crear(data: CrearMarcaDto) {
    return this.prisma.marca.create({
      data,
    });
  }

  async listar() {
    return this.prisma.marca.findMany({
      include: {
        equipos: true,
      },
    });
  }

  async buscarPorId(id: number) {
    const marca = await this.prisma.marca.findUnique({
      where: { id },
      include: {
        equipos: true,
      },
    });

    if (!marca) {
      throw new NotFoundException('Marca no encontrada');
    }

    return marca;
  }

  async actualizar(id: number, data: ActualizarMarcaDto) {
    const marca = await this.prisma.marca.findUnique({
      where: { id },
    });

    if (!marca) {
      throw new NotFoundException('Marca no encontrada');
    }

    return this.prisma.marca.update({
      where: { id },
      data,
    });
  }

  async eliminar(id: number) {
    const marca = await this.prisma.marca.findUnique({
      where: { id },
    });

    if (!marca) {
      throw new NotFoundException('Marca no encontrada');
    }

    return this.prisma.marca.delete({
      where: { id },
    });
  }
}