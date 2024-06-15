import ReactDOM from "../../../packages/react/dist/dom";
import App from "./App";
import "./globals.css";

const root = document.getElementById("root");
ReactDOM.registerRootComponent(App);
ReactDOM.registerRootElement(root);
ReactDOM.render();
