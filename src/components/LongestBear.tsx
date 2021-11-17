import { day } from "../utils/time/time";
import type { CoinData } from "../types/CoinData";
import type { InfoPanelProps } from "./InfoPanel";

const longestBear = (prices: CoinData[], startTime: number): number => {
    const filteredPrices: CoinData[] = [];

    let expectedTime = startTime;
    let closest = -Number.MAX_VALUE;
    for (let i = 0; i < prices.length; i++) {
        const delta = prices[i].stamp - expectedTime;
        if (delta >= 0) {
            //console.log(delta);
            filteredPrices.push(
                prices[Math.abs(closest) > Math.abs(delta) ? i : i - 1]
            );
            expectedTime += day;
            closest = -Number.MAX_VALUE;
        } else {
            closest = delta;
        }
    }

    let max = 0;
    let currentTrend = 0;

    for (let i = 1; i < filteredPrices.length; i++) {
        const previous = filteredPrices[i - 1].price;
        const current = filteredPrices[i].price;

        if (current < previous) {
            currentTrend++;
        } else {
            max = Math.max(max, currentTrend);
            currentTrend = 0;
        }
    }

    return Math.max(max, currentTrend);
};

const LongestBear = (props: InfoPanelProps) => {
    return (
        <>
            <h2>Longest bearish downward trend</h2>
            <p>
                The longest bearish downward trend in the measurement period was
                {longestBear(props.store.priceHistory, props.startTime())} days.
            </p>
        </>
    );
};

export { LongestBear };