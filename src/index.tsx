import { render } from "solid-js/web";
import RoutedApp from "./App";
import { CoinDataProvider } from "./store/coinDataStore";

const target = document.body;

target.removeChild(target.children[0]);
render(() => (
    <CoinDataProvider>
        <RoutedApp />
    </CoinDataProvider>
), target);
