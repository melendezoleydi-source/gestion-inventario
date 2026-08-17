import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearAlmacenDto } from './dto/crear-almacen.dto';
import { ActualizarAlmacenDto } from './dto/actualizar-almacen.dto';

@Injectable()
export class AlmacenService {
  constructor(private prisma: PrismaService) {}

  async crear(data: CrearAlmacenDto) {
    const existente = await this.prisma.almacen.findFirst({
      where: {
        nombre: data.nombre,
      },
    });

    if (existente) {
      throw new ConflictException('El almacén ya existe');
    }

    return this.prisma.almacen.create({
      data,
      include: {
        equipos: true,
      },
    });
  }

  async listar() {
    return this.prisma.almacen.findMany({
      include: {
        equipos: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async buscarPorId(id: number) {
    const almacen = await this.prisma.almacen.findUnique({
      where: { id },
      include: {
        equipos: true,
      },
    });

    if (!almacen) {
      throw new NotFoundException('Almacén no encontrado');
    }

    return almacen;
  }

  async actualizar(id: number, data: ActualizarAlmacenDto) {
    const almacen = await this.prisma.almacen.findUnique({
      where: { id },
    });

    if (!almacen) {
      throw new NotFoundException('Almacén no encontrado');
    }

    if (data.nombre) {
      const existente = await this.prisma.almacen.findFirst({
        where: {
          nombre: data.nombre,
          NOT: {
            id,
          },
        },
      });

      if (existente) {
        throw new ConflictException('El almacén ya existe');
      }
    }

    return this.prisma.almacen.update({
      where: { id },
      data,
      include: {
        equipos: true,
      },
    });
  }

  async eliminar(id: number) {
    const almacen = await this.prisma.almacen.findUnique({
      where: { id },
      include: {
        equipos: true,
      },
    });

    if (!almacen) {
      throw new NotFoundException('Almacén no encontrado');
    }

    if (almacen.equipos.length > 0) {
      throw new ConflictException(
        'No se puede eliminar el almacén porque tiene equipos asociados',
      );
    }

    return this.prisma.almacen.delete({
      where: { id },
    });
  }
}