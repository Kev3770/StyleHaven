import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaInstagram, 
  FaFacebook, 
  FaTiktok, 
  FaPinterest, 
  FaCreditCard, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaMapMarkerAlt,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const footerSections = [
    {
      title: 'Comprar',
      links: [
        { name: 'Nueva Colección', href: '/products?category=nuevo' },
        { name: 'Lo Más Vendido', href: '/products' },
        { name: 'Ofertas Especiales', href: '/products?filter=discount' },
        { name: 'Lookbook', href: '/products' },
        { name: 'Tarjetas Regalo', href: '/products' }
      ]
    },
    {
      title: 'Información',
      links: [
        { name: 'Sobre Nosotros', href: '/contact' },
        { name: 'Blog de Moda', href: '/products' },
        { name: 'Trabaja con Nosotros', href: '/contact' },
        { name: 'Términos y Condiciones', href: '/contact' },
        { name: 'Política de Privacidad', href: '/contact' }
      ]
    },
    {
      title: 'Servicio al Cliente',
      links: [
        { name: 'Contacto', href: '/contact' },
        { name: 'Preguntas Frecuentes', href: '/contact' },
        { name: 'Envíos y Entregas', href: '/contact' },
        { name: 'Devoluciones', href: '/contact' },
        { name: 'Guía de Tallas', href: '/products' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: <FaInstagram />, href: '#', color: 'from-pink-500 to-purple-600' },
    { name: 'Facebook', icon: <FaFacebook />, href: '#', color: 'from-blue-600 to-blue-700' },
    { name: 'TikTok', icon: <FaTiktok />, href: '#', color: 'from-gray-800 to-gray-900' },
    { name: 'Pinterest', icon: <FaPinterest />, href: '#', color: 'from-red-600 to-red-700' }
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: 'Av. Principal 123, Ciudad, País 12345', color: 'text-indigo-400' },
    { icon: <FaPhone />, text: '+1 (555) 123-4567', color: 'text-green-400' },
    { icon: <FaEnvelope />, text: 'info@stylehaven.com', color: 'text-blue-400' },
    { icon: <FaClock />, text: 'Lun-Vie: 9:00 - 18:00', color: 'text-orange-400' }
  ];

  const benefits = [
    { icon: <FaTruck />, text: 'Envío Gratis', color: 'from-green-400 to-emerald-500' },
    { icon: <FaShieldAlt />, text: 'Compra Segura', color: 'from-blue-400 to-blue-500' },
    { icon: <FaCreditCard />, text: 'Pago Fácil', color: 'from-purple-400 to-purple-500' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Sección de Newsletter */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              ¡No Te Pierdas Nada! ✨
            </h3>
            <p className="text-lg text-indigo-100 mb-8 font-light">
              Suscríbete a nuestra newsletter y recibe ofertas exclusivas, nuevas colecciones y tips de moda
            </p>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Tu mejor email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-4 rounded-full text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                  />
                  <FaEnvelope className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="bg-white text-indigo-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {subscribed ? (
                    <>
                      <FaCheckCircle />
                      ¡Suscrito!
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Suscribirme
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Sección principal del footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <h3 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-purple-400 hover:to-pink-400 transition-all">
                STYLE HAVEN
              </h3>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              Tu destino de moda online. Descubre colecciones únicas, 
              tendencias actuales y estilos que reflejan tu personalidad.
            </p>
            
            {/* Beneficios */}
            <div className="flex flex-wrap gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                >
                  <div className={`text-xl bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                    {benefit.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-300">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Información de contacto */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3 group hover:translate-x-2 transition-transform">
                  <div className={`${item.color} text-xl mt-0.5`}>
                    {item.icon}
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Redes sociales */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Síguenos</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`group w-12 h-12 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg hover:shadow-2xl`}
                    title={social.name}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Secciones de enlaces */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-bold mb-6 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-2 transform duration-200 group"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer inferior */}
      <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm flex items-center gap-2">
              <span>© {currentYear} STYLE HAVEN.</span>
              <span className="hidden sm:inline">Hecho con</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span className="hidden sm:inline">en Colombia</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Términos
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Privacidad
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <FaCreditCard className="text-xl" />
              <span>Pagos 100% seguros</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;