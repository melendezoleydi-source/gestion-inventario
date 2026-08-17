import { useEffect, useState } from 'react'
import './App.css'

import {
  actualizarEquipo,
  crearEquipo,
  eliminarEquipo,
  obtenerAlmacenes,
  obtenerCategorias,
  obtenerEquipos,
  obtenerMarcas,
  obtenerProveedores,
  type Almacen,
  type Categoria,
  type Equipo,
  type Marca,
  type Proveedor,
} from './services/equiposService'

function App() {
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [almacenes, setAlmacenes] = useState<Almacen[]>([])

  const [busqueda, setBusqueda] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarPanelAdmin, setMostrarPanelAdmin] = useState(false)

  const [equipoEditando, setEquipoEditando] = useState<number | null>(null)
  const [equipoDetalle, setEquipoDetalle] = useState<Equipo | null>(null)

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [estado, setEstado] = useState('Operativo')
  const [numeroSerie, setNumeroSerie] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [marcaId, setMarcaId] = useState('')
  const [proveedorId, setProveedorId] = useState('')
  const [almacenId, setAlmacenId] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true)
        setError('')

        const [
          equiposData,
          categoriasData,
          marcasData,
          proveedoresData,
          almacenesData,
        ] = await Promise.all([
          obtenerEquipos(),
          obtenerCategorias(),
          obtenerMarcas(),
          obtenerProveedores(),
          obtenerAlmacenes(),
        ])

        setEquipos(equiposData)
        setCategorias(categoriasData)
        setMarcas(marcasData)
        setProveedores(proveedoresData)
        setAlmacenes(almacenesData)
      } catch (error) {
        console.error('Error al cargar los datos:', error)
        setError('No se pudo conectar con la API.')
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [])

  const equiposFiltrados = equipos.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  )

  const limpiarFormulario = () => {
    setEquipoEditando(null)
    setNombre('')
    setDescripcion('')
    setEstado('Operativo')
    setNumeroSerie('')
    setCategoriaId('')
    setMarcaId('')
    setProveedorId('')
    setAlmacenId('')
  }

  const abrirFormularioAgregar = () => {
    limpiarFormulario()
    setMostrarFormulario(true)
  }

  const editarEquipo = (equipo: Equipo) => {
    setEquipoEditando(equipo.id)
    setNombre(equipo.nombre)
    setDescripcion(equipo.descripcion ?? '')
    setEstado(equipo.estado)
    setNumeroSerie(equipo.numeroSerie ?? '')
    setCategoriaId(String(equipo.categoriaId ?? ''))
    setMarcaId(String(equipo.marcaId ?? ''))
    setProveedorId(String(equipo.proveedorId ?? ''))
    setAlmacenId(String(equipo.almacenId ?? ''))

    setMostrarFormulario(true)

    setTimeout(() => {
      document
        .getElementById('formulario-equipo')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }, 100)
  }

  const verDetalles = (equipo: Equipo) => {
    setEquipoDetalle(equipo)
  }

  const cancelarFormulario = () => {
    limpiarFormulario()
    setMostrarFormulario(false)
  }

  const guardarEquipo = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    try {
      setError('')

      const datosEquipo = {
        nombre,
        descripcion: descripcion || undefined,
        estado,
        numeroSerie: numeroSerie || undefined,

        categoriaId: categoriaId
          ? Number(categoriaId)
          : undefined,

        marcaId: marcaId
          ? Number(marcaId)
          : undefined,

        proveedorId: proveedorId
          ? Number(proveedorId)
          : undefined,

        almacenId: almacenId
          ? Number(almacenId)
          : undefined,
      }

      if (equipoEditando !== null) {
        await actualizarEquipo(
          equipoEditando,
          datosEquipo,
        )

        alert('Equipo actualizado correctamente')
      } else {
        await crearEquipo(datosEquipo)

        alert('Equipo creado correctamente')
      }

      const equiposActualizados =
        await obtenerEquipos()

      setEquipos(equiposActualizados)

      cancelarFormulario()
    } catch (error) {
      console.error('Error al guardar equipo:', error)
      setError('No se pudo guardar el equipo.')
    }
  }

  const borrarEquipo = async (id: number) => {
    const confirmar = window.confirm(
      '¿Estás seguro de que deseas eliminar este equipo?',
    )

    if (!confirmar) {
      return
    }

    try {
      setError('')

      await eliminarEquipo(id)

      const equiposActualizados =
        await obtenerEquipos()

      setEquipos(equiposActualizados)

      if (equipoDetalle?.id === id) {
        setEquipoDetalle(null)
      }

      alert('Equipo eliminado correctamente')
    } catch (error) {
      console.error('Error al eliminar equipo:', error)
      setError('No se pudo eliminar el equipo.')
    }
  }

  return (
    <div className="app">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar">

        <div className="logo">
          <span>INVENTARIO</span>
          <small>Gestión de equipos</small>
        </div>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#equipos">Equipos</a>
          <a href="#modulos">Módulos</a>
          <a href="#tecnologias">Tecnologías</a>
        </nav>

        <button
          type="button"
          className="btn-login"
          onClick={() => setMostrarPanelAdmin(true)}
        >
          Administrador
        </button>

      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="inicio"
        className="hero-section"
      >

        <div className="hero-content">

          <p className="subtitle">
            SISTEMA DE INVENTARIO
          </p>

          <h1>
            Gestiona tus equipos
            <span> de forma sencilla.</span>
          </h1>

          <p className="description">
            Sistema de gestión de inventario
            desarrollado con NestJS, React, Prisma
            y PostgreSQL para administrar equipos de
            cómputo de manera rápida y organizada.
          </p>

          <div className="hero-buttons">

            <a
              href="#equipos"
              className="btn-primary"
            >
              Ver equipos
            </a>

            <a
              href="#modulos"
              className="btn-secondary"
            >
              Ver módulos
            </a>

          </div>

        </div>


        <div className="hero-card">

          <div className="card-icon">
            💻
          </div>

          <h2>
            Inventario
          </h2>

          <p>
            Controla equipos de cómputo y toda su
            información desde un solo lugar.
          </p>

          <div className="stats">

            <div>
              <strong>
                {equipos.length}
              </strong>

              <span>
                Equipos
              </span>
            </div>

            <div>
              <strong>
                CRUD
              </strong>

              <span>
                Gestión
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          EQUIPOS
      ===================================================== */}

      <section
        id="equipos"
        className="section"
      >

        <p className="section-subtitle">
          INVENTARIO
        </p>

        <h2>
          Equipos registrados
        </h2>

        {!mostrarFormulario && (
          <button
            type="button"
            className="btn-primary"
            onClick={abrirFormularioAgregar}
          >
            + Agregar equipo
          </button>
        )}


        {/* BUSCADOR */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Buscar equipo por nombre..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
          />

        </div>


        {/* ERROR */}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        {/* CARGANDO */}

        {loading && (
          <p className="loading-message">
            Cargando equipos...
          </p>
        )}


        {/* =================================================
            FORMULARIO
        ================================================= */}

        {mostrarFormulario && (

          <form
            id="formulario-equipo"
            className="producto-form"
            onSubmit={guardarEquipo}
          >

            <div className="form-header">

              <div>
                <p className="section-subtitle">
                  GESTIÓN DE EQUIPOS
                </p>

                <h3>
                  {equipoEditando !== null
                    ? 'Editar equipo'
                    : 'Nuevo equipo'}
                </h3>
              </div>

              <span className="form-icon">
                💻
              </span>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  Nombre del equipo
                </label>

                <input
                  type="text"
                  value={nombre}
                  onChange={(e) =>
                    setNombre(e.target.value)
                  }
                  placeholder="Ej. Laptop Lenovo"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Descripción
                </label>

                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) =>
                    setDescripcion(e.target.value)
                  }
                  placeholder="Ej. Laptop para laboratorio"
                />

              </div>


              <div className="form-group">

                <label>
                  Estado
                </label>

                <select
                  value={estado}
                  onChange={(e) =>
                    setEstado(e.target.value)
                  }
                  required
                >

                  <option value="Operativo">
                    Operativo
                  </option>

                  <option value="En Mantenimiento">
                    En Mantenimiento
                  </option>

                  <option value="Dañado">
                    Dañado
                  </option>

                  <option value="Baja">
                    Baja
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Número de serie
                </label>

                <input
                  type="text"
                  value={numeroSerie}
                  onChange={(e) =>
                    setNumeroSerie(e.target.value)
                  }
                  placeholder="Ej. LEN-2026-001"
                />

              </div>


              <div className="form-group">

                <label>
                  Categoría
                </label>

                <select
                  value={categoriaId}
                  onChange={(e) =>
                    setCategoriaId(e.target.value)
                  }
                >

                  <option value="">
                    Seleccionar categoría
                  </option>

                  {categorias.map((categoria) => (
                    <option
                      key={categoria.id}
                      value={categoria.id}
                    >
                      {categoria.nombre}
                    </option>
                  ))}

                </select>

              </div>


              <div className="form-group">

                <label>
                  Marca
                </label>

                <select
                  value={marcaId}
                  onChange={(e) =>
                    setMarcaId(e.target.value)
                  }
                >

                  <option value="">
                    Seleccionar marca
                  </option>

                  {marcas.map((marca) => (
                    <option
                      key={marca.id}
                      value={marca.id}
                    >
                      {marca.nombre}
                    </option>
                  ))}

                </select>

              </div>


              <div className="form-group">

                <label>
                  Proveedor
                </label>

                <select
                  value={proveedorId}
                  onChange={(e) =>
                    setProveedorId(e.target.value)
                  }
                >

                  <option value="">
                    Seleccionar proveedor
                  </option>

                  {proveedores.map((proveedor) => (
                    <option
                      key={proveedor.id}
                      value={proveedor.id}
                    >
                      {proveedor.nombre}
                    </option>
                  ))}

                </select>

              </div>


              <div className="form-group">

                <label>
                  Almacén
                </label>

                <select
                  value={almacenId}
                  onChange={(e) =>
                    setAlmacenId(e.target.value)
                  }
                >

                  <option value="">
                    Seleccionar almacén
                  </option>

                  {almacenes.map((almacen) => (
                    <option
                      key={almacen.id}
                      value={almacen.id}
                    >
                      {almacen.nombre}
                    </option>
                  ))}

                </select>

              </div>

            </div>


            <button
              type="submit"
              className="btn-guardar"
            >
              {equipoEditando !== null
                ? 'Actualizar equipo'
                : 'Guardar equipo'}
            </button>


            <button
              type="button"
              className="btn-cancelar"
              onClick={cancelarFormulario}
            >
              Cancelar
            </button>

          </form>

        )}


        {/* =================================================
            TARJETAS DE EQUIPOS
        ================================================= */}

        {!loading && (

          <div className="cards">

            {equiposFiltrados.length > 0 ? (

              equiposFiltrados.map((equipo) => (

                <article
                  className="card"
                  key={equipo.id}
                >

                  {/* CABECERA DE TARJETA */}

                  <div className="card-top">

                    <span className="card-number">
                      #{equipo.id}
                    </span>

                    <span
                      className={`estado-badge estado-${equipo.estado
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace('ó', 'o')}`}
                    >
                      {equipo.estado}
                    </span>

                  </div>


                  {/* ICONO */}

                  <div className="card-icon-equipo">
                    💻
                  </div>


                  {/* INFORMACIÓN PRINCIPAL */}

                  <div className="card-content">

                    <h3>
                      {equipo.nombre}
                    </h3>

                    <p className="card-description">
                      {equipo.descripcion ||
                        'Sin descripción registrada.'}
                    </p>


                    {/* DATOS */}

                    <div className="card-data">

                      <div className="card-data-item">

                        <span>
                          N.° de serie
                        </span>

                        <strong>
                          {equipo.numeroSerie ||
                            'No registrado'}
                        </strong>

                      </div>


                      <div className="card-data-item">

                        <span>
                          Categoría
                        </span>

                        <strong>
                          {equipo.categoria?.nombre ||
                            'Sin categoría'}
                        </strong>

                      </div>


                      <div className="card-data-item">

                        <span>
                          Marca
                        </span>

                        <strong>
                          {equipo.marca?.nombre ||
                            'Sin marca'}
                        </strong>

                      </div>


                      <div className="card-data-item">

                        <span>
                          Almacén
                        </span>

                        <strong>
                          {equipo.almacen?.nombre ||
                            'Sin almacén'}
                        </strong>

                      </div>

                    </div>

                  </div>


                  {/* ACCIONES */}

                  <div className="card-actions">

                    <button
                      type="button"
                      className="btn-detalles"
                      onClick={() =>
                        verDetalles(equipo)
                      }
                    >
                      Ver detalles
                    </button>

                    <div className="card-actions-secondary">

                      <button
                        type="button"
                        className="btn-editar"
                        onClick={() =>
                          editarEquipo(equipo)
                        }
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="btn-eliminar"
                        onClick={() =>
                          borrarEquipo(equipo.id)
                        }
                      >
                        Eliminar
                      </button>

                    </div>

                  </div>

                </article>

              ))

            ) : (

              <div className="empty-state">

                <div className="empty-icon">
                  📦
                </div>

                <h3>
                  No se encontraron equipos
                </h3>

                <p>
                  Intenta realizar otra búsqueda o
                  registra un nuevo equipo.
                </p>

              </div>

            )}

          </div>

        )}

      </section>


      {/* =====================================================
          MODAL DE DETALLES
      ===================================================== */}

      {equipoDetalle && (

        <div className="modal-overlay">

          <div className="modal-detalles">

            <button
              type="button"
              className="modal-cerrar"
              onClick={() =>
                setEquipoDetalle(null)
              }
            >
              ×
            </button>


            <p className="section-subtitle">
              DETALLES DEL EQUIPO
            </p>

            <h2>
              {equipoDetalle.nombre}
            </h2>


            <div className="detalle-lista">

              <p>
                <strong>
                  Descripción:
                </strong>{' '}
                {equipoDetalle.descripcion ||
                  'Sin descripción'}
              </p>

              <p>
                <strong>
                  Estado:
                </strong>{' '}
                {equipoDetalle.estado}
              </p>

              <p>
                <strong>
                  Número de serie:
                </strong>{' '}
                {equipoDetalle.numeroSerie ||
                  'No registrado'}
              </p>

              <p>
                <strong>
                  Categoría:
                </strong>{' '}
                {equipoDetalle.categoria?.nombre ||
                  'Sin categoría'}
              </p>

              <p>
                <strong>
                  Marca:
                </strong>{' '}
                {equipoDetalle.marca?.nombre ||
                  'Sin marca'}
              </p>

              <p>
                <strong>
                  Proveedor:
                </strong>{' '}
                {equipoDetalle.proveedor?.nombre ||
                  'Sin proveedor'}
              </p>

              <p>
                <strong>
                  Almacén:
                </strong>{' '}
                {equipoDetalle.almacen?.nombre ||
                  'Sin almacén'}
              </p>

              <p>
                <strong>
                  Fecha de registro:
                </strong>{' '}
                {new Date(
                  equipoDetalle.createdAt,
                ).toLocaleDateString('es-PE')}
              </p>

            </div>


            <button
              type="button"
              className="btn-cerrar-detalles"
              onClick={() =>
                setEquipoDetalle(null)
              }
            >
              Cerrar
            </button>

          </div>

        </div>

      )}


      {/* =====================================================
          PANEL ADMINISTRADOR
      ===================================================== */}

      {mostrarPanelAdmin && (

        <div className="admin-screen">

          <header className="admin-header">

            <div className="admin-logo">

              <span>
                INVENTARIO
              </span>

              <small>
                Panel administrativo
              </small>

            </div>


            <button
              type="button"
              className="admin-volver"
              onClick={() =>
                setMostrarPanelAdmin(false)
              }
            >
              ← Volver al sistema
            </button>

          </header>


          <main className="admin-content">

            <div className="admin-title">

              <p className="admin-subtitle">
                ADMINISTRACIÓN
              </p>

              <h1>
                Panel de administrador
              </h1>

              <p>
                Consulta rápidamente la información
                general del sistema de inventario.
              </p>

            </div>


            {/* ESTADÍSTICAS */}

            <div className="admin-stats">

              <div className="admin-card">

                <div className="admin-card-icon">
                  💻
                </div>

                <strong>
                  {equipos.length}
                </strong>

                <span>
                  Equipos
                </span>

              </div>


              <div className="admin-card">

                <div className="admin-card-icon">
                  🏷️
                </div>

                <strong>
                  {categorias.length}
                </strong>

                <span>
                  Categorías
                </span>

              </div>


              <div className="admin-card">

                <div className="admin-card-icon">
                  🏢
                </div>

                <strong>
                  {proveedores.length}
                </strong>

                <span>
                  Proveedores
                </span>

              </div>


              <div className="admin-card">

                <div className="admin-card-icon">
                  🏬
                </div>

                <strong>
                  {almacenes.length}
                </strong>

                <span>
                  Almacenes
                </span>

              </div>

            </div>


            {/* INFORMACIÓN DEL USUARIO */}

            <div className="admin-info-card">

              <div className="admin-info-header">

                <div className="admin-user-icon">
                  👤
                </div>

                <div>

                  <h2>
                    Información del usuario
                  </h2>

                  <p>
                    Datos de la cuenta administrativa
                  </p>

                </div>

              </div>


              <div className="admin-info-grid">

                <div className="admin-info-item">

                  <span>
                    Usuario
                  </span>

                  <strong>
                    Administrador
                  </strong>

                </div>


                <div className="admin-info-item">

                  <span>
                    Rol
                  </span>

                  <strong>
                    Administrador del inventario
                  </strong>

                </div>


                <div className="admin-info-item">

                  <span>
                    Estado
                  </span>

                  <strong className="estado-activo">
                    ● Sistema activo
                  </strong>

                </div>

              </div>

            </div>


            {/* RESUMEN */}

            <div className="admin-summary">

              <div>

                <p className="admin-subtitle">
                  RESUMEN DEL SISTEMA
                </p>

                <h2>
                  Sistema de inventario
                </h2>

                <p>
                  Desde este panel puedes consultar
                  de manera rápida el estado general
                  de los recursos registrados en el
                  sistema.
                </p>

              </div>


              <div className="admin-summary-list">

                <div>

                  <span>
                    Equipos registrados
                  </span>

                  <strong>
                    {equipos.length}
                  </strong>

                </div>


                <div>

                  <span>
                    Categorías disponibles
                  </span>

                  <strong>
                    {categorias.length}
                  </strong>

                </div>


                <div>

                  <span>
                    Proveedores registrados
                  </span>

                  <strong>
                    {proveedores.length}
                  </strong>

                </div>


                <div>

                  <span>
                    Almacenes registrados
                  </span>

                  <strong>
                    {almacenes.length}
                  </strong>

                </div>

              </div>

            </div>

          </main>

        </div>

      )}


      {/* =====================================================
          MÓDULOS
      ===================================================== */}

      <section
        id="modulos"
        className="modules-section"
      >

        <div>

          <p className="section-subtitle">
            SISTEMA
          </p>

          <h2>
            Módulos del inventario
          </h2>

          <p>
            El sistema cuenta con módulos para
            organizar y administrar la información
            relacionada con los equipos de cómputo.
          </p>

        </div>


        <div className="module-list">

          <span>
            💻 Equipos
          </span>

          <span>
            🏷️ Categorías
          </span>

          <span>
            🔖 Marcas
          </span>

          <span>
            🏢 Proveedores
          </span>

          <span>
            🏬 Almacén
          </span>

        </div>

      </section>


      {/* =====================================================
          TECNOLOGÍAS
      ===================================================== */}

      <section
        id="tecnologias"
        className="about-section"
      >

        <p className="section-subtitle">
          TECNOLOGÍAS
        </p>

        <h2>
          Tecnologías utilizadas
        </h2>

        <p>
          Este proyecto utiliza tecnologías
          modernas para desarrollar una aplicación
          web conectada a una API REST y una base de
          datos PostgreSQL.
        </p>


        <div className="technologies">

          <span>
            NestJS
          </span>

          <span>
            React
          </span>

          <span>
            TypeScript
          </span>

          <span>
            Prisma
          </span>

          <span>
            PostgreSQL
          </span>

          <span>
            Swagger
          </span>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer>

        <span>
          API Inventario
        </span>

        <span>
          Proyecto desarrollado con React + NestJS
        </span>

      </footer>

    </div>
  )
}

export default App