import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { ToastMessage } from "../components/ToastMessage"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [feedback, setFeedback] = useState({ show: false, msg: "", type: "success" })

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

      if (!response.ok) {
        setFeedback({ show: true, msg: responseData.error || "Credenciales inválidas", type: "error" })
        return
      }

      login(responseData.token)
      setFeedback({ show: true, msg: "¡Bienvenido, Gamer!", type: "success" })
      
      setTimeout(() => navigateUser("/"), 1500)
      
    } catch (error) {
      setFeedback({ show: true, msg: "Error de conexión", type: "error" })
    }
  }

  return (
    <Layout>
      {feedback.show && (
        <ToastMessage 
          msg={feedback.msg} 
          type={feedback.type} 
          onClose={() => setFeedback({ ...feedback, show: false })} 
        />
      )}

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
          <button type="submit" className="btn-gamer-outline">Ingresar</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
