import { Module } from '@nestjs/common';
import { EquiposController } from './equipos.controller';
import { EquiposService } from './equipos.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EquiposController],
  providers: [EquiposService, PrismaService],
})
export class EquiposModule {}