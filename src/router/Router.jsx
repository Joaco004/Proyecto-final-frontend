// src/RouterApp.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import AboutUs from "../pages/AboutUs"
import AddProduct from "../pages/AddProduct"
import Login from "../pages/Login"
import Register from "../pages/Register"

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<AboutUs />} />
        <Route path="/agregar-producto" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }
