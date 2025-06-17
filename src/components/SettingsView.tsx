
import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Shield, Trash2, Save } from 'lucide-react';
import { UserData, LocalStorageManager } from '../utils/storage';

interface SettingsViewProps {
  user: UserData;
  onBack: () => void;
  onUserUpdate: (updatedUser: UserData) => void;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
  user, 
  onBack, 
  onUserUpdate,
  onLogout 
}) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      username,
      email
    };
    
    LocalStorageManager.updateUser(updatedUser);
    onUserUpdate(updatedUser);
    alert('Perfil atualizado com sucesso!');
  };

  const handleChangePassword = () => {
    if (currentPassword !== user.password) {
      alert('Senha atual incorreta!');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('Nova senha deve ter pelo menos 6 caracteres!');
      return;
    }

    const updatedUser = {
      ...user,
      password: newPassword
    };
    
    LocalStorageManager.updateUser(updatedUser);
    onUserUpdate(updatedUser);
    setCurrentPassword('');
    setNewPassword('');
    alert('Senha alterada com sucesso!');
  };

  const handleDeleteAccount = () => {
    // Em uma aplicação real, isso removeria a conta do banco de dados
    LocalStorageManager.logout();
    onLogout();
    alert('Conta excluída com sucesso!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <h1 className="text-3xl font-bold text-primary">Configurações</h1>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Informações do Perfil */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-6 h-6 text-secondary" />
            <h2 className="text-xl font-semibold text-primary">Informações do Perfil</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Nome de usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border-2 border-accent/50 rounded-xl focus:border-secondary outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-accent/50 rounded-xl focus:border-secondary outline-none"
              />
            </div>
            
            <button
              onClick={handleSaveProfile}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Perfil</span>
            </button>
          </div>
        </div>

        {/* Alterar Senha */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-secondary" />
            <h2 className="text-xl font-semibold text-primary">Segurança</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Senha atual
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 border-2 border-accent/50 rounded-xl focus:border-secondary outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Nova senha
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border-2 border-accent/50 rounded-xl focus:border-secondary outline-none"
              />
            </div>
            
            <button
              onClick={handleChangePassword}
              disabled={!currentPassword || !newPassword}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 disabled:opacity-50"
            >
              <Shield className="w-4 h-4" />
              <span>Alterar Senha</span>
            </button>
          </div>
        </div>

        {/* Zona de Perigo */}
        <div className="glass-card rounded-2xl p-6 border-2 border-red-200">
          <div className="flex items-center space-x-3 mb-6">
            <Trash2 className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-red-600">Zona de Perigo</h2>
          </div>
          
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Excluir Conta
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-red-600 font-medium">
                Tem certeza? Esta ação não pode ser desfeita.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Sim, excluir conta
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
