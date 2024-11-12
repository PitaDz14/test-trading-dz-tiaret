export interface Target {
  price: number;
  type: string;
}

export interface CryptoData {
  pair: string;
  price: number;
  signal: 'شراء' | 'انتظار';
  targets: Target[];
  stopLoss: number;
}