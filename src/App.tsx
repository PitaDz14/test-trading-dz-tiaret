import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { CryptoList } from './components/CryptoList';
import { SignalCard } from './components/SignalCard';
import { Footer } from './components/Footer';
import { CryptoData } from './types';
import { getCryptoData } from './services/binanceApi';

function App() {
  const [selectedPair, setSelectedPair] = useState<string>('BTC/USDT');
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: number;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCryptoData(selectedPair);
        setCryptoData(data);
      } catch (err) {
        setError('حدث خطأ في جلب البيانات');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    intervalId = window.setInterval(fetchData, 10000); // Update every 10 seconds

    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [selectedPair]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-green-400">
            محلل العملات الرقمية
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <CryptoList selectedPair={selectedPair} onSelect={setSelectedPair} />
            {error ? (
              <div className="bg-red-500/20 rounded-lg p-6 text-center">
                <p className="text-red-300">{error}</p>
              </div>
            ) : loading && !cryptoData ? (
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <p className="text-gray-400">جاري التحميل...</p>
              </div>
            ) : cryptoData ? (
              <SignalCard data={cryptoData} />
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default App;