import eventRegistry from "../dom/eventRegistry";
import ReactDOM from "../dom/react-dom";
import type { ReturnValueType } from "../shared/types";
import componentRegistry from "./componentRegistry";
import { getCallerStack } from "./utils";

type StateType = {
  cursor: number;
  values: {
    value: any;
    updateQueue: any[];
  }[];
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
      values: [
        {
          updateQueue: [],
          value: savedValue,
        },
      ],
    };
  }

  const currentCursor = states[stringCallerStack].cursor;
  const currentValues = states[stringCallerStack].values;

  if (currentValues[currentCursor] === undefined) {
    currentValues[currentCursor] = {
      value: initialValue,
      updateQueue: [],
    };
  }

  const currentUpdateQueue = currentValues[currentCursor].updateQueue;

  const performUpdate: UpdaterFunctionType<T> = (newValue) => {
    if (Object.is(currentValues[currentCursor].value, newValue)) {
      return;
    }

    for (const state of Object.values(states)) {
      state.cursor = 0;
    }

    for (let i = 0; i < stateSubscribers.length; i++) {
      const subscriber = stateSubscribers[i];
      subscriber();
    }

    // for batching
    const latestValue =
      currentUpdateQueue.at(-1) || currentValues[currentCursor].value;
    const queueItem =
      newValue instanceof Function ? newValue(latestValue) : newValue;
    currentUpdateQueue.push(queueItem);
  };

  states[stringCallerStack].cursor++;

  return [currentValues[currentCursor].value, performUpdate];
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

export function flushStateUpdates() {
  for (const key in states) {
    for (let i = 0; i < states[key].values.length; i++) {
      const state = states[key].values[i];
      // prevent from falsy undefined assignment
      if (state.updateQueue.length === 0) {
        continue;
      }

      state.value = state.updateQueue.at(-1);
      state.updateQueue = [];
    }
  }
  eventRegistry.clearEventRegistry();
  ReactDOM.render();
}

export default useState;
