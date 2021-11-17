import type { CoinData } from "../types/CoinData";
import { stringifyDateTime } from "../utils/time/time";
import type { InfoPanelProps } from "./InfoPanel";

function get<Type>(arr: Type[], index: number): Type {
    const minMax = Math.max(Math.min(index, arr.length), 0);
    return index === minMax ? arr[index] : undefined;
}

type BuyNSell = {
    buy: CoinData;
    sell: CoinData;
    profitMultip: number;
};

type GetHighest = {
    filteredArr: CoinData[];
    highest: CoinData;
};

const printMultiplier = (multiplier: number) => {
    if (multiplier > 1) {
        const rel = ((multiplier - 1) * 100).toFixed(2);
        return "rose " + rel + "%";
    } else {
        const rel = ((1 - multiplier) * 100).toFixed(2);
        return "fell " + rel + "%";
    }
}

const getHighest = (arr: CoinData[], after: number): GetHighest => {
    arr = arr.filter((coinData) => coinData.stamp > after);
    return {
        filteredArr: arr,
        highest: arr.reduce((prev, curr) =>
            curr.price > prev.price ? curr : prev
        ),
    };
};

const timeMachine = (prices: CoinData[]): string => {
    // in order for a point to be called a low point the current value needs to be
    //lower than the previous value and lower than the next one and the opposite is true for highpoints
    let lowPoints: CoinData[] = [];
    let highPoints: CoinData[] = [];

    for (let i = 0; i < prices.length; i++) {
        const prevPrice = get(prices, i - 1);
        const currPrice = get(prices, i);
        const nextPrice = get(prices, i + 1);

        if (
            (prevPrice == undefined || prevPrice.price > currPrice.price) &&
            (nextPrice == undefined || nextPrice.price > currPrice.price)
        ) {
            lowPoints.push(currPrice);
        } else if (
            (prevPrice == undefined || prevPrice.price < currPrice.price) &&
            (nextPrice == undefined || nextPrice.price < currPrice.price)
        ) {
            highPoints.push(currPrice);
        }
    }

    const lastHigh = highPoints[highPoints.length - 1];
    //a for loop here could be faster, but would make code less readable
    lowPoints = lowPoints.filter((coinData) => lastHigh.stamp > coinData.stamp);
    const firstLow = highPoints[0];
    highPoints = highPoints.filter((coinData) => firstLow.stamp < coinData.stamp);

    console.log("low points: " + lowPoints.length);
    console.log("high points: " + highPoints.length);

    let { filteredArr: filteredHigh, highest } = getHighest(
        highPoints,
        firstLow.stamp
    );

    const buyNSell: BuyNSell = lowPoints
        .map((lowPoint): BuyNSell => {
            if (lowPoint.stamp >= highest.stamp) {
                const { filteredArr, highest: newHighest } = getHighest(filteredHigh, lowPoint.stamp);
                filteredHigh = filteredArr;
                highest = newHighest;
            }
            return {
                buy: lowPoint,
                sell: highest,
                profitMultip: highest.price / lowPoint.price,
            };
        })
        .reduce(
            (prev, curr) => (curr.profitMultip > prev.profitMultip ? curr : prev),
            { profitMultip: 0, buy: null, sell: null }
        );

    if (buyNSell != null) {
        return `Best time to buy would have been at ${stringifyDateTime(buyNSell.buy.stamp)} while trading for € ${buyNSell.buy.price.toFixed(2)} and the best time to sell would have been at ${stringifyDateTime(buyNSell.sell.stamp)} while trading for € ${buyNSell.sell.price.toFixed(2)} and the price of bitcoin ${printMultiplier(buyNSell.profitMultip)} in the timeframe.`;
    }

    return "There were no possibilities to make a profit from buying and selling during the measurement period.";
};

const TimeMachine = (props: InfoPanelProps) => {
    return (
        <>
            <h2>Time machine</h2>
            <p>{timeMachine(props.store.priceHistory)}</p>
        </>
    );
};

export { TimeMachine };
