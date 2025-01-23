'use client';
import React from 'react';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Home,
  Hash,
  Building,
} from 'lucide-react';
import ImageUpload from '@/components/image-upload';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface UserProfileProps {
  userData: {
    name: string;
    whatsapp: string;
    cpf: string;
    address: string;
    state: string;
    houseNumber: number;
    cep: string;
    birthDate: string;
    city: string;
    neighborhood: string;
    photoUrl: string;
    createdAt: string;
    email: string;
  };
  setUserData: (data: any) => void;
  handleProfileUpdate: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userData,
  setUserData,
  handleProfileUpdate,
}) => {
  const handleImageUpload = (url: string) => {
    setUserData((prevData: typeof userData) => ({
      ...prevData,
      photoUrl: url,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Foto de Perfil */}
      <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              src={
                userData?.photoUrl?.startsWith('http') ||
                userData?.photoUrl?.startsWith('/')
                  ? userData.photoUrl
                  : '/user.png'
              }
              alt="Foto de perfil do usuário"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
            <ImageUpload onUpload={handleImageUpload} />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            {userData?.name}
          </h2>
          <p className="text-gray-500">
            Membro desde{' '}
            {userData?.createdAt
              ? new Date(userData.createdAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                })
              : ''}
          </p>
          <p>{userData?.email}</p>
        </div>
      </div>

      {/* Formulário de Dados */}
      <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Informações Pessoais
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2" />
                Nome Completo
              </Label>
              <Input
                type="text"
                value={userData?.name || ''}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="Input-field"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4 mr-2" />
                Telefone
              </Label>
              <Input
                type="tel"
                value={userData?.whatsapp || ''}
                onChange={(e) =>
                  setUserData({ ...userData, whatsapp: e.target.value })
                }
                className="Input-field"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <Hash className="w-4 h-4 mr-2" />
                CPF
              </Label>
              <Input
                type="text"
                value={userData?.cpf || ''}
                onChange={(e) =>
                  setUserData({ ...userData, cpf: e.target.value })
                }
                className="Input-field"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 mr-2" />
                Endereço
              </Label>
              <Input
                type="text"
                value={userData?.address || ''}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
                className="Input-field"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <Building className="w-4 h-4 mr-2" />
                Estado
              </Label>
              <Input
                type="text"
                value={userData?.state || ''}
                onChange={(e) =>
                  setUserData({ ...userData, state: e.target.value })
                }
                className="Input-field"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <Home className="w-4 h-4 mr-2" />
                Número da Casa
              </Label>
              <Input
                type="number"
                value={userData?.houseNumber || ''}
                onChange={(e) =>
                  setUserData({ ...userData, houseNumber: e.target.value })
                }
                className="Input-field"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <Hash className="w-4 h-4 mr-2" />
                CEP
              </Label>
              <Input
                type="text"
                value={userData?.cep || ''}
                onChange={(e) =>
                  setUserData({ ...userData, cep: e.target.value })
                }
                className="Input-field"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                Data de Nascimento
              </Label>
              <Input
                type="date"
                value={
                  userData?.birthDate
                    ? new Date(userData.birthDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={(e) =>
                  setUserData({ ...userData, birthDate: e.target.value })
                }
                className="Input-field"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 mr-2" />
                Cidade
              </Label>
              <Input
                type="text"
                value={userData?.city || ''}
                onChange={(e) =>
                  setUserData({ ...userData, city: e.target.value })
                }
                className="Input-field"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 mr-2" />
                Bairro
              </Label>
              <Input
                type="text"
                value={userData?.neighborhood || ''}
                onChange={(e) =>
                  setUserData({ ...userData, neighborhood: e.target.value })
                }
                className="Input-field"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleProfileUpdate}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
