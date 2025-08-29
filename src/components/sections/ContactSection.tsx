import { useTranslation } from '@/../hooks/useTranlation';
import { useState, ChangeEvent, FormEvent } from 'react';

export default function ContactSection() {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
  };

  return (
    <section id="contact" className="w-full py-8 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(59, 58, 108, 0.95), rgba(59, 58, 108, 0.85)), url('/assets/contact-bg.jpg')`
          }}
        />
      </div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Lado izquierdo - Contenido */}
          <div className="space-y-8 text-white">
            {/* Línea decorativa */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <div className="w-8 h-1 bg-primary/60 rounded-full"></div>
              <div className="w-4 h-1 bg-primary/40 rounded-full"></div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t.contact.title.split(' ').slice(0, 2).join(' ')}{' '}
                <span className="block">{t.contact.title.split(' ').slice(2).join(' ')}</span>
              </h2>
              
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
                {t.contact.description}
              </p>
            </div>

            {/* Lista de beneficios */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                {t.contact.benefitsTitle}
              </h3>
              <div className="space-y-3">
                {t.contact.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-white/90 text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lado derecho - Formulario */}
          <div className="lg:ml-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  PÓNGASE EN CONTACTO CON NUESTROS EXPERTOS TÉCNICOS
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo Nombre */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-white text-sm font-medium">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Ingrese su nombre completo"
                  />
                </div>

                {/* Campo Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-white text-sm font-medium">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="su.email@empresa.com"
                  />
                </div>

                {/* Campo Teléfono */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-white text-sm font-medium">
                    Teléfono/WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Campo Mensaje */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-white text-sm font-medium">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Ingrese los detalles de su proyecto (como requisitos específicos, cronograma, etc.) para recibir una cotización precisa."
                  />
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Envíe Su Consulta
                </button>

                {/* Nota de privacidad */}
                <p className="text-white/70 text-xs text-center leading-relaxed">
                  *Respetamos su confidencialidad y toda la información está protegida.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Efecto de superposición para el footer */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-transparent to-primary/20 z-20 pointer-events-none"></div>
    </section>
  );
}