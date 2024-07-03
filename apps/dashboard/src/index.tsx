import ReactDOM from "@marufzak/react/dom";
import App from "./App";
import "./globals.css";

const root = document.getElementById("root");
ReactDOM.registerRootComponent(App);
ReactDOM.registerRootElement(root);
ReactDOM.render({
  experimental__withPatching: false,
});
