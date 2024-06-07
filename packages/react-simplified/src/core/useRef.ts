import { subscribeToStateChange } from "./useState";
import { getCallerStack } from "./utils";

type CollectionType = {
  cursor: number;
  values: any[];
};

const collections: Record<string, CollectionType> = {};

type ReturnType = { current: any };
const useRef = (): ReturnType => {
  const stringCallerStack = getCallerStack()
    .filter((item) => item !== "performUpdate")
    .join(".");

  if (collections[stringCallerStack] === undefined) {
    collections[stringCallerStack] = {
      cursor: 0,
      values: [],
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
