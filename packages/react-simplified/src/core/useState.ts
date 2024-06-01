import ReactDOM from "../dom/react-dom";

const states: any[] = [];

function useState<T = any>(initialValue: T) {
  if (states[0] === undefined) {
    // initial render
    states[0] = initialValue;
  }

  const performUpdate = (newValue: T) => {
    states[0] = newValue;

    const root = ReactDOM.render();
    document.querySelector("#root")!.innerHTML = "";
    document.querySelector("#root")!.appendChild(root!);
  };

  return [states[0], performUpdate] as const;
}

export default useState;
