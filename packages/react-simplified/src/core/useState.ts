import ReactDOM from "../dom/react-dom";
import { getCallerStack } from "./utils";

type StateType = {
  cursor: number;
  values: any[];
};
type StateSubscriberType = () => void;

const stateSubscribers: StateSubscriberType[] = [];
const states: Record<string, StateType> = {};

function useState<T = any>(initialValue: T) {
  const stringCallerStack = getCallerStack()
    // makes states stale on first update if exists in stack
    .filter((item) => item !== "performUpdate")
    .join(".");

  if (states[stringCallerStack] === undefined) {
    // initial render
    states[stringCallerStack] = {
      cursor: 0,
      values: [initialValue],
    };
  }

  const currentCursor = states[stringCallerStack].cursor;
  const currentValues = states[stringCallerStack].values;

  if (currentValues[currentCursor] === undefined) {
    currentValues[currentCursor] = initialValue;
  }

  const performUpdate = (newValue: T) => {
    // clears all cursors, remove when diffing algorithm is made
    for (const state of Object.values(states)) {
      state.cursor = 0;
    }

    for (let i = 0; i < stateSubscribers.length; i++) {
      const subscriber = stateSubscribers[i];
      subscriber();
    }

    currentValues[currentCursor] = newValue;

    const root = ReactDOM.render();
    if (root) {
      ReactDOM.commit(root);
    }
  };

  states[stringCallerStack].cursor++;

  return [currentValues[currentCursor], performUpdate] as const;
}

export function subscribeToStateChange(callback: StateSubscriberType) {
  stateSubscribers.push(callback);
}

export default useState;
