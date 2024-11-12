import React from 'react';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import { CryptoData } from '../types';

interface Props {
  data: CryptoData;
}

export const SignalCard: React.FC<Props> = ({ data }) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{data.pair}</h2>
      <span className="text-xl text-green-400">
        ${data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
      </span>
    </div>

    <div className="bg-gray-700 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <span className="text-lg">إشارة التداول:</span>
        <span
          className={`text-lg font-bold ${
            data.signal === 'شراء' ? 'text-green-400' : 'text-yellow-400'
          }`}
        >
          {data.signal === 'شراء' ? (
            <TrendingUp className="inline ml-2" />
          ) : (
            <TrendingDown className="inline ml-2" />
          )}
          {data.signal}
        </span>
      </div>
    </div>

    <div className="space-y-4">
      {data.targets.map((target, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
        >
          <div className="flex items-center">
            <Target className="ml-2" />
            <span>{target.type}</span>
          </div>
          <span className="text-green-400">
            ${target.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
          </span>
        </div>
      ))}

      <div className="flex items-center justify-between bg-red-900/30 p-3 rounded-lg">
        <span>وقف الخسارة</span>
        <span className="text-red-400">
          ${data.stopLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
        </span>
      </div>
    </div>
  </div>
);