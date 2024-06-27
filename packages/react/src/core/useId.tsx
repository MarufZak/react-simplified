import componentRegistry from "./componentRegistry";
import { subscribeToStateChange } from "./useState";
import { getCallerStack } from "./utils";

type CollectionType = {
  cursor: number;
  values: string[];
};

const collections: Record<string, CollectionType> = {};

const useId = () => {
  const stringCallerStack = getCallerStack().join(".");

  if (collections[stringCallerStack] === undefined) {
    collections[stringCallerStack] = {
      cursor: 0,
      values: [crypto.randomUUID().slice(0, 5)],
    };
  }

  const currentCursor = collections[stringCallerStack].cursor;
  const currentValues = collections[stringCallerStack].values;

  if (currentValues[currentCursor] === undefined) {
    currentValues[currentCursor] = crypto.randomUUID().slice(0, 5);
  }

  collections[stringCallerStack].cursor++;

  return currentValues[currentCursor];
};

subscribeToStateChange(() => {
  for (const collection of Object.values(collections)) {
    collection.cursor = 0;
  }
});

componentRegistry.subscribeToStoreChange(
  (mountedComponents, unmountedComponents) => {
    for (const key in collections) {
      if (unmountedComponents.includes(key)) {
        delete collections[key];
      }
    }
  },
);

export default useId;
