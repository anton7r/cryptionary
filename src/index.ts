import { render } from "solid-js/web";
import App from "./App";

const target = document.body;

target.removeChild(target.children[0]);
render(App, target);
