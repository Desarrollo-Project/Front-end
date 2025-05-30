import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Clock, Award, Shield } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import AuctionCard from '../components/auctions/AuctionCard';
import { auctionService } from '../services/api';
import { Auction } from '../types';

const HomePage: React.FC = () => {
  const [featuredAuctions, setFeaturedAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await auctionService.getAuctions();
        // Obtener 4 subastas para la sección destacada
        setFeaturedAuctions(response.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener subastas:', error);
        setError('No se pudieron cargar las subastas destacadas');
        setLoading(false);
      }
    };
    
    fetchAuctions();
  }, []);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/3945638/pexels-photo-3945638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Descubre Artículos Únicos a <span className="text-teal-400">Precios Competitivos</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Únete a miles de postores en nuestra plataforma segura de subastas.
              Encuentra coleccionables, arte, electrónica y más con nuevos artículos añadidos diariamente.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate('/auctions')}
                className="group"
              >
                Explorar Subastas
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/register')}
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                Regístrate Gratis
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Bar Section */}
      <section className="bg-white py-6 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative flex-grow mb-4 md:mb-0 md:mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar artículos..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <Button variant="primary">
              Buscar
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Auctions */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Subastas Destacadas</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ¡Echa un vistazo a estos artículos seleccionados con pujas activas. ¡No pierdas la oportunidad de ganar!
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredAuctions.map(auction => (
                  <AuctionCard key={auction.id} auction={auction} compact />
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/auctions')}
                  className="group"
                >
                  Ver Todas las Subastas
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">¿Por qué elegir AuctionHub?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Proporcionamos una plataforma segura y fácil de usar para compradores y vendedores.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full text-purple-600 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pujas en Tiempo Real</h3>
              <p className="text-gray-600">
                Experimenta la emoción de las subastas en vivo con actualizaciones y notificaciones en tiempo real.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full text-teal-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transacciones Seguras</h3>
              <p className="text-gray-600">
                Nuestra plataforma garantiza transacciones seguras con protección para compradores y vendedores.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full text-amber-600 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Garantía de Calidad</h3>
              <p className="text-gray-600">
                Todos los artículos son verificados y los vendedores son calificados para asegurar la mejor experiencia.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para Empezar a Pujar?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Únete a miles de postores y vendedores exitosos en nuestra plataforma.
            El registro es gratuito y solo toma un minuto.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Crear una Cuenta
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/auctions')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30"
            >
              Explorar Subastas
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;