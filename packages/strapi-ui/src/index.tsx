import React from "react-simplified";
import ReactDOM from "react-simplified/dom";
import App from "./App";
import "./globals.css";

const root = document.getElementById("root");

ReactDOM.registerRootComponent(App);
ReactDOM.createRoot(root).render(<App />);
