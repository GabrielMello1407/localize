'use client';
import React from 'react';
import { Download, Share2 } from 'lucide-react';

interface ActiveTicketsProps {
  activeTickets: {
    id: number;
    event: {
      name: string;
      date: string;
      imageUrl: string;
      location: string;
    };
    ticketType: string;
  }[];
}

const ActiveTickets: React.FC<ActiveTicketsProps> = ({ activeTickets }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Ingressos Ativos */}
      {activeTickets.map((ingresso) => (
        <div
          key={ingresso.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={ingresso.event.imageUrl}
                alt={ingresso.event.name}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {ingresso.event.name}
                  </h3>
                  <p className="text-gray-500">
                    {new Date(ingresso.event.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Local</p>
                  <p className="font-medium">{ingresso.event.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Horário</p>
                  <p className="font-medium">
                    {new Date(ingresso.event.date).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Setor</p>
                  <p className="font-medium">{ingresso.ticketType}</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Ver QR Code
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveTickets;
