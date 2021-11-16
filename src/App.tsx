import "./app.scss";
import { Form } from './components/Form';
import { InfoPanel } from "./components/InfoPanel";
import { get } from './api-wrapper'
import type { ApiData, StampedData } from "./types/ApiData";
import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";
import { ms2Unix } from "./time/time";

const fetchData = (from: number, to: number) => get(`coins/bitcoin/market_chart/range?vs_currency=eur&from=${from}&to=${to}`);

const App = () => {
  const [start, setStart] = createSignal(0);

  const [store, setStore] = createStore<ApiData>({ market_caps: [], prices: [], total_volumes: [] })

  const updateStore = (fetchedData) => {
    const market_caps: StampedData[] = fetchedData.market_caps.map((data) => {
      return { stamp: data[0], value: data[1] }
    })

    const prices: StampedData[] = fetchedData.prices.map((data) => {
      return { stamp: data[0], value: data[1] };
    })

    const total_volumes: StampedData[] = fetchedData.total_volumes.map((data) => {
      return { stamp: data[0], value: data[1] };
    })

    setStore({
      market_caps: market_caps,
      prices: prices,
      total_volumes,
    });
  }

  const formSubmit = async (from: number, to: number) => {
    setStart(from);
    const fetchedData = await fetchData(ms2Unix(from), ms2Unix(to));
    updateStore(fetchedData);

    console.log(store);
  }

  return (
    <>
      <h1>Cryptionary</h1>
      <p>Powered by CoinGecko</p>
      <Form submit={formSubmit} />
      <InfoPanel store={store} startTime={start}/>
    </>
  );
}

export default App;