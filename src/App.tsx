import "./app.scss";
import { Form } from './components/Form';
import { InfoPane } from "./components/InfoPane";
import { get } from './api-wrapper'
import type { ApiData } from "./types/ApiData";
import { createStore } from "solid-js/store";

const fetchData = (from: number, to: number) => get(`coins/bitcoin/market_chart/range?vs_currency=eur&from=${from}&to=${to}`);

const App = () => {

  const [store, setStore] = createStore<ApiData>({ market_caps: [], prices: [], total_volumes: [] })

  const formSubmit = async (from: number, to: number) => {
    setStore(await fetchData(from, to));
    console.log(store);
  }

  return (
    <>
      <h1>Cryptionary</h1>
      <Form submit={formSubmit} />
      <InfoPane store={store} />
    </>
  );
}

export default App;