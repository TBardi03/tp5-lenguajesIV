import './contacto.css'

export default function Contacto() {
  return (
    <main className="contacto">
      <h1>Contacto</h1>

      <div className="panel">
        <form className="form" onSubmit={(e)=>e.preventDefault()}>
          <label>
            Nombre
            <input type="text" name="nombre" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Mensaje
            <textarea name="mensaje" rows="5" required />
          </label>
          <button type="submit">Enviar</button>
        </form>

        <div className="mapa">
          <iframe
            title="Mapa"
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
  )
}
