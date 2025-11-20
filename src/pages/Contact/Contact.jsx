import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane,
  FaBolt,
  FaArrowRight
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Te contactaremos pronto.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }}></div>
        </div>
        
        {/* Efectos de luz */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-md text-indigo-300 text-sm font-bold px-5 py-2.5 rounded-full border border-indigo-400/30 mb-6">
              <FaBolt className="text-yellow-400" />
              CONTACTO PREMIUM
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none text-white">
              ¡HABLEMOS!
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-slate-300 font-light max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Información de contacto */}
          <div>
            <div className="mb-12">
              <span className="text-indigo-400 font-bold text-sm uppercase tracking-widest">Contacto</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">
                Información de Contacto
              </h2>
              <p className="text-slate-600 text-xl font-light">
                Encuentra todas las formas de comunicarte con nosotros
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="group flex items-start space-x-4 p-6 bg-slate-800 rounded-2xl shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 border border-slate-700 hover:border-indigo-500">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaMapMarkerAlt className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg mb-2">Dirección</h3>
                  <p className="text-slate-300 font-medium">Av. Principal 123<br />Ciudad, País 12345</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 bg-slate-800 rounded-2xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-slate-700 hover:border-blue-500">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaPhone className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg mb-2">Teléfono</h3>
                  <p className="text-slate-300 font-medium">+1 (555) 123-4567<br />Lunes a Viernes: 9am - 6pm</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 bg-slate-800 rounded-2xl shadow-2xl hover:shadow-green-500/20 transition-all duration-300 border border-slate-700 hover:border-green-500">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg mb-2">Email</h3>
                  <p className="text-slate-300 font-medium">info@stylehaven.com<br />soporte@stylehaven.com</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 bg-slate-800 rounded-2xl shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 border border-slate-700 hover:border-orange-500">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaClock className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg mb-2">Horario</h3>
                  <p className="text-slate-300 font-medium">Lunes a Viernes: 9:00 - 18:00<br />Sábados: 10:00 - 14:00</p>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="mt-10 p-8 bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl">
              <h3 className="font-black text-white mb-6 text-xl">Síguenos en Redes Sociales</h3>
              <div className="flex space-x-4">
                {[
                  { icon: '📘', color: 'from-blue-500 to-blue-600', name: 'Facebook' },
                  { icon: '📷', color: 'from-pink-500 to-purple-600', name: 'Instagram' },
                  { icon: '🐦', color: 'from-sky-400 to-blue-500', name: 'Twitter' },
                  { icon: '💼', color: 'from-blue-600 to-blue-700', name: 'LinkedIn' }
                ].map((social, index) => (
                  <button
                    key={index}
                    title={social.name}
                    className={`group w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-2xl hover:scale-110 transition-all shadow-lg hover:shadow-2xl backdrop-blur-md`}
                  >
                    <span className="group-hover:scale-110 transition-transform">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-700 backdrop-blur-md">
            <div className="mb-8">
              <span className="text-indigo-400 font-bold text-sm uppercase tracking-widest">Formulario</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
                Envíanos un Mensaje
              </h2>
              <p className="text-slate-400 font-light">Completa el formulario y te responderemos pronto</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-white mb-3">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white placeholder-slate-400"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-white mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white placeholder-slate-400"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-white mb-3">
                  Asunto *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white"
                >
                  <option value="" className="bg-slate-700">Selecciona un asunto</option>
                  <option value="consulta" className="bg-slate-700">Consulta General</option>
                  <option value="soporte" className="bg-slate-700">Soporte Técnico</option>
                  <option value="devolucion" className="bg-slate-700">Devolución</option>
                  <option value="pedido" className="bg-slate-700">Estado de Pedido</option>
                  <option value="otros" className="bg-slate-700">Otros</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-white mb-3">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical transition-all text-white placeholder-slate-400"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:scale-105 flex items-center justify-center gap-3"
              >
                <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                ENVIAR MENSAJE
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;