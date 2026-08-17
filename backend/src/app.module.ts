import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquiposModule } from './equipos/equipos.module';
import { PrismaService } from './prisma/prisma.service';
import { CategoriasModule } from './categorias/categorias.module';
import { MarcasModule } from './marcas/marcas.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { AlmacenModule } from './almacen/almacen.module';

@Module({
  imports: [
    EquiposModule,
    CategoriasModule,
    MarcasModule,
    ProveedoresModule,
    AlmacenModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}