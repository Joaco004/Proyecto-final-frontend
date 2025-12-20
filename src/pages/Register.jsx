import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { ToastMessage } from "../components/ToastMessage" 

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [feedback, setFeedback] = useState({ show: false, msg: "", type: "success" })
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const responseData = await response.json()

      if (!response.ok || !responseData.success) {
        
        setFeedback({ show: true, msg: responseData.error || "Error al registrar", type: "error" })
        return
      }

      
      setFeedback({ show: true, msg: "¡Cuenta creada! Redirigiendo...", type: "success" })
      
      
      setTimeout(() => navigate("/login"), 2000)

    } catch (error) {
      setFeedback({ show: true, msg: "Error de conexión con el servidor", type: "error" })
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
          <h3>Crear Cuenta</h3>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            onChange={handleChange}
          />
          <button type="submit" className="btn-gamer-solid">Registrarse</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register
