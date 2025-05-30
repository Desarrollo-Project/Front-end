import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { authService } from '../services/api';

const ConfirmAccountPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el email de la ubicación del estado
  const email = location.state?.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (!code || code.length !== 6) {
      setError('El código debe tener 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.confirmAccount(code);
      if (response.success) {
        setMessage('¡Cuenta confirmada exitosamente!');
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Tu cuenta ha sido confirmada. Por favor inicia sesión.' 
            }
          });
        }, 2000);
      } else {
        setError('Código inválido o expirado');
      }
    } catch {
      setError('Error al confirmar la cuenta. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError('No se encontró el correo electrónico');
      return;
    }

    try {
      setLoading(true);
      await authService.requestPasswordRecovery(email);
      setMessage('Se ha enviado un nuevo código a tu correo electrónico');
    } catch {
      setError('Error al reenviar el código. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <Layout>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">
            No se encontró la información de registro. Por favor regresa a la página de registro.
          </p>
          <Button variant="primary" onClick={() => navigate('/register')}>
            Volver al Registro
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full text-purple-600 mb-4">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirmar tu Cuenta</h2>
          <p className="text-gray-600">
            Hemos enviado un código de 6 caracteres a {email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              label="Código de Confirmación"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Ingresa el código de 6 caracteres"
              maxLength={6}
              required
            />
          </div>

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
              Confirmar Cuenta
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleResendCode}
              disabled={loading}
            >
              Reenviar Código
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/register')}
              className="flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Registro
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ConfirmAccountPage; 