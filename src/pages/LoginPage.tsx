import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Gavel, LogIn } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [message, setMessage] = useState<string>(''); // Estado para mensaje de éxito

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5187/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al iniciar sesión: ${errorMessage}`);
      }

      const success = await login(email, password);
      
      if (success) {
              setMessage("Inicio de sesión exitoso.");
              setTimeout(() => navigate('/profile'), 1000); 
      } else {
        setErrors({
          general: 'Correo electrónico o contraseña inválidos',
        });
      }



    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: "Ocurrió un error desconocido." });
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px-220px)] flex flex-col justify-center py-12 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Gavel className="h-12 w-12 text-purple-600" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
              crea una nueva cuenta
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {message && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{message}</span>
              </div>
            )}

            {errors.general && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{errors.general}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input 
                label="Correo electrónico"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                required
              />

              <Input
                label="Contraseña"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Recordarme
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
                className="flex items-center justify-center"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Iniciar sesión
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;