import { subscribeToStateChange } from "./useState";
import { getCallerStack } from "./utils";

type CollectionType = {
  cursor: number;
  values: any[];
};

const collections: Record<string, CollectionType> = {};

const useId = () => {
  const stringCallerStack = getCallerStack().join(".");

  if (collections[stringCallerStack] === undefined) {
    collections[stringCallerStack] = {
      cursor: 0,
      values: [crypto.randomUUID()],
    };
  }

  const currentCursor = collections[stringCallerStack].cursor;
  const currentValues = collections[stringCallerStack].values;

  if (currentValues[currentCursor] === undefined) {
    currentValues[currentCursor] = crypto.randomUUID();
  }

  collections[stringCallerStack].cursor++;

  return currentValues[currentCursor];
};

// reset cursors so there are properly reset on rerender
subscribeToStateChange(() => {
  for (const collection of Object.values(collections)) {
    collection.cursor = 0;
  }
});

export default useId;
