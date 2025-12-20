import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

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

        <div className="d-flex align-items-center gap-2">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
              <Link to="/registro" className="btn btn-sm fw-bold text-white" style={{backgroundColor: '#fe6000'}}>
                Registro
              </Link>
            </>
          ) : (
            <>
              <span className="text-white small me-2 d-none d-lg-block">
                {user.email?.split('@')[0]}
              </span>
              <Link to="/agregar-producto" className="btn btn-sm btn-outline-warning me-2">
                + Vender
              </Link>
              <button onClick={handleLogout} className="btn btn-sm btn-danger">
                Salir
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </nav>
</header>

      {/* MAIN: Mantiene tu clase layout-main */}
      <main className="layout-main flex-grow-1">
        {children}
      </main>

      {/* FOOTER: Mantiene tu clase layout-footer */}
      <footer className="layout-footer text-center text-white py-4 mt-auto" style={{ backgroundColor: '#1f1f1f', borderTop: '1px solid #333' }}>
        <div className="container">
          <p className="mb-0">Sitio desarrollado por Joaquin Garinei</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout