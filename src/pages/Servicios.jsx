import './servicios.css'

// para que las imágenes funcionen en dev y en GitHub Pages:
const asset = (p) => import.meta.env.BASE_URL + p

const habitaciones = [
  {
    id: 1,
    nombre: 'Standard',
    descripcion: 'Habitación cómoda para 2 personas.',
    capacidad: 2,
    precio: 45000,
    imagen: asset('rooms/standard.jpg'),
  },
  {
    id: 2,
    nombre: 'Deluxe',
    descripcion: 'Amplia, con vista a la ciudad.',
    capacidad: 3,
    precio: 68000,
    imagen: asset('rooms/deluxe.jpg'),
  },
  {
    id: 3,
    nombre: 'Suite',
    descripcion: 'Con sala de estar y dormitorio separados.',
    capacidad: 4,
    precio: 99000,
    imagen: asset('rooms/suite.jpg'),
  },
]

export default function Servicios() {
  return (
    <main className="servicios">
      <h1>Servicios</h1>
      <p className="intro">Listado de habitaciones (datos desde un array local).</p>

      <div className="grid">
        {habitaciones.map((h) => (
          <article key={h.id} className="card">
            <img src={h.imagen} alt={h.nombre} loading="lazy" />
            <div className="body">
              <h2>{h.nombre}</h2>
              <p>{h.descripcion}</p>
              <div className="meta">
                <span>Capacidad: {h.capacidad}</span>
                <strong>${h.precio.toLocaleString('es-AR')}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
