import { useContext } from "solid-js";
import { createStore } from "solid-js/store";
import type { CoinData, CoinStore } from "../types/CoinData";
import { createContextStore } from "./contextStore";

const [coindata, setCoinData] = createStore<CoinStore>({ priceHistory: [] });

const CoinDataContext = createContextStore(
    coindata,
    {
        updateStore(fetchedData: { market_caps: number[][]; prices: number[][]; total_volumes: number[][]; }) {
            const coinDatas: CoinData[] = [];

            for (let i = 0; i < fetchedData.market_caps.length; i++) {
                coinDatas.push({
                    stamp: fetchedData.market_caps[i][0],
                    marketCap: fetchedData.market_caps[i][1],
                    price: fetchedData.prices[i][1],
                    totalVolume: fetchedData.total_volumes[i][1],
                });
            }

            setCoinData("priceHistory", coinDatas);
        },
        isEmpty() {
            return coindata == null ||
                coindata.priceHistory == null ||
                coindata.priceHistory.length === 0;
        },
    }
);

export const CoinDataProvider = CoinDataContext.Provider;

export function useCoinData() { return useContext(CoinDataContext.Context); }