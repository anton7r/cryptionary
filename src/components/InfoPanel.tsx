import { Show } from "solid-js";
import type { CoinData } from "../types/CoinData";
import { day } from '../time/time';

type InfoPanelProps = {
    store: CoinData[];
    startTime: () => number;
}

const isEmpty = (store: CoinData[]) => store == null || store.length === 0;

const longestBear = (prices: CoinData[], startTime: number): number => {
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
    
    const filteredPrices: CoinData[] = [];

    let expectedTime = startTime;
    let closest = -Number.MAX_VALUE;
    for(let i = 0; i < prices.length; i++) {
        const delta = prices[i].stamp - expectedTime;
        if(delta >= 0) {
            //console.log(delta);
            filteredPrices.push(prices[Math.abs(closest) > Math.abs(delta) ? (i) : (i - 1)]);
            expectedTime += day;
            closest = -Number.MAX_VALUE;
        } else {
            closest = delta;
        }
    }

    //console.log(filteredPrices);

    let max = 0;
    let currentTrend = 0;

    for(let i = 1; i < filteredPrices.length; i++) {
        const previous = filteredPrices[i - 1].price;
        const current = filteredPrices[i].price;

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
                <p>The longest bearish downward trend in the measurement period was { longestBear(props.store, props.startTime()) } days.</p>


            </Show>
        </div>
    )
}

export { InfoPanel }