const API_URL = 'http://localhost:3000/equipos'
const CATEGORIAS_URL = 'http://localhost:3000/categorias'
const MARCAS_URL = 'http://localhost:3000/marcas'
const PROVEEDORES_URL = 'http://localhost:3000/proveedores'
const ALMACEN_URL = 'http://localhost:3000/almacen'

// ====================
// INTERFACES
// ====================

export interface Categoria {
  id: number
  nombre: string
}

export interface Marca {
  id: number
  nombre: string
}

export interface Proveedor {
  id: number
  nombre: string
  telefono: string
  email: string
}

export interface Almacen {
  id: number
  nombre: string
  ubicacion?: string | null
  createdAt?: string
}

export interface Equipo {
  id: number
  nombre: string
  descripcion?: string | null
  estado: string
  numeroSerie?: string | null

  createdAt: string
  updatedAt: string

  categoriaId?: number | null
  marcaId?: number | null
  proveedorId?: number | null
  almacenId?: number | null

  categoria?: Categoria
  marca?: Marca
  proveedor?: Proveedor
  almacen?: Almacen
}

export interface CrearEquipoData {
  nombre: string
  descripcion?: string
  estado: string
  numeroSerie?: string
  categoriaId?: number
  marcaId?: number
  proveedorId?: number
  almacenId?: number
}

export interface ActualizarEquipoData {
  nombre?: string
  descripcion?: string
  estado?: string
  numeroSerie?: string
  categoriaId?: number
  marcaId?: number
  proveedorId?: number
  almacenId?: number
}

// ====================
// EQUIPOS
// ====================

export async function obtenerEquipos(): Promise<Equipo[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('No se pudieron obtener los equipos')
  }

  return response.json() as Promise<Equipo[]>
}

export async function crearEquipo(
  data: CrearEquipoData,
): Promise<Equipo> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('No se pudo crear el equipo')
  }

  return response.json() as Promise<Equipo>
}

export async function actualizarEquipo(
  id: number,
  data: ActualizarEquipoData,
): Promise<Equipo> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('No se pudo actualizar el equipo')
  }

  return response.json() as Promise<Equipo>
}

export async function eliminarEquipo(
  id: number,
): Promise<Equipo> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('No se pudo eliminar el equipo')
  }

  return response.json() as Promise<Equipo>
}

// ====================
// CATEGORÍAS
// ====================

export async function obtenerCategorias(): Promise<Categoria[]> {
  const response = await fetch(CATEGORIAS_URL)

  if (!response.ok) {
    throw new Error(
      'No se pudieron obtener las categorías',
    )
  }

  return response.json() as Promise<Categoria[]>
}

// ====================
// MARCAS
// ====================

export async function obtenerMarcas(): Promise<Marca[]> {
  const response = await fetch(MARCAS_URL)

  if (!response.ok) {
    throw new Error(
      'No se pudieron obtener las marcas',
    )
  }

  return response.json() as Promise<Marca[]>
}

// ====================
// PROVEEDORES
// ====================

export async function obtenerProveedores(): Promise<Proveedor[]> {
  const response = await fetch(PROVEEDORES_URL)

  if (!response.ok) {
    throw new Error(
      'No se pudieron obtener los proveedores',
    )
  }

  return response.json() as Promise<Proveedor[]>
}

// ====================
// ALMACENES
// ====================

export async function obtenerAlmacenes(): Promise<Almacen[]> {
  const response = await fetch(ALMACEN_URL)

  if (!response.ok) {
    throw new Error(
      'No se pudieron obtener los almacenes',
    )
  }

  return response.json() as Promise<Almacen[]>
}