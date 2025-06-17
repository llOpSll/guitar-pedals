
import React, { useState } from 'react';
import { UserPlus, Lock, Mail, User, AlertCircle, CheckCircle } from 'lucide-react';

interface RegisterFormProps {
  onRegister: (username: string, email: string, password: string) => Promise<boolean>;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      return 'Por favor, preencha todos os campos';
    }

    if (username.length < 3) {
      return 'Nome de usuário deve ter pelo menos 3 caracteres';
    }

    if (password.length < 6) {
      return 'Senha deve ter pelo menos 6 caracteres';
    }

    if (password !== confirmPassword) {
      return 'Senhas não coincidem';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email inválido';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    const success = await onRegister(username, email, password);
    
    if (!success) {
      setError('Email ou nome de usuário já existe');
    }
    
    setIsLoading(false);
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, text: '' };
    if (password.length < 6) return { strength: 1, text: 'Fraca', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 2, text: 'Média', color: 'bg-yellow-500' };
    return { strength: 3, text: 'Forte', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="glass-card rounded-3xl p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-primary">Criar Conta</h2>
        <p className="text-secondary mt-2">Comece sua jornada na eletrônica</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Nome de usuário
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-accent/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white/80"
              placeholder="seu_usuario"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-accent/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white/80"
              placeholder="seu@email.com"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-accent/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white/80"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          {password && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-secondary">Força da senha:</span>
                <span className={`font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                  {passwordStrength.text}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div 
                  className={`h-1 rounded-full transition-all ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Confirmar senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-accent/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white/80"
              placeholder="••••••••"
              disabled={isLoading}
            />
            {confirmPassword && password === confirmPassword && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-secondary">
          Já tem uma conta?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-primary font-medium hover:underline"
          >
            Fazer login
          </button>
        </p>
      </div>
    </div>
  );
};
