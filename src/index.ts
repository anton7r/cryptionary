import { render } from "solid-js/web";
import RoutedApp from "./App";

const target = document.body;

target.removeChild(target.children[0]);
render(RoutedApp, target);
