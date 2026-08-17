import { PartialType } from '@nestjs/swagger';
import { CrearAlmacenDto } from './crear-almacen.dto';

export class ActualizarAlmacenDto extends PartialType(CrearAlmacenDto) {}