import Button from "../atoms/Button";
import FormInput from "../atoms/FormInput";

export default function ContactForm() {
  return (
    <form className="space-y-4">
      <FormInput label="Nombre" type="text" name="name" placeholder="Tu nombre" required />
      <FormInput label="Email" type="email" name="email" placeholder="tu@email.com" required />
      <FormInput label="Mensaje" type="textarea" name="message" placeholder="Tu mensaje" required />
      <Button text="Enviar consulta" />
    </form>
  );
}