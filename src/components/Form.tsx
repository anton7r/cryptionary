import { Component, createSignal } from "solid-js";
import { stringifyDate, hour, day } from "../utils/time/time";

type FormProps = {
  submit: (start: number, end: number) => void;
};

const Form: Component<FormProps> = (props: FormProps) => {
  const [start, setStart] = createSignal(0);
  const [end, setEnd] = createSignal(0);

  const updateStart = (value: number) => {
    setStart(value);
    const newEnd = value + day;
    if (newEnd >= end()) {
      setEnd(newEnd);
    }
  };

  const updateEnd = (value: number) => {
    setEnd(value);
    const newStart = value - day;
    if (newStart <= start()) {
      setStart(newStart);
    }
  };

  updateStart(Date.now() - 3 * day);

  const startOnChange = (e) => updateStart(e.target.valueAsNumber);
  const endOnChange = (e) => updateEnd(e.target.valueAsNumber);

  const buttonClick = () => {
    props.submit(start(), end() + hour);
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

      <button onClick={buttonClick}>Fetch data</button>
    </div>
  );
};

export { Form };
