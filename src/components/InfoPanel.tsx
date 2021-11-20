import { Show } from "solid-js";
import { TimeMachine } from "./TimeMachine";
import { LongestBear } from "./LongestBear";
import { HighestVolume } from "./HighestVolume";
import { useCoinData } from "../store/coinDataStore";

type InfoPanelProps = {
  startTime: () => number;
};

const InfoPanel = (props: InfoPanelProps) => {
  const [, { isEmpty } ] = useCoinData();
  
  return (
    <div class="infoPanel">
      <Show
        when={!isEmpty()}
        fallback={
          <>
            <h2>Fill the adjacent form, please</h2>
            <p>So that you could see some information here.</p>
          </>
        }
      >
        <LongestBear startTime={props.startTime} />
        <HighestVolume startTime={props.startTime} />
        <TimeMachine />
      </Show>
    </div>
  );
};

export { InfoPanel };
export type { InfoPanelProps }