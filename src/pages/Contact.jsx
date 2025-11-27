import { useState } from "react";
import Layout from "../components/Layout";

export default function Contact() {
  const [form, setForm] = useState({
    subject: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Layout>
      <h1>Contacto</h1>

      <form className="contact-form" onSubmit={handleSubmit}>


        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Asunto</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mensaje</label>
          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </Layout>
  );
}
