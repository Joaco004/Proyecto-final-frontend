import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { login } = useAuth()
  const navigateUser = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      const responseData = await response.json()

      // Si el status no es 200/201, hubo error
      if (!response.ok) {
        // Mostramos el mensaje de error que viene del backend
        alert(responseData.error || "Error al iniciar sesión")
        return
      }

      // Login exitoso
      login(responseData.token)
      navigateUser("/")
      
    } catch (error) {
      console.log(error)
      alert("Error de conexión con el servidor")
    }
  }

  return (
    <Layout>
      <div className="center-auth">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>Iniciar Sesión</h3>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={handleChange}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
