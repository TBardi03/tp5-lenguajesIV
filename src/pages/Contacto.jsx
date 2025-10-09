// src/pages/Contacto.jsx
import { useState, useEffect } from "react";
import { sendContact } from "../email.js"; // usa tu servicio de EmailJS
import "./contacto.css";

const initialValues = { nombre: "", email: "", mensaje: "" };

export default function Contacto() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "error" | null

  // --- Validaciones básicas ---
  const validate = () => {
    const e = {};
    if (!values.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!values.email.trim()) e.email = "El correo es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "El correo no tiene un formato válido.";
    if (!values.mensaje.trim()) e.mensaje = "El mensaje es obligatorio.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (ev) => {
    const { name, value } = ev.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    try {
      setSending(true);
      // Envío real con EmailJS (usa ../services/email.js)
      await sendContact({
        nombre: values.nombre,
        email: values.email,
        mensaje: values.mensaje,
      });
      setStatus("ok");
      setValues(initialValues);
    } catch (err) {
      console.error("EmailJS error:", err?.status, err?.text || err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  // Limpia el cartel después de unos segundos
  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(null), 3500);
    return () => clearTimeout(t);
  }, [status]);

  return (
    <main className="contacto">
      <h1>Contacto</h1>
      <p className="contacto-sub">Dejanos tu consulta y te respondemos por correo.</p>

      <div className="panel">
        {/* FORM */}
        <form className="form" onSubmit={onSubmit} noValidate>
          <label className="field">
            <span>Nombre</span>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={values.nombre}
              onChange={onChange}
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? "err-nombre" : undefined}
              required
            />
            {errors.nombre && (
              <small id="err-nombre" className="error">
                {errors.nombre}
              </small>
            )}
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="tucorreo@ejemplo.com"
              value={values.email}
              onChange={onChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              required
            />
            {errors.email && (
              <small id="err-email" className="error">
                {errors.email}
              </small>
            )}
          </label>

          <label className="field">
            <span>Mensaje</span>
            <textarea
              name="mensaje"
              rows={5}
              placeholder="Escribí tu mensaje…"
              value={values.mensaje}
              onChange={onChange}
              aria-invalid={!!errors.mensaje}
              aria-describedby={errors.mensaje ? "err-mensaje" : undefined}
              required
            />
            {errors.mensaje && (
              <small id="err-mensaje" className="error">
                {errors.mensaje}
              </small>
            )}
          </label>

          <button type="submit" className="btn" disabled={sending}>
            {sending ? "Enviando…" : "Enviar"}
          </button>

          {status === "ok" && (
            <div role="status" className="toast ok">✅ ¡Mensaje enviado correctamente!</div>
          )}
          {status === "error" && (
            <div role="alert" className="toast error">
              ❌ Ocurrió un error al enviar. Revisá tu conexión o configuración de EmailJS.
            </div>
          )}
        </form>

        {/* MAPA */}
        <div className="mapa" aria-label="Mapa de ubicación">
          <iframe
            title="Mapa – Universidad Católica de Salta"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3616.079657459448!2d-65.423!3d-24.788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b1fd6c3c7b7a1%3A0x3c9f0f9bdc3c7a4b!2sUniversidad%20Cat%C3%B3lica%20de%20Salta!5e0!3m2!1ses-419!2sar!4v1699999999999"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
}
