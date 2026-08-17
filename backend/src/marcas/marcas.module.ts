import { Module } from '@nestjs/common';
import { MarcasController } from './marcas.controller';
import { MarcasService } from './marcas.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MarcasController],
  providers: [MarcasService, PrismaService],
})
export class MarcasModule {}