const BASE_URL = 'https://api.binance.com/api/v3';

export async function fetchCryptoPrice(symbol: string): Promise<number> {
  try {
    const cleanSymbol = symbol.replace('/', '').replace('1M', '1m');
    const response = await fetch(`${BASE_URL}/ticker/price?symbol=${cleanSymbol}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.error('Error fetching price:', error);
    throw error;
  }
}

export async function generateSignals(price: number): Promise<CryptoData['targets']> {
  return [
    { price: price * 1.01, type: 'هدف 1' },
    { price: price * 1.015, type: 'هدف 2' },
    { price: price * 1.02, type: 'هدف 3' }
  ];
}

export async function getCryptoData(pair: string): Promise<CryptoData> {
  const price = await fetchCryptoPrice(pair);
  const targets = await generateSignals(price);
  
  return {
    pair,
    price,
    signal: 'شراء',
    targets,
    stopLoss: price * 0.985 // 1.5% below current price
  };
}