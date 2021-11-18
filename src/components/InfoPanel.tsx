import { Show } from "solid-js";
import type { CoinStore } from "../types/CoinData";
import { TimeMachine } from "./TimeMachine";
import { LongestBear } from "./LongestBear";
import { HighestVolume } from "./HighestVolume";

type InfoPanelProps = {
  store: CoinStore;
  startTime: () => number;
};

const isEmpty = (store: CoinStore) =>
  store == null ||
  store.priceHistory == null ||
  store.priceHistory.length === 0;

const InfoPanel = (props: InfoPanelProps) => {
  return (
    <div class="infoPanel">
      <Show
        when={!isEmpty(props.store)}
        fallback={
          <>
            <h2>Fill the adjacent form, please</h2>
            <p>So that you could see some information here.</p>
          </>
        }
      >
        <LongestBear store={props.store} startTime={props.startTime} />
        <HighestVolume store={props.store} startTime={props.startTime} />
        <TimeMachine store={props.store} startTime={props.startTime} />
      </Show>
    </div>
  );
};

export { InfoPanel };
export type { InfoPanelProps }