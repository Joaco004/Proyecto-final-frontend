import { useState } from "react"
import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  })
  // Estado separado para el archivo
  const [file, setFile] = useState(null)

  const navigate = useNavigate()
  const { token } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Usamos FormData para enviar archivos + texto
    const dataToSend = new FormData()
    dataToSend.append("name", formData.name)
    dataToSend.append("description", formData.description)
    dataToSend.append("price", formData.price)
    dataToSend.append("stock", formData.stock)
    dataToSend.append("category", formData.category)
    
    // Si el usuario seleccionó una imagen, la agregamos
    if (file) {
      dataToSend.append("image", file) 
    }

    try {
      const response = await fetch(`http://localhost:3000/products`, {
        method: "POST",
        headers: {
          // NO PONER 'Content-Type': 'application/json' CUANDO SE USA FORMDATA
          "Authorization": `Bearer ${token}`
        },
        body: dataToSend
      })

      const responseData = await response.json()

      if (!response.ok) {
        // Mostramos el error específico del backend (Zod o Multer)
        const errorMsg = responseData.error ? JSON.stringify(responseData.error) : "Error desconocido"
        alert("❌ Error: " + errorMsg)
        return
      }

      alert("✅ Éxito al guardar el nuevo producto")
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""
      })
      setFile(null)
      navigate("/") // Te manda al home para ver el producto nuevo
    } catch (error) {
      console.error(error)
      alert("Error de conexión al crear producto")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Layout>
      <div className="page-banner">Agregar Nuevo Producto</div>

      <section className="page-section">
        <form className="form-container" onSubmit={handleSubmit}>
          
          {/* Input de IMAGEN (Nuevo) */}
          <div style={{marginBottom: '10px'}}>
            <label style={{display:'block', marginBottom:'5px'}}>Imagen del producto:</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <input
            type="text"
            placeholder="Nombre (mín 4 letras)"
            name="name"
            minLength={4} // Zod pide 4
            maxLength={50}
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            type="text"
            placeholder="Descripción (mín 10 letras)"
            name="description"
            minLength={10} // Zod pide 10
            maxLength={200}
            onChange={handleChange}
            value={formData.description}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            name="price"
            min={10} // Zod pide min 10
            onChange={handleChange}
            value={formData.price}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            min={0}
            onChange={handleChange}
            value={formData.stock}
            required
          />
          <input
            type="text"
            placeholder="Categoría (mín 3 letras)"
            name="category"
            minLength={3}
            maxLength={20}
            onChange={handleChange}
            value={formData.category}
            required
          />
          <button type="submit">Agregar</button>
        </form>
      </section>
    </Layout>
  )
}

export default AddProduct