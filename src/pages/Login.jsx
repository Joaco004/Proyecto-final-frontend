import Layout from "../components/Layout"

const Login = () => {
  return (
    <Layout>
      <div className="center-auth">
        <form className="form-container">
          <h3>Iniciar Sesión</h3>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Contraseña" required />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
