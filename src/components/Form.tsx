import { Component, createSignal } from "solid-js";

type FormProps = {
    submit: (start: number, end: number) => void;
}

const nanoToUnix = (nanoTime: number): number =>  nanoTime / 1000;

const Form: Component<FormProps> = (props: FormProps) => {
    const [start, setStart] = createSignal(0);
    const [end, setEnd] = createSignal(0);

    const startOnChange = (e) => {
        setStart(nanoToUnix(e.target.valueAsNumber));
    }

    const endOnChange = (e) => {
        setEnd(nanoToUnix(e.target.valueAsNumber));
    }

    const buttonClick = () => {
        props.submit(start(), end());
    }

    return (
        <div class="form">

            <label>Start date</label>
            <input
                type="date"
                name="start-date"
                id="start-date"
                value={start()}
                onChange={startOnChange}
            />

            <label>End date</label>
            <input
                type="date"
                name="start-date"
                id="start-date"
                value={end()}
                onChange={endOnChange}
            />

            <button
                onClick={buttonClick}
            >Fetch data</button>
        </div>
    )
}

export { Form }