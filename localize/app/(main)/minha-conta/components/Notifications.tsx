'use client';
import React from 'react';
import { Bell } from 'lucide-react';

const Notifications = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Configurações de Notificação */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Preferências de Notificação
        </h3>
        <div className="space-y-4">
          {[
            {
              title: 'Novos eventos',
              description: 'Receba alertas sobre novos eventos',
            },
            {
              title: 'Lembretes',
              description: 'Lembretes de eventos próximos',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div>
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Histórico de Notificações */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Histórico de Notificações
        </h3>
        <div className="space-y-4">
          {[
            {
              title: 'Novo evento disponível',
              message: 'Show do Metallica: ingressos à venda!',
              time: '2 horas atrás',
            },
            {
              title: 'Lembrete de evento',
              message: 'Festival de Verão acontece amanhã!',
              time: '5 horas atrás',
            },
            {
              title: 'Promoção especial',
              message: '50% de desconto em eventos selecionados',
              time: '1 dia atrás',
            },
          ].map((notif, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex-shrink-0">
                <Bell className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{notif.title}</h4>
                <p className="text-sm text-gray-500">{notif.message}</p>
                <span className="text-xs text-gray-400">{notif.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
