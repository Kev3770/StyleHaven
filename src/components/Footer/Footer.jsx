import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok, FaPinterest, FaCreditCard, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Comprar',
      links: [
        { name: 'Nueva Colección', href: '#new' },
        { name: 'Lo Más Vendido', href: '#bestsellers' },
        { name: 'Ofertas Especiales', href: '#sale' },
        { name: 'Lookbook', href: '#lookbook' },
        { name: 'Regalos', href: '#gifts' }
      ]
    },
    {
      title: 'Información',
      links: [
        { name: 'Sobre Nosotros', href: '#about' },
        { name: 'Blog de Moda', href: '#blog' },
        { name: 'Trabaja con Nosotros', href: '#careers' },
        { name: 'Términos y Condiciones', href: '#terms' },
        { name: 'Política de Privacidad', href: '#privacy' }
      ]
    },
    {
      title: 'Servicio al Cliente',
      links: [
        { name: 'Contacto', href: '#contact' },
        { name: 'Preguntas Frecuentes', href: '#faq' },
        { name: 'Envíos y Entregas', href: '#shipping' },
        { name: 'Devoluciones', href: '#returns' },
        { name: 'Guía de Tallas', href: '#sizes' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: <FaInstagram />, href: '#' },
    { name: 'Facebook', icon: <FaFacebook />, href: '#' },
    { name: 'TikTok', icon: <FaTiktok />, href: '#' },
    { name: 'Pinterest', icon: <FaPinterest />, href: '#' }
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: 'Av. Principal 123, Ciudad, País 12345' },
    { icon: <FaPhone />, text: '+1 (555) 123-4567' },
    { icon: <FaEnvelope />, text: 'info@stylehaven.com' },
    { icon: <FaClock />, text: 'Lun-Vie: 9:00 - 18:00' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Sección principal del footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">STYLE HAVEN</h3>
            <p className="text-gray-400 mb-6">
              Descubre tu estilo único con las últimas tendencias en moda. 
              Calidad, estilo y precios increíbles en un solo lugar.
            </p>
            
            {/* Información de contacto */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-400">
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Redes sociales */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Métodos de pago */}
            <div className="flex items-center gap-2 text-gray-400">
              <FaCreditCard className="text-xl" />
              <span className="text-sm">Métodos de pago seguros</span>
            </div>
          </div>

          {/* Secciones de enlaces */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer inferior */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} STYLE HAVEN. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#terms" className="hover:text-white transition-colors">
                Términos
              </a>
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="#cookies" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;