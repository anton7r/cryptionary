import { Show } from "solid-js";
import type { CoinData } from "../types/CoinData";
import { day, ordinalMonth, ordinalNumber } from '../time/time';

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

type VolumeData = {
    stamp: number;
    volume: number;
}

const highestVolume = (prices: CoinData[], startTime: number): string => {
    const volumes: VolumeData[] = [];

    let expectedTime = startTime;
    //let totalVolume = 0;
    for(let i = 0; i < prices.length; i++) {
        const delta = prices[i].stamp - expectedTime;
        if(delta >= 0) {
            //console.log(delta);
            volumes.push({stamp: expectedTime, volume: prices[i].totalVolume});
            expectedTime += day;
            //totalVolume = 0;
        }
        //totalVolume += prices[i].totalVolume;
    }

    let highestVolume: VolumeData = volumes[0];
    for(let i = 1; i < volumes.length; i++) {
        const data = volumes[i];
        if(highestVolume.volume < data.volume) {
            highestVolume = data;
        }
    }

    const date = new Date(highestVolume.stamp);

    return `The volume of bitcoin was at its peak during ${ordinalNumber(date.getDate())} of ${ordinalMonth(date.getMonth())} ${date.getFullYear()} and it peaked at € ${highestVolume.volume}.`;
}

const timeMachine = (prices: CoinData[], startTime: number): string => {

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

                <h2>Highest volume</h2>
                <p>{ highestVolume(props.store, props.startTime()) }</p>

                <h2>Time machine</h2>
                <p>{ timeMachine(props.store, props.startTime()) }</p>

            </Show>
        </div>
    )
}

export { InfoPanel }