import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Servicios from './pages/Servicios.jsx'
import Contacto from './pages/Contacto.jsx'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <header className="topbar">
        <div className="container inner">
          <div className="brand">Hotel Demo</div>
          <nav className="nav">
            <NavLink to="/" end className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Inicio</NavLink>
            <NavLink to="/servicios" className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Servicios</NavLink>
            <NavLink to="/contacto" className={({isActive}) => 'navlink' + (isActive ? ' active' : '')}>Contacto</NavLink>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  )
}
