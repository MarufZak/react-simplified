import { subscribeToStateChange } from "./useState";
import { getCallerStack } from "./utils";

type ValueType = {
  current: any;
};

type CollectionType = {
  cursor: number;
  values: ValueType[];
};

const collections: Record<string, CollectionType> = {};

type ReturnType<T> = { current: T };
const useRef = <T>(initialValue: T): ReturnType<T> => {
  const stringCallerStack = getCallerStack().join(".");

  if (collections[stringCallerStack] === undefined) {
    collections[stringCallerStack] = {
      cursor: 0,
      values: [
        {
          current: initialValue,
        },
      ],
    };
  }

  const currentCursor = collections[stringCallerStack].cursor;
  const currentValues = collections[stringCallerStack].values;

  if (currentValues[currentCursor] === undefined) {
    currentValues[currentCursor] = {
      current: null,
    };
  }

  collections[stringCallerStack].cursor++;

  return currentValues[currentCursor];
};

subscribeToStateChange(() => {
  for (const collection of Object.values(collections)) {
    collection.cursor = 0;
  }
});

export default useRef;
