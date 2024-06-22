import ReactDOM from "../dom/react-dom";
import type { ExtractType } from "../shared/types";
import componentRegistry from "./componentRegistry";
import { getCallerStack } from "./utils";

type StateType = {
  cursor: number;
  values: any[];
};
type StateSubscriberType = () => void;

type ReturnValueType<T> = T extends () => infer K
  ? ExtractType<K>
  : ExtractType<T>;
type UpdaterFunctionType<T> = (
  newValue:
    | ReturnValueType<T>
    | ((currentValue: ReturnValueType<T>) => ReturnValueType<T>),
) => void;

const stateSubscribers: StateSubscriberType[] = [];
const states: Record<string, StateType> = {};

// TODO: when component unmounts, remove
//  states that belonged to this component
function useState<T = undefined>(
  initialValue?:
    | ReturnValueType<T>
    | ((currentValue: ReturnValueType<T>) => ReturnValueType<T>),
): [ReturnValueType<T>, UpdaterFunctionType<T>] {
  const stringCallerStack = getCallerStack().join(".");

  // initial render
  if (states[stringCallerStack] === undefined) {
    const savedValue =
      typeof initialValue === "function"
        ? (initialValue as Function)()
        : initialValue;
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

  const performUpdate: UpdaterFunctionType<T> = (newValue) => {
    // clears all cursors, remove when diffing algorithm is made
    for (const state of Object.values(states)) {
      state.cursor = 0;
    }

    for (let i = 0; i < stateSubscribers.length; i++) {
      const subscriber = stateSubscribers[i];
      subscriber();
    }

    currentValues[currentCursor] =
      typeof newValue === "function"
        ? (newValue as Function)(currentValues[currentCursor])
        : newValue;

    ReactDOM.render();
  };

  states[stringCallerStack].cursor++;

  console.log({ states });

  return [currentValues[currentCursor], performUpdate] as const;
}

export function subscribeToStateChange(callback: StateSubscriberType) {
  stateSubscribers.push(callback);
}

export default useState;
