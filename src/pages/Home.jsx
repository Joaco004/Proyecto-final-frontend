import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import UpdateProduct from "../components/UpdateProduct"
import { useAuth } from "../context/AuthContext"
import { CATEGORIES } from "../constants/categories.js"
import { ToastMessage } from "../components/ToastMessage.jsx"

const Home = () => {
  const initialErrorState = {
    success: null,
    notification: null,
    error: { fetch: null, delete: null }
  }

  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filters, setFilters] = useState({
    name: "",
    stock: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  })
  const [responseServer, setResponseServer] = useState(initialErrorState)

  const { user, token } = useAuth()

  const fetchingProducts = async (query = "") => {
    setResponseServer(initialErrorState)
    try {
      const response = await fetch(`http://localhost:3000/products?${query}`, {
        method: "GET"
      })
      const dataProducts = await response.json()
      
      // Aseguramos que dataProducts.data exista, si no array vacio
      setProducts(dataProducts.data ? dataProducts.data.reverse() : [])
      
      setResponseServer({
        success: true,
        notification: "Exito al cargar los productos",
        error: { ...responseServer.error, fetch: true }
      })
    } catch (e) {
      setResponseServer({
        success: false,
        notification: "Error al traer los datos (Backend apagado?)",
        error: { ...responseServer.error, fetch: false }
      })
    }
  }

  useEffect(() => {
    fetchingProducts()
  }, [])

  const deleteProduct = async (idProduct) => {
    if (!confirm("Esta seguro de que quieres borrar el producto")) return

    try {
      const response = await fetch(`http://localhost:3000/products/${idProduct}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const dataResponse = await response.json()

      if (!response.ok) {
        alert(dataResponse.error || "Error al borrar")
        return
      }

      setProducts(products.filter((p) => (p._id || p.id) !== idProduct))
      alert(`Producto borrado con éxito.`)
      
    } catch (error) {
      console.log(error)
      alert("Error de conexión")
    }
  }

  const handleUpdateProduct = (p) => {
    setSelectedProduct(p)
  }

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = new URLSearchParams()
    // Solo agregamos al query si tienen valor real
    if (filters.name) query.append("name", filters.name)
    if (filters.stock) query.append("stock", filters.stock)
    if (filters.category && filters.category !== "Todas las categorias") query.append("category", filters.category)
    if (filters.minPrice) query.append("minPrice", filters.minPrice)
    if (filters.maxPrice) query.append("maxPrice", filters.maxPrice)

    fetchingProducts(query.toString())
  }

  const handleResetFilters = () => {
    setFilters({ name: "", stock: "", category: "", minPrice: "", maxPrice: "" })
    fetchingProducts() // Recargar sin filtros
  }

  // Helper para arreglar la URL de la imagen que viene del backend
  const getImageUrl = (imgData) => {
    if (!imgData) return "https://via.placeholder.com/150?text=Sin+Imagen";
    // Si viene con backslashes de windows (uploads\file.jpg), los cambiamos a /
    const cleanPath = imgData.replace(/\\/g, "/");
    return `http://localhost:3000/${cleanPath}`;
  }

  return (
    <Layout>
      <div className="page-banner">Nuestros Productos</div>

      <section className="page-section">
        <p>
          Bienvenido {user && user.email} a nuestra tienda. Aquí encontrarás una amplia variedad de productos.
        </p>
      </section>

      <section>
        <form className="filters-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Buscar por nombre" onChange={handleChange} value={filters.name} />
          <select name="category" onChange={handleChange} value={filters.category}>
            <option value="">Todas las categorias</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.value}>{cat.content}</option>
            ))}
          </select>
          <input type="number" name="minPrice" placeholder="Min $" onChange={handleChange} value={filters.minPrice} />
          <input type="number" name="maxPrice" placeholder="Max $" onChange={handleChange} value={filters.maxPrice} />
          <button type="submit">Aplicar filtros</button>
          <button type="button" onClick={handleResetFilters}>Limpiar</button>
        </form>
      </section>

      {selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={() => fetchingProducts()}
        />
      )}

      <section className="products-grid">
        {products.map((p, i) => (
          <div key={i} className="product-card">
            {/* IMAGEN DEL PRODUCTO */}
            <div style={{width: '100%', height: '200px', overflow:'hidden', marginBottom: '10px'}}>
               <img 
                 src={getImageUrl(p.image)} 
                 alt={p.name} 
                 style={{width: '100%', height: '100%', objectFit: 'contain'}} 
               />
            </div>

            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><strong>Precio:</strong> ${p.price}</p>
            <p><strong>Stock:</strong> {p.stock}</p>
            <p><strong>Categoría:</strong> {p.category}</p>
            {user && (
              <div className="cont-btn">
                <button onClick={() => handleUpdateProduct(p)}>Actualizar</button>
                <button onClick={() => deleteProduct(p._id || p.id)}>Borrar</button>
              </div>
            )}
          </div>
        ))}
      </section>
      
      {!responseServer.error.fetch && responseServer.notification && (<ToastMessage 
           msg={responseServer.notification} 
           type="error" 
           onClose={() => setResponseServer({ ...responseServer, notification: null })}
         />
      )}

      {responseServer.success && (
        <ToastMessage 
          msg={responseServer.notification} 
          type="success" 
          onClose={() => setResponseServer({ ...responseServer, success: null, notification: null })} 
        />
      )}

    </Layout>
  )
}

export default Home
