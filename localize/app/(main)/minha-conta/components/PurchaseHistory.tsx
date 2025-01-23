'use client';
import React from 'react';
import { Search, Filter, Download, Share2 } from 'lucide-react';

interface PurchaseHistoryProps {
  purchaseHistory: {
    id: number;
    event: {
      name: string;
      date: string;
      imageUrl: string;
      price: number;
    };
    status: string;
  }[];
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({
  purchaseHistory,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar compras..."
              className="pl-10 input-field"
            />
          </div>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </button>
        </div>
      </div>

      {/* Lista de Compras */}
      {purchaseHistory.map((compra) => (
        <div
          key={compra.id}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={compra.event.imageUrl}
              alt={compra.event.name}
              className="w-full md:w-48 h-32 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {compra.event.name}
                  </h3>
                  <p className="text-gray-500">
                    {new Date(compra.event.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {compra.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  R$ {compra.event.price.toFixed(2)}
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseHistory;
