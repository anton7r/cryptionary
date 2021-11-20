import "./app.scss";
import { Form } from "./components/Form";
import { InfoPanel } from "./components/InfoPanel";
import { get } from "./api-wrapper";
import { Component, createSignal } from "solid-js";
import { hour, ms2Unix } from "./utils/time/time";
import SidePanel from "./components/SidePanel";
import { Router, Routes, Route } from "solid-app-router";
import LandingPage from "./components/LandingPage";
import { useCoinData } from "./store/coinDataStore";

const fetchData = (from: number, to: number) =>
  get(`coins/bitcoin/market_chart/range?vs_currency=eur&from=${from}&to=${to}`);

const RoutedApp = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/app" element={<App />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </>
  )
}

const App: Component = () => {
  const [start, setStart] = createSignal(0);
  const [, { updateStore }] = useCoinData();

  const formSubmit = async (from: number, to: number) => {
    setStart(from);
    const fetchedData = await fetchData(ms2Unix(from), ms2Unix(to + hour));
    updateStore(fetchedData);
  };

  return (
    <div class="app">
      <SidePanel>
        <h1>Cryptionary</h1>
        <p><span class="grayText">Powered by</span> <span class="greenText">CoinGecko</span></p>
        <Form submit={formSubmit} />
      </SidePanel>
      <InfoPanel startTime={start} />
    </div>
  );
};

export default RoutedApp;
