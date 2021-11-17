import { Show } from "solid-js";
import type { CoinData, CoinStore } from "../types/CoinData";
import { day, ordinalMonth, ordinalNumber } from "../time/time";

type InfoPanelProps = {
  store: CoinStore;
  startTime: () => number;
};

const isEmpty = (store: CoinStore) =>
  store == null ||
  store.priceHistory == null ||
  store.priceHistory.length === 0;

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
  )} ${date.getFullYear()} and it peaked at € ${highestVolume.volume}.`;
};

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

  // console.log("low points: " + lowPoints.length);
  // console.log("high points: " + highPoints.length);

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
        const { filteredArr, highest: newHighest } = getHighest(filteredHigh,lowPoint.stamp);
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
    return `Best time to buy would have been ${buyNSell.buy.stamp} and the best time to sell would have been ${buyNSell.sell.stamp} and the profit multiplier would have been ${buyNSell.profitMultip}`;
  }

  return "There were no possibilities to make a profit from buying and selling during the measurement period.";
};

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
        <p>
          The longest bearish downward trend in the measurement period was{" "}
          {longestBear(props.store.priceHistory, props.startTime())} days.
        </p>

        <h2>Highest volume</h2>
        <p>{highestVolume(props.store.priceHistory, props.startTime())}</p>

        <h2>Time machine</h2>
        <p>{timeMachine(props.store.priceHistory)}</p>
      </Show>
    </div>
  );
};

export { InfoPanel };
