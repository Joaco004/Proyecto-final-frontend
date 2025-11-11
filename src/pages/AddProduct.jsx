import Layout from "../components/Layout"

const AddProduct = () => {
  return (
    <Layout>
      <div className="page-banner">Agregar Nuevo Producto</div>

      <section className="page-section">
        <form className="form-container">
          <input type="text" placeholder="Nombre" required />
          <input type="text" placeholder="Descripción" required />
          <input type="number" placeholder="Precio" required />
          <input type="number" placeholder="Stock" required />
          <input type="text" placeholder="Categoría" required />
          <button type="submit">Agregar</button>
        </form>
      </section>
    </Layout>
  )
}

export default AddProduct
