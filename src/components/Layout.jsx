import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigateUser = useNavigate()

  const handleLogout = () => {
    logout()
    navigateUser("/login")
  }

  return (
    // Agregué layout-container (opcional) pero mantengo la estructura flex para el footer
    <div className="d-flex flex-column min-vh-100">
      
      {/* HEADER / NAVBAR */}
<header>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-warning" 
        style={{borderBottomColor: '#fe6000', borderBottomWidth: '3px'}}>
    <div className="container">
      
      <Link className="navbar-brand" to="/">
        ⚡ Tecno<span className="brand-accent">Store</span>_
      </Link>
      

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Productos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/sobre-nosotros">Nosotros</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
          </li>
        </ul>

        <div className="d-flex align-items-center gap-3"> {/* gap-3 separa los botones */}
          {!user ? (
            <>
              {/* Botón LOGIN con estilo Outline */}
              <Link to="/login" className="btn-gamer-outline">
                Ingresar
              </Link>
      
              {/* Botón REGISTRO con estilo Sólido */}
              <Link to="/registro" className="btn-gamer-solid">
                Crear Cuenta
              </Link>
            </>
          ) : (
            <>
              <span className="text-white fw-bold me-2 d-none d-lg-block" style={{fontSize: '0.9rem'}}>
                👋 {user.email?.split('@')[0]}
              </span>
      
              <Link to="/agregar-producto" className="btn-gamer-outline" style={{borderColor: '#00d604', color: '#00d604'}}>
                + Vender
              </Link>
      
              <button onClick={handleLogout} className="btn btn-sm btn-danger fw-bold text-uppercase px-3">
                Salir
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </nav>
</header>

      <main className="layout-main flex-grow-1">
        {children}
      </main>

      <Footer />
      
    </div>
  )
}

export default Layout