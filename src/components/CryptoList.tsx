import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  selectedPair: string;
  onSelect: (pair: string) => void;
}

const CRYPTO_PAIRS = [
  'BTC/USDT', 'ETH/USDT', 'NOT/USDT', 'NEIRO/USDT', 'APE/USDT',
  'TURBO/USDT', 'ATM/USDT', 'DOT/USDT', 'SYS/USDT', '1MBABYDOGE/USDT',
  'GALA/USDT', 'SOL/USDT', 'TRX/USDT', 'BAL/USDT', 'ALPACA/USDT',
  'ALPHA/USDT', 'WLD/USDT', 'BNT/USDT', 'ZK/USDT', 'DEXE/USDT',
  'HMSTR/USDT', 'DOGE/USDT', 'DOGS/USDT', 'SUI/USDT', 'ATOM/USDT',
  'AVA/USDT', 'AXS/USDT', 'AVAX/USDT', 'BAKE/USDT', 'HOT/USDT',
  'KAVA/USDT', 'MASK/USDT', 'SHIB/USDT', 'STORJ/USDT', 'SUSHI/USDT',
  'UNI/USDT', 'XRP/USDT', 'BNB/USDT', 'PEOPLE/USDT', 'ASTR/USDT',
  'APT/USDT', 'PEPE/USDT', 'AST/USDT', 'ARK/USDT', 'MEME/USDT'
];

export const CryptoList: React.FC<Props> = ({ selectedPair, onSelect }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPairs = CRYPTO_PAIRS.filter(pair =>
    pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="بحث عن عملة..."
          className="w-full bg-gray-700 text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          dir="rtl"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
      </div>
      
      <div className="h-[600px] overflow-y-auto space-y-2 custom-scrollbar">
        {filteredPairs.map((pair) => (
          <button
            key={pair}
            onClick={() => onSelect(pair)}
            className={`w-full text-right py-3 px-4 rounded-lg transition-colors ${
              selectedPair === pair
                ? 'bg-green-500/20 text-green-400'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {pair}
          </button>
        ))}
      </div>
    </div>
  );
}