import "./app.scss";
import { Form } from "./components/Form";
import { InfoPanel } from "./components/InfoPanel";
import { get } from "./api-wrapper";
import type { CoinData, CoinStore } from "./types/CoinData";
import { createStore } from "solid-js/store";
import { Component, createSignal } from "solid-js";
import { hour, ms2Unix } from "./utils/time/time";
import SidePanel from "./components/SidePanel";

const fetchData = (from: number, to: number) =>
  get(`coins/bitcoin/market_chart/range?vs_currency=eur&from=${from}&to=${to}`);

const App: Component = () => {
  const [start, setStart] = createSignal(0);
  const [store, setStore] = createStore<CoinStore>({ priceHistory: [] });

  const updateStore = (fetchedData) => {
    const coinDatas: CoinData[] = [];

    for (let i = 0; i < fetchedData.market_caps.length; i++) {
      coinDatas.push({
        stamp: fetchedData.market_caps[i][0],
        marketCap: fetchedData.market_caps[i][1],
        price: fetchedData.prices[i][1],
        totalVolume: fetchedData.total_volumes[i][1],
      });
    }

    setStore("priceHistory", coinDatas);
  };

  const formSubmit = async (from: number, to: number) => {
    setStart(from);
    const fetchedData = await fetchData(ms2Unix(from), ms2Unix(to + hour));
    updateStore(fetchedData);
  };

  return (
    <div class="app">
      <SidePanel>
        <h1>Cryptionary</h1>
        <p>Powered by CoinGecko</p>
        <Form submit={formSubmit} />
      </SidePanel>
      <InfoPanel store={store} startTime={start} />
    </div>
  );
};

export default App;
