import "./app.scss";
import { Form } from './components/Form';
import { get } from './api-wrapper'

const fetchData =  (from: number, to: number) => 
  get(`coins/bitcoin/market_chart/range?vs_currency=eur&from=${from}&to=${to}`);


const App = () => {

  const formSubmit = async (from: number, to: number) => {
    const data = await fetchData(from, to);
    console.log(data);
    console.log("FROM: " + from + " TO: " + to)
  }

  return (
    <>
      <h1>Cryptionary</h1>
      <Form submit={formSubmit}/>
    </>
  );
}

export default App;