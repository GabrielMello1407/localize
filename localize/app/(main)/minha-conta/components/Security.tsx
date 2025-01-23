'use client';
import React, { useState } from 'react';
import { Key, Mail, Trash2, AlertTriangle, X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SecurityProps {
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
  showPasswordModal: boolean;
  setShowPasswordModal: (show: boolean) => void;
  showEmailModal: boolean;
  setShowEmailModal: (show: boolean) => void;
  handlePasswordChange: () => void;
  handleEmailChange: () => void;
  handleAccountDeletion: () => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  newEmail: string;
  setNewEmail: (email: string) => void;
  currentPassword: string;
  setCurrentPassword: (password: string) => void;
  currentEmail: string;
  setCurrentEmail: (email: string) => void;
  confirmNewPassword: string;
  setConfirmNewPassword: (password: string) => void;
  confirmNewEmail: string;
  setConfirmNewEmail: (email: string) => void;
  confirmDeletion: boolean;
  setConfirmDeletion: (confirm: boolean) => void;
}

const Security: React.FC<SecurityProps> = ({
  showDeleteModal,
  setShowDeleteModal,
  showPasswordModal,
  setShowPasswordModal,
  showEmailModal,
  setShowEmailModal,
  handlePasswordChange,
  handleEmailChange,
  handleAccountDeletion,
  newPassword,
  setNewPassword,
  newEmail,
  setNewEmail,
  currentPassword,
  setCurrentPassword,
  currentEmail,
  setCurrentEmail,
  confirmNewPassword,
  setConfirmNewPassword,
  confirmNewEmail,
  setConfirmNewEmail,
  confirmDeletion,
  setConfirmDeletion,
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Segurança da Conta */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Segurança da Conta
        </h3>
        <div className="space-y-6">
          {/* Senha */}
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Key className="w-6 h-6 text-[#0B98D8]" />
                <div>
                  <h4 className="font-medium text-gray-900">Alterar Senha</h4>
                  <p className="text-sm text-gray-500">
                    Última alteração há 3 meses
                  </p>
                </div>
              </div>
              <Button
                variant={'profile'}
                onClick={() => setShowPasswordModal(true)}
                className="text-[#0B98D8]"
              >
                Atualizar
              </Button>
            </div>
          </div>

          {/* Email */}
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Mail className="w-6 h-6 text-[#0B98D8]" />
                <div>
                  <h4 className="font-medium text-gray-900">Alterar Email</h4>
                  <p className="text-sm text-gray-500">
                    Última alteração há 3 meses
                  </p>
                </div>
              </div>
              <Button
                variant={'profile'}
                onClick={() => setShowEmailModal(true)}
                className="text-[#0B98D8]"
              >
                Atualizar
              </Button>
            </div>
          </div>

          {/* Exclusão de Conta */}
          <div className="p-4 border border-red-100 rounded-lg hover:border-red-200 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Trash2 className="w-6 h-6 text-red-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Excluir Conta</h4>
                  <p className="text-sm text-gray-500">
                    Essa ação não pode ser desfeita
                  </p>
                </div>
              </div>
              <Button
                variant={'destructive'}
                onClick={() => setShowDeleteModal(true)}
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 animate-fade-in">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Excluir Conta
                  </h3>
                </div>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Tem certeza que deseja excluir sua conta? Esta ação não pode
                  ser desfeita e todos os seus dados serão permanentemente
                  removidos.
                </p>

                <div className="bg-red-50 p-4 rounded-lg">
                  <ul className="text-sm text-red-600 space-y-2">
                    <li className="flex items-center space-x-2">
                      <span>• Seus ingressos ativos serão cancelados</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>• Seu histórico de compras será apagado</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>
                        • Suas preferências e configurações serão perdidas
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      checked={confirmDeletion}
                      onChange={(e) => setConfirmDeletion(e.target.checked)}
                    />
                    <span className="text-sm text-gray-600">
                      Eu entendo que esta ação é irreversível
                    </span>
                  </label>
                </div>

                <div className="relative">
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Senha Atual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="input-field"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAccountDeletion}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Excluir Conta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Alteração de Senha */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 animate-fade-in">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#0B98D8] p-2 rounded-full">
                    <Key className="w-6 h-6 text-[#ffffff]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Alterar Senha
                  </h3>
                </div>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Insira sua senha atual, nova senha e confirme a nova senha
                  abaixo.
                </p>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Senha Atual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="input-field"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Nova Senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-field"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    placeholder="Confirme a Nova Senha"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="input-field"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                  >
                    {showConfirmNewPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
              <Button
                variant={'destructive'}
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-red-800 hover:text-white transition-colors"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => handlePasswordChange()}
                className="px-4 py-2 bg-[#0B98D8] text-white rounded-md hover:bg-[#bd682a] transition-colors"
              >
                Alterar Senha
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Alteração de Email */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 animate-fade-in">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Mail className="w-6 h-6 text-[#0B98D8]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Alterar Email
                  </h3>
                </div>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Insira seu email atual, novo email e confirme o novo email
                  abaixo.
                </p>
                <Input
                  type="email"
                  placeholder="Email Atual"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  className="input-field"
                />
                <Input
                  type="email"
                  placeholder="Novo Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="input-field"
                />
                <Input
                  type="email"
                  placeholder="Confirme o Novo Email"
                  value={confirmNewEmail}
                  onChange={(e) => setConfirmNewEmail(e.target.value)}
                  className="input-field"
                />
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Senha Atual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="input-field"
                  />
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
              <Button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleEmailChange}
                className="px-4 py-2 bg-[#0B98D8] text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Alterar Email
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Security;
