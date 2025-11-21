import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane,
  FaBolt,
  FaArrowRight,
  FaStar,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaTiktok
} from 'react-icons/fa';

const Contact = () => {
  const toast = useToast();
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
    toast.success('¡Mensaje enviado! Te contactaremos pronto.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 🎯 Hero Header - Estilo Collegiate */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden border-b-4 border-yellow-400">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }}></div>
        </div>
        
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-sm font-black px-6 py-3 rounded-full border-2 border-white/20 mb-6">
              <FaBolt className="text-yellow-400" />
              CONTACTO PREMIUM
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none text-white" style={{
              fontFamily: '"Bebas Neue", sans-serif',
              textShadow: '4px 4px 0 rgba(0,0,0,0.5)'
            }}>
              ¡HABLEMOS!
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-slate-200 font-light max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* 📞 Información de contacto */}
          <div>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
                <FaStar className="text-yellow-500" />
                CONTACTO
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4" style={{
                fontFamily: '"Bebas Neue", sans-serif'
              }}>
                Información de Contacto
              </h2>
              <p className="text-slate-600 text-xl font-light">
                Encuentra todas las formas de comunicarte con nosotros
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  icon: <FaMapMarkerAlt className="text-3xl" />,
                  title: "Dirección",
                  content: "Av. Principal 123\nCiudad, País 12345",
                  gradient: "from-red-500 to-pink-600"
                },
                {
                  icon: <FaPhone className="text-3xl" />,
                  title: "Teléfono",
                  content: "+1 (555) 123-4567\nLunes a Viernes: 9am - 6pm",
                  gradient: "from-green-500 to-emerald-600"
                },
                {
                  icon: <FaEnvelope className="text-3xl" />,
                  title: "Email",
                  content: "info@stylehaven.com\nsoporte@stylehaven.com",
                  gradient: "from-blue-500 to-cyan-600"
                },
                {
                  icon: <FaClock className="text-3xl" />,
                  title: "Horario",
                  content: "Lunes a Viernes: 9:00 - 18:00\nSábados: 10:00 - 14:00",
                  gradient: "from-yellow-500 to-orange-600"
                }
              ].map((item, index) => (
                <div key={index} className="group flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-slate-200 hover:border-yellow-400 hover:scale-105">
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-white`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-xl mb-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                      {item.title}
                    </h3>
                    <p className="text-slate-700 font-medium whitespace-pre-line">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Redes sociales */}
            <div className="mt-10 p-8 bg-white rounded-2xl border-4 border-slate-200 shadow-xl">
              <h3 className="font-black text-slate-900 mb-6 text-2xl flex items-center gap-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                <FaStar className="text-yellow-500" />
                Síguenos en Redes
              </h3>
              <div className="flex space-x-4">
                {[
                  { icon: <FaInstagram />, gradient: 'from-pink-500 via-purple-500 to-orange-500', name: 'Instagram' },
                  { icon: <FaFacebook />, gradient: 'from-blue-600 to-blue-800', name: 'Facebook' },
                  { icon: <FaTwitter />, gradient: 'from-blue-400 to-blue-600', name: 'Twitter' },
                  { icon: <FaTiktok />, gradient: 'from-black to-gray-800', name: 'TikTok' }
                ].map((social, index) => (
                  <button
                    key={index}
                    title={social.name}
                    className={`group w-16 h-16 bg-gradient-to-br ${social.gradient} rounded-xl flex items-center justify-center text-3xl text-white hover:scale-125 transition-all shadow-2xl hover:rotate-12`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 📝 Formulario de contacto */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-4 border-slate-200">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
                <FaPaperPlane />
                FORMULARIO
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4" style={{
                fontFamily: '"Bebas Neue", sans-serif'
              }}>
                Envíanos un Mensaje
              </h2>
              <p className="text-slate-600 font-light">Completa el formulario y te responderemos pronto</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-black text-slate-900 mb-3" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-slate-50 border-4 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-900 focus:border-blue-900 transition-all text-slate-900 font-bold placeholder-slate-400"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-black text-slate-900 mb-3" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-slate-50 border-4 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-900 focus:border-blue-900 transition-all text-slate-900 font-bold placeholder-slate-400"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-black text-slate-900 mb-3" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  Asunto *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-slate-50 border-4 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-900 focus:border-blue-900 transition-all text-slate-900 font-bold"
                >
                  <option value="" className="bg-slate-50">Selecciona un asunto</option>
                  <option value="consulta" className="bg-slate-50">Consulta General</option>
                  <option value="soporte" className="bg-slate-50">Soporte Técnico</option>
                  <option value="devolucion" className="bg-slate-50">Devolución</option>
                  <option value="pedido" className="bg-slate-50">Estado de Pedido</option>
                  <option value="otros" className="bg-slate-50">Otros</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-black text-slate-900 mb-3" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-4 bg-slate-50 border-4 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-900 focus:border-blue-900 resize-vertical transition-all text-slate-900 font-medium placeholder-slate-400"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-blue-900 to-red-900 hover:from-blue-800 hover:to-red-800 text-white font-black py-5 px-6 rounded-xl transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              >
                <FaPaperPlane className="text-xl group-hover:translate-x-1 transition-transform" />
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