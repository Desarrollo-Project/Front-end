import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Gavel className="h-8 w-8 text-purple-400" />
              <span className="ml-2 text-xl font-semibold">AuctionHub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Tu destino principal para subastas en línea. Descubre artículos únicos y haz pujas con confianza.
            </p>
            <div className="flex space-x-4">
              <span className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </span>
              <span className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </span>
              <span className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/auctions" className="text-gray-400 hover:text-white transition-colors">Subastas</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-white transition-colors">Arte y Coleccionables</li>
              <li className="text-gray-400 hover:text-white transition-colors">Electrónicos</li>
              <li className="text-gray-400 hover:text-white transition-colors">Joyas y Relojes</li>
              <li className="text-gray-400 hover:text-white transition-colors">Antigüedades</li>
              <li className="text-gray-400 hover:text-white transition-colors">Vehículos</li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactanos</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                <span className="text-gray-400">Caracas, Venezuela</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-gray-400">+58 (212) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-gray-400">soporte@auctionhub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} AuctionHub. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos de Servicio
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;