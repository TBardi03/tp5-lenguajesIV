// src/services/email.js
import emailjs from "@emailjs/browser";

export async function sendContact({ nombre, email, mensaje }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const templateParams = {
    title: "Contacto TP5",
    from_name: nombre,
    reply_to: email,
    message: mensaje,
  };

  return emailjs.send(serviceId, templateId, templateParams, { publicKey });
}
