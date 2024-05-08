import React from "./react/index";
import ReactDOM from "./react-dom/index";

const Button = ({ children, ...props }: any) => {
  return <button {...props}>{children}</button>;
};

const App = () => {
  return [1, 2, 3, 4, 5].map((item) => {
    return <Button style="font-size: 36px; color: orange;">{item}</Button>;
  });
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
