import ReactDOM from "../dom/react-dom";

const states: any[] = [];
let cursor = 0;

function useState<T = any>(initialValue: T) {
  const currentCursor = cursor;

  if (states[currentCursor] === undefined) {
    // initial render
    states[currentCursor] = initialValue;
  }

  const performUpdate = (newValue: T) => {
    // all functions are re-executed, and since hooks are not in conditional statement, the order of executing the hooks is the same
    cursor = 0;

    states[currentCursor] = newValue;

    const root = ReactDOM.render();
    if (root) {
      ReactDOM.commit(root);
    }
  };

  cursor++;

  return [states[currentCursor], performUpdate] as const;
}

export default useState;
