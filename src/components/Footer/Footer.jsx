import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaInstagram, 
  FaFacebook, 
  FaTiktok, 
  FaTwitter, 
  FaCreditCard, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaMapMarkerAlt,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaPaperPlane,
  FaCheckCircle,
  FaStar,
  FaTrophy,
  FaCrown,
  FaAward
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
      title: 'COMPRAR',
      links: [
        { name: 'Nueva Colección 2025', href: '/products?filter=new-collection' },
        { name: 'Lo Más Vendido', href: '/products' },
        { name: 'Ofertas Especiales', href: '/products?filter=discount' },
        { name: 'Lookbook Premium', href: '/products' },
        { name: 'Gift Cards', href: '/products' }
      ]
    },
    {
      title: 'INFORMACIÓN',
      links: [
        { name: 'Nuestra Historia', href: '/contact' },
        { name: 'Blog de Estilo', href: '/products' },
        { name: 'Careers', href: '/contact' },
        { name: 'Términos y Condiciones', href: '/contact' },
        { name: 'Política de Privacidad', href: '/contact' }
      ]
    },
    {
      title: 'SERVICIO',
      links: [
        { name: 'Contacto', href: '/contact' },
        { name: 'FAQ', href: '/contact' },
        { name: 'Envíos y Entregas', href: '/contact' },
        { name: 'Devoluciones', href: '/contact' },
        { name: 'Guía de Tallas', href: '/products' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: <FaInstagram />, href: '#', gradient: 'from-pink-500 via-purple-500 to-orange-500' },
    { name: 'Facebook', icon: <FaFacebook />, href: '#', gradient: 'from-blue-600 to-blue-800' },
    { name: 'TikTok', icon: <FaTiktok />, href: '#', gradient: 'from-black to-gray-800' },
    { name: 'Twitter', icon: <FaTwitter />, href: '#', gradient: 'from-blue-400 to-blue-600' }
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: 'Av. Principal 123, Ciudad, País 12345', color: 'text-red-400' },
    { icon: <FaPhone />, text: '+1 (555) 123-4567', color: 'text-green-400' },
    { icon: <FaEnvelope />, text: 'info@stylehaven.com', color: 'text-blue-400' },
    { icon: <FaClock />, text: 'Lun-Vie: 9:00 - 18:00', color: 'text-yellow-400' }
  ];

  const benefits = [
    { icon: <FaTruck />, text: 'Envío Gratis', gradient: 'from-green-400 to-emerald-500' },
    { icon: <FaShieldAlt />, text: 'Compra Segura', gradient: 'from-blue-400 to-blue-500' },
    { icon: <FaCreditCard />, text: 'Pago Fácil', gradient: 'from-purple-400 to-purple-500' },
    { icon: <FaAward />, text: 'Calidad Premium', gradient: 'from-yellow-400 to-orange-500' }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white relative overflow-hidden">
      {/* Patrón decorativo de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(255,255,255,0.05) 50px, rgba(255,255,255,0.05) 100px)'
        }} />
      </div>

      {/* Líneas decorativas estilo varsity */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600" />

      {/* 📧 Newsletter Section - Estilo Collegiate */}
      <div className="relative border-b-4 border-yellow-400 bg-gradient-to-r from-blue-900 via-red-900 to-blue-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-6 border-2 border-white/20">
              <FaCrown className="text-yellow-400 text-xl" />
              <span className="font-black tracking-wider text-sm">ÚNETE AL CLUB VIP</span>
            </div>
            
            <h3 className="text-5xl md:text-6xl font-black mb-4" style={{
              fontFamily: '"Bebas Neue", sans-serif',
              textShadow: '3px 3px 0 rgba(0,0,0,0.3)'
            }}>
              ¡NO TE PIERDAS NADA!
            </h3>
            <p className="text-xl text-slate-200 mb-8 font-bold">
              Ofertas exclusivas, nuevas colecciones y tips de estilo americano
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-4 rounded-full text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400 border-4 border-white/20"
                  />
                  <FaEnvelope className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-black px-8 py-4 rounded-full transition-all shadow-2xl hover:scale-110 flex items-center justify-center gap-2 whitespace-nowrap border-4 border-white/20"
                  style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                >
                  {subscribed ? (
                    <>
                      <FaCheckCircle className="text-xl" />
                      ¡SUSCRITO!
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-xl" />
                      SUSCRIBIRME
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 📚 Sección principal del footer */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* 🏛️ Logo y descripción - Estilo Universidad */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <div className="relative">
                <div className="absolute -left-2 -top-2 w-20 h-20 border-4 border-yellow-400 rounded-full opacity-30" />
                <h3 className="relative text-4xl font-black tracking-tight" style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #dc2626 50%, #1e3a8a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  STYLE HAVEN
                </h3>
              </div>
              <div className="text-xs font-black text-yellow-400 tracking-widest mt-1">
                AMERICAN HERITAGE • EST. 2025
              </div>
            </Link>
            
            <p className="text-slate-300 mb-8 leading-relaxed text-lg font-light">
              Tu destino premium de moda masculina. Descubre colecciones exclusivas 
              con ese auténtico estilo americano que define tu personalidad.
            </p>
            
            {/* Beneficios con números */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="group flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-xl border-2 border-white/10 hover:border-yellow-400 transition-all hover:scale-105"
                >
                  <div className={`text-2xl bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-400" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                      0{index + 1}
                    </div>
                    <div className="text-sm font-bold text-white">
                      {benefit.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Información de contacto con iconos coloridos */}
            <div className="space-y-3 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3 group hover:translate-x-2 transition-transform">
                  <div className={`${item.color} text-xl mt-1`}>
                    {item.icon}
                  </div>
                  <span className="text-slate-400 group-hover:text-white transition-colors font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Redes sociales con gradientes */}
            <div>
              <h4 className="font-black mb-4 text-lg flex items-center gap-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                <FaStar className="text-yellow-400" />
                SÍGUENOS
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`group w-14 h-14 bg-gradient-to-r ${social.gradient} rounded-xl flex items-center justify-center text-white hover:scale-125 transition-all shadow-2xl hover:rotate-12 border-2 border-white/20`}
                    title={social.name}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 📑 Secciones de enlaces - Estilo limpio */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xl font-black mb-6 text-yellow-400 flex items-center gap-2" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-yellow-400 transition-colors inline-block hover:translate-x-2 transform duration-200 group font-medium"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 🏆 Footer inferior - Estilo varsity */}
      <div className="relative border-t-4 border-yellow-400 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-400 text-sm flex items-center gap-2 font-bold">
              <span>© {currentYear} STYLE HAVEN.</span>
              <span className="hidden sm:inline">Hecho con</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span className="hidden sm:inline">en Colombia 🇨🇴</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm font-bold">
              <Link to="/contact" className="text-slate-400 hover:text-yellow-400 transition-colors">
                Términos
              </Link>
              <span className="text-slate-700">•</span>
              <Link to="/contact" className="text-slate-400 hover:text-yellow-400 transition-colors">
                Privacidad
              </Link>
              <span className="text-slate-700">•</span>
              <Link to="/contact" className="text-slate-400 hover:text-yellow-400 transition-colors">
                Cookies
              </Link>
            </div>
            
            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
              <FaCreditCard className="text-2xl text-green-400" />
              <span>Pagos 100% seguros</span>
            </div>
          </div>
        </div>
      </div>

      {/* Línea inferior decorativa */}
      <div className="h-2 bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600" />
    </footer>
  );
};

export default Footer;