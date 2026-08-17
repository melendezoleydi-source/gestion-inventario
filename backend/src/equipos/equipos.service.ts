import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearEquipoDto } from './dto/crear-equipo.dto';
import { ActualizarEquipoDto } from './dto/actualizar-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(private prisma: PrismaService) {}

  async crear(data: CrearEquipoDto) {
    return this.prisma.equipo.create({
      data,
    });
  }

  async listar() {
    return this.prisma.equipo.findMany({
      include: {
        categoria: true,
        marca: true,
        proveedor: true,
        almacen: true,
      },
    });
  }

  async buscarPorId(id: number) {
    const equipo = await this.prisma.equipo.findUnique({
      where: { id },
      include: {
        categoria: true,
        marca: true,
        proveedor: true,
        almacen: true,
      },
    });

    if (!equipo) {
      throw new NotFoundException('Equipo no encontrado');
    }

    return equipo;
  }

  async actualizar(id: number, data: ActualizarEquipoDto) {
    const equipo = await this.prisma.equipo.findUnique({
      where: { id },
    });

    if (!equipo) {
      throw new NotFoundException('Equipo no encontrado');
    }

    return this.prisma.equipo.update({
      where: { id },
      data,
    });
  }

  async eliminar(id: number) {
    const equipo = await this.prisma.equipo.findUnique({
      where: { id },
    });

    if (!equipo) {
      throw new NotFoundException('Equipo no encontrado');
    }

    return this.prisma.equipo.delete({
      where: { id },
    });
  }
}