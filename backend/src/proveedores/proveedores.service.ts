import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearProveedorDto } from './dto/crear-proveedor.dto';
import { ActualizarProveedorDto } from './dto/actualizar-proveedor.dto';

@Injectable()
export class ProveedoresService {
  constructor(private prisma: PrismaService) {}

  async crear(data: CrearProveedorDto) {
    const existente = await this.prisma.proveedor.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existente) {
      throw new ConflictException('El proveedor ya existe');
    }

    return this.prisma.proveedor.create({
      data,
      include: {
        equipos: true,
      },
    });
  }

  async listar() {
    return this.prisma.proveedor.findMany({
      include: {
        equipos: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async buscarPorId(id: number) {
    const proveedor = await this.prisma.proveedor.findUnique({
      where: { id },
      include: {
        equipos: true,
      },
    });

    if (!proveedor) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    return proveedor;
  }

  async actualizar(id: number, data: ActualizarProveedorDto) {
    const proveedor = await this.prisma.proveedor.findUnique({
      where: { id },
    });

    if (!proveedor) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    if (data.email) {
      const existente = await this.prisma.proveedor.findFirst({
        where: {
          email: data.email,
          NOT: {
            id,
          },
        },
      });

      if (existente) {
        throw new ConflictException('El proveedor ya existe');
      }
    }

    return this.prisma.proveedor.update({
      where: { id },
      data,
      include: {
        equipos: true,
      },
    });
  }

  async eliminar(id: number) {
    const proveedor = await this.prisma.proveedor.findUnique({
      where: { id },
      include: {
        equipos: true,
      },
    });

    if (!proveedor) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    if (proveedor.equipos.length > 0) {
      throw new ConflictException(
        'No se puede eliminar el proveedor porque tiene equipos asociados',
      );
    }

    return this.prisma.proveedor.delete({
      where: { id },
    });
  }
}