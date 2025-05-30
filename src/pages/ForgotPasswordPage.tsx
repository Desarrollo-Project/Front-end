import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { authService } from '../services/api';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Mostrar mensaje de error si viene de la página de restablecimiento
    const errorMessage = location.state?.error;
    if (errorMessage) {
      setError(errorMessage);
    }
  }, [location]);

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email.trim()) {
      setError('El correo electrónico es requerido');
      return;
    }

    if (!validateEmail(email)) {
      setError('El correo electrónico no es válido');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.requestPasswordRecovery(email);
      
      if (response.success) {
        setMessage('Se ha enviado un correo con las instrucciones para restablecer tu contraseña');
        setEmail('');
      } else {
        setError(response.message || 'Error al solicitar la recuperación de contraseña');
      }
    } catch {
      setError('Error al solicitar la recuperación de contraseña. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full text-purple-600 mb-4">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Recuperar Contraseña</h2>
          <p className="text-gray-600">
            Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          {message && (
            <div className="text-green-600 text-sm">{message}</div>
          )}

          <div className="flex flex-col space-y-3">
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              disabled={loading}
            >
              Enviar Instrucciones
            </Button>

            <Link 
              to="/login"
              className="text-center text-sm text-purple-600 hover:text-purple-800"
            >
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Inicio de Sesión
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;