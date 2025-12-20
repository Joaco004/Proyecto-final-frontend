import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white pt-5 pb-4" style={{ backgroundColor: '#1f1f1f', borderTop: '3px solid #fe6000', marginTop: 'auto' }}>
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          
          
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning" style={{color: '#fe6000 !important'}}>
              TecnoStore
            </h5>
            <p>
              Somos líderes en venta de hardware y periféricos de alto rendimiento. 
              Armamos la PC de tus sueños con los mejores componentes del mercado.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Navegación</h5>
            <p>
              <Link to="/" className="text-white text-decoration-none footer-link">Productos</Link>
            </p>
            <p>
              <Link to="/sobre-nosotros" className="text-white text-decoration-none footer-link">Nosotros</Link>
            </p>
            <p>
              <Link to="/contacto" className="text-white text-decoration-none footer-link">Contacto</Link>
            </p>
            <p>
              <Link to="/registro" className="text-white text-decoration-none footer-link">Crear Cuenta</Link>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Contacto</h5>
            <p>
              📍 Av. Siempreviva 742, Buenos Aires
            </p>
            <p>
              📧 ventas@tecnostore.com
            </p>
            <p>
              📞 +54 11 1234-5678
            </p>
          </div>

        </div>

        <hr className="mb-4" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p>
              © {new Date().getFullYear()} Todos los derechos reservados por:
              <a href="https://www.linkedin.com/in/joaquin-garinei-892654304/" target="_blank" style={{ textDecoration: 'none' }}>
                <strong style={{color: '#fe6000'}}> Joaquin Garinei</strong>
              </a>
            </p>
          </div>

          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a href="https://www.instagram.com/joaco_garinei_/" target="_blank" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}>📷</a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}>📘</a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}>🐦</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;