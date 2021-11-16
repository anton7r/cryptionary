import { Component, createSignal } from "solid-js";
import { stringifyDate, ms2Unix } from "../time/time";

type FormProps = {
    submit: (start: number, end: number) => void;
}

const week = (7 * 24 * 60 * 60 * 1000);

const Form: Component<FormProps> = (props: FormProps) => {
    const [start, setStart] = createSignal(0);
    const [end, setEnd] = createSignal(0);

    const startOnChange = (e) => {
        setStart(e.target.valueAsNumber)
        const startTime = start();

        if(startTime >= end()) {
            setEnd(startTime + week)
        }
    };

    const endOnChange = (e) => {
        setEnd(e.target.valueAsNumber);
        const endTime = end();

        if(endTime <= start()) {
            setStart(endTime - week)
        }
    }

    const buttonClick = () => {
        props.submit(ms2Unix(start()), ms2Unix(end()))
    };

    return (
        <div class="form">

            <label>Start date</label>
            <input
                type="date"
                name="start-date"
                id="start-date"
                value={stringifyDate(start())}
                onChange={startOnChange}
            />

            <label>End date</label>
            <input
                type="date"
                name="start-date"
                id="start-date"
                value={stringifyDate(end())}
                onChange={endOnChange}
            />

            <button
                onClick={buttonClick}
            >Fetch data</button>
        </div>
    )
}

export { Form }