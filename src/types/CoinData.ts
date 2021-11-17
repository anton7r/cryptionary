export type CoinData = {
  stamp: number;
  marketCap: number;
  price: number;
  totalVolume: number;
};

export type CoinStore = {
  priceHistory: CoinData[];
};
