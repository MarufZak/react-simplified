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
  const stringCallerStack = getCallerStack().join(".");

  // initial render
  if (states[stringCallerStack] === undefined) {
    const savedValue =
      typeof initialValue === "function" ? initialValue() : initialValue;
    states[stringCallerStack] = {
      cursor: 0,
      values: [savedValue],
    };
  }

  const currentCursor = states[stringCallerStack].cursor;
  const currentValues = states[stringCallerStack].values;

  if (currentValues[currentCursor] === undefined) {
    currentValues[currentCursor] = initialValue;
  }

  const performUpdate = (
    newValue: T extends (...args: any) => any ? ReturnType<T> : T,
  ) => {
    // clears all cursors, remove when diffing algorithm is made
    for (const state of Object.values(states)) {
      state.cursor = 0;
    }

    for (let i = 0; i < stateSubscribers.length; i++) {
      const subscriber = stateSubscribers[i];
      subscriber();
    }

    currentValues[currentCursor] = newValue;

    ReactDOM.render();
  };

  states[stringCallerStack].cursor++;

  return [currentValues[currentCursor], performUpdate] as const;
}

export function subscribeToStateChange(callback: StateSubscriberType) {
  stateSubscribers.push(callback);
}

export default useState;
