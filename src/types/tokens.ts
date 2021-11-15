type Token = {
    tag: string;
    name: string;
}

type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};

type Tokens = OptionsFlags<Token>;

const tokens: Tokens = {
    btc: {
        tag: "btc",
        name: "Bitcoin"
    }
}

export { tokens }