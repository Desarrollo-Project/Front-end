import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { authService } from '../services/api';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/forgot-password', { 
        state: { 
          error: 'Token de recuperación no válido o expirado' 
        }
      });
    }
  }, [token, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage(null);

    if (!validateForm() || !token) {
      return;
    }

    try {
      setLoading(true);
      const response = await authService.resetPassword(token, formData.password);
      
      if (response.success) {
        setMessage('Contraseña actualizada exitosamente');
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Tu contraseña ha sido actualizada. Por favor inicia sesión.' 
            }
          });
        }, 2000);
      } else {
        setErrors({ general: response.message || 'Error al restablecer la contraseña' });
      }
    } catch {
      setErrors({ general: 'Error al restablecer la contraseña. Por favor intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full text-purple-600 mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restablecer Contraseña</h2>
          <p className="text-gray-600">
            Ingresa tu nueva contraseña
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            name="password"
            label="Nueva Contraseña"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <Input
            type="password"
            name="confirmPassword"
            label="Confirmar Nueva Contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          {errors.general && (
            <div className="text-red-600 text-sm">{errors.general}</div>
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
              Restablecer Contraseña
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/login')}
              className="flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Inicio de Sesión
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage; 