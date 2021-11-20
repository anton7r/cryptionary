import { untrack } from "solid-js";
import { useCoinData } from "../store/coinDataStore";
import type { CoinData } from "../types/CoinData";
import { printLargeNumber } from "../utils/largenumbers/largeNumbers";
import { day, ordinalNumber, ordinalMonth } from "../utils/time/time";
import type { InfoPanelProps } from "./InfoPanel";

type VolumeData = {
    stamp: number;
    volume: number;
};

const highestVolume = (prices: CoinData[], startTime: number): string => {
    const volumes: VolumeData[] = [];

    let expectedTime = startTime;
    for (let i = 0; i < prices.length; i++) {
        const delta = prices[i].stamp - expectedTime;
        if (delta >= 0) {
            volumes.push({ stamp: expectedTime, volume: prices[i].totalVolume });
            expectedTime += day;
        }
    }

    let highestVolume: VolumeData = volumes[0];
    for (let i = 1; i < volumes.length; i++) {
        const data = volumes[i];
        if (highestVolume.volume < data.volume) {
            highestVolume = data;
        }
    }

    const date = new Date(highestVolume.stamp);

    return `The volume of bitcoin was at its peak during ${ordinalNumber(
        date.getDate()
    )} of ${ordinalMonth(
        date.getMonth()
    )} ${date.getFullYear()} and it peaked at € ${printLargeNumber(highestVolume.volume)}.`;
};


const HighestVolume = (props: InfoPanelProps) => {
    const [ coinData ] = useCoinData();
    
    return (
        <>
            <h2>Highest volume</h2>
            <p>{highestVolume(coinData.priceHistory, untrack(props.startTime))}</p>
        </>
    );
};

export { HighestVolume };