// src/layouts/Layout.jsx
import { Link } from "react-router-dom"

const Layout = ({ children }) => {
  return (
    <>
      <header className="layout-header">
        <nav className="layout-nav">
          <Link to="/">Nuestros productos</Link>
          <Link to="/sobre-nosotros">Sobre nosotros</Link>
          <Link to="/agregar-producto">Agregar producto</Link>
          <Link to="/login">Login</Link>
          <Link to="/registro">Registro</Link>
        </nav>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <p>Sitio desarrollado por UTN</p>
      </footer>
    </>
  )
}

export default Layout
