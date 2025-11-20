import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4">¡Hablemos!</h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto font-light">
            Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Información de contacto */}
          <div>
            <div className="mb-12">
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Contacto</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-4">
                Información de Contacto
              </h2>
              <p className="text-gray-600 text-lg">
                Encuentra todas las formas de comunicarte con nosotros
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaMapMarkerAlt className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Dirección</h3>
                  <p className="text-gray-600">Av. Principal 123<br />Ciudad, País 12345</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaPhone className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Teléfono</h3>
                  <p className="text-gray-600">+1 (555) 123-4567<br />Lunes a Viernes: 9am - 6pm</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Email</h3>
                  <p className="text-gray-600">info@stylehaven.com<br />soporte@stylehaven.com</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaClock className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Horario</h3>
                  <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00<br />Sábados: 10:00 - 14:00</p>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="mt-10 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">Síguenos en Redes Sociales</h3>
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
                    className={`group w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-2xl hover:scale-110 transition-all shadow-lg hover:shadow-2xl`}
                  >
                    <span className="group-hover:scale-110 transition-transform">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
            <div className="mb-8">
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Formulario</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-2">
                Envíanos un Mensaje
              </h2>
              <p className="text-gray-600">Completa el formulario y te responderemos pronto</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2">
                  Asunto *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta">Consulta General</option>
                  <option value="soporte">Soporte Técnico</option>
                  <option value="devolucion">Devolución</option>
                  <option value="pedido">Estado de Pedido</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical transition-all"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
              >
                <FaPaperPlane />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;