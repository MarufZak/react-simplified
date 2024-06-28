import ReactDOM from "../dom/react-dom";
import type { ReturnValueType } from "../shared/types";
import componentRegistry from "./componentRegistry";
import { getCallerStack } from "./utils";

type StateType = {
  cursor: number;
  values: any[];
};
type StateSubscriberType = () => void;

type UpdaterFunctionType<T> = (
  newValue:
    | ReturnValueType<T>
    | ((currentValue: ReturnValueType<T>) => ReturnValueType<T>),
) => void;

const stateSubscribers: StateSubscriberType[] = [];
const states: Record<string, StateType> = {};

function useState<T>(
  initialValue?: T | (() => ReturnValueType<T>),
): readonly [ReturnValueType<T>, UpdaterFunctionType<T>] {
  const stringCallerStack = getCallerStack().join(".");

  // initial render
  if (states[stringCallerStack] === undefined) {
    const savedValue =
      initialValue instanceof Function ? initialValue() : initialValue;
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
    if (Object.is(currentValues[currentCursor], newValue)) {
      return;
    }

    // clears all cursors, remove when diffing algorithm is made
    for (const state of Object.values(states)) {
      state.cursor = 0;
    }

    for (let i = 0; i < stateSubscribers.length; i++) {
      const subscriber = stateSubscribers[i];
      subscriber();
    }

    currentValues[currentCursor] =
      newValue instanceof Function
        ? newValue(currentValues[currentCursor])
        : newValue;

    ReactDOM.render();
  };

  states[stringCallerStack].cursor++;

  return [currentValues[currentCursor], performUpdate];
}

componentRegistry.subscribeToStoreChange(
  (mountedComponents, unmountedComponents) => {
    for (let i = 0; i < unmountedComponents.length; i++) {
      const unmountedComponent = unmountedComponents[i];
      for (const key in states) {
        if (key === unmountedComponent) {
          delete states[key];
        }
      }
    }
  },
);

export function subscribeToStateChange(callback: StateSubscriberType) {
  stateSubscribers.push(callback);
}

export default useState;
