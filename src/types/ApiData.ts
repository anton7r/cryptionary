type StampedData = {
	stamp: number;
	value: number;
};

export type ApiData = {
	market_caps: StampedData[];
	prices: StampedData[];
	total_volumes: StampedData[];
};