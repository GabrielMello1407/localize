'use client';
import React, { useState, useEffect } from 'react';
import {
  User,
  Bell,
  Lock,
  ShoppingBag,
  Ticket,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import UserProfile from './components/UserProfile';
import PurchaseHistory from './components/PurchaseHistory';
import ActiveTickets from './components/ActiveTickets';
import Notifications from './components/Notifications';
import Security from './components/Security';
import toast from 'react-hot-toast';
import {
  getLoginCookies,
  handleAccountDeletion as clearCookiesOnDeletion,
} from '@/app/actions/action';
import { Button } from '@/components/ui/button';
import { updatePasswordSchema } from '@/schemas/userSchema';

function MyAccount() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: '',
    whatsapp: '',
    cpf: '',
    address: '',
    state: '',
    houseNumber: 0,
    cep: '',
    birthDate: '',
    city: '',
    neighborhood: '',
    photoUrl: '',
    createdAt: '',
    email: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [activeTickets, setActiveTickets] = useState([]);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { token } = await getLoginCookies();
        const [userResponse, purchasesResponse] = await Promise.all([
          axios.get('/api/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('/api/tickets', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUserData(userResponse.data);
        setPurchaseHistory(purchasesResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast.error('Erro ao buscar informações do servidor.');
      }
    };

    fetchAllData();
  }, []);

  const handleProfileUpdate = async () => {
    if (!userData.name || !userData.cpf) {
      toast.error('Por favor, preencha os campos obrigatórios.');
      return;
    }

    try {
      const { token } = await getLoginCookies();
      await axios.put('/api/users', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil.');
    }
  };

  const handlePasswordChange = async () => {
    try {
      const { token } = await getLoginCookies();

      const result = updatePasswordSchema.safeParse({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      if (!result.success) {
        console.error('Erro de validação:', result.error.errors);
        toast.error(result.error.errors[0].message);
        return;
      }

      await axios.patch(
        '/api/users/password',
        { currentPassword, newPassword, confirmNewPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success('Senha alterada com sucesso!');
      setShowPasswordModal(false);
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      toast.error('Erro ao alterar senha.');
    }
  };

  const handleEmailChange = async () => {
    try {
      const { token } = await getLoginCookies();

      if (!currentEmail) {
        toast.error('Por favor, preencha o campo de email atual.');
        return;
      }

      if (newEmail !== confirmNewEmail) {
        toast.error('Os novos emails não coincidem.');
        return;
      }
      if (currentEmail === newEmail) {
        toast.error('O novo email não pode ser o mesmo que o email atual.');
      }

      const response = await axios.patch(
        '/api/users/email',
        { currentEmail, newEmail, confirmNewEmail, password: currentPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      toast.success('Email alterado com sucesso!');
      setShowEmailModal(false);
    } catch (error) {
      toast.error('Email atual ou senha incorreto.');
    }
  };

  const handleAccountDeletion = async () => {
    try {
      const { token } = await getLoginCookies();

      if (!confirmDeletion) {
        toast.error('Você deve confirmar a exclusão da conta.');
        return;
      }

      const response = await axios.delete('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          password: currentPassword,
          confirmDeletion,
        },
      });

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      await clearCookiesOnDeletion();
      toast.success('Conta excluída com sucesso!');
      router.push('/entrar');
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      toast.error('Erro ao excluir conta.');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <UserProfile
            userData={userData}
            setUserData={setUserData}
            handleProfileUpdate={handleProfileUpdate}
          />
        );

      case 'purchases':
        return <PurchaseHistory purchaseHistory={purchaseHistory} />;

      case 'tickets':
        return <ActiveTickets activeTickets={activeTickets} />;

      case 'notifications':
        return <Notifications />;

      case 'security':
        return (
          <Security
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            showPasswordModal={showPasswordModal}
            setShowPasswordModal={setShowPasswordModal}
            showEmailModal={showEmailModal}
            setShowEmailModal={setShowEmailModal}
            handlePasswordChange={handlePasswordChange}
            handleEmailChange={handleEmailChange}
            handleAccountDeletion={handleAccountDeletion}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            newEmail={newEmail}
            setNewEmail={setNewEmail}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            currentEmail={currentEmail}
            setCurrentEmail={setCurrentEmail}
            confirmNewPassword={confirmNewPassword}
            setConfirmNewPassword={setConfirmNewPassword}
            confirmNewEmail={confirmNewEmail}
            setConfirmNewEmail={setConfirmNewEmail}
            confirmDeletion={confirmDeletion}
            setConfirmDeletion={setConfirmDeletion}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Minha Conta
              </h1>
            </div>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Lateral */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {[
                { id: 'profile', icon: User, text: 'Perfil' },
                {
                  id: 'purchases',
                  icon: ShoppingBag,
                  text: 'Histórico de Compras',
                },
                { id: 'tickets', icon: Ticket, text: 'Ingressos Ativos' },
                { id: 'notifications', icon: Bell, text: 'Notificações' },
                { id: 'security', icon: Lock, text: 'Segurança' },
              ].map((item) => (
                <Button
                  variant={'menuLeft'}
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ))}
            </nav>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
}

export default MyAccount;
