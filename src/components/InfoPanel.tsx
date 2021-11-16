import { Show } from "solid-js";
import type { ApiData, StampedData } from "../types/ApiData";
import { day } from '../time/time';

type InfoPanelProps = {
    store: ApiData;
    startTime: () => number;
}

const isEmpty = (store: ApiData) => store.market_caps == null || store.market_caps.length === 0;

const longestBear = (prices: StampedData[], startTime: number): number => {
    /*
    let lastDay = 0;
    prices.filter((stamped) => {
        const cond = stamped.stamp >= (lastDay + day);
        if(cond) {
            lastDay = stamped.stamp;
        }
        return cond;
    })
    */
    
    const filteredPrices: StampedData[] = [];

    let expectedTime = startTime;
    let closest = -Number.MAX_VALUE;
    for(let i = 0; i < prices.length; i++) {
        const delta = prices[i].stamp - expectedTime;
        if(delta >= 0) {
            console.log(delta);
            filteredPrices.push(prices[Math.abs(closest) > Math.abs(delta) ? (i) : (i - 1)]);
            expectedTime += day;
            closest = -Number.MAX_VALUE;
        } else {
            closest = delta;
        }
    }

    console.log(filteredPrices);

    let max = 0;
    let currentTrend = 0;

    for(let i = 1; i < filteredPrices.length; i++) {
        const previous = filteredPrices[i - 1].value;
        const current = filteredPrices[i].value;

        if(current < previous) {
            currentTrend++;
        } else {
            max = Math.max(max, currentTrend);
            currentTrend = 0;
        }
    }

    return Math.max(max, currentTrend);
}

const InfoPanel = (props: InfoPanelProps) => {
    return (
        <div class="infoPane">
            <Show
                when={!isEmpty(props.store)}
                fallback={
                    <>
                        <h2>Here you are going to see useful info</h2>
                        <p>... as long as you fill the adjacent form</p>
                    </>
                }
            >
                <h2>Longest bearish downward trend</h2>
                <p>The longest bearish downward trend in the measurement period was { longestBear(props.store.prices, props.startTime()) } days.</p>


            </Show>
        </div>
    )
}

export { InfoPanel }