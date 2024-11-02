import componentRegistry from "./componentRegistry";
import { subscribeToStateChange } from "./useState";
import { compareArrays, getCallerStack } from "./utils";

type DependenciesType = any[];
type CallbackType = () => void | (() => any);
type CleanupFunctionType = (() => any) | void;

type EffectType = {
  dependencies: DependenciesType;
  cleanupFunction: CleanupFunctionType;
};

type StoreItemType = {
  cursor: number;
  layoutEffects: EffectType[];
};

const layoutEffectsStore: Record<string, StoreItemType> = {};

const useLayoutEffect = (
  callback: CallbackType,
  dependencies: DependenciesType,
): void => {
  const callerStack = getCallerStack().join(".");

  if (layoutEffectsStore[callerStack] === undefined) {
    layoutEffectsStore[callerStack] = {
      cursor: 0,
      layoutEffects: [
        {
          cleanupFunction: callback(),
          dependencies,
        },
      ],
    };
  }

  const currentEffects = layoutEffectsStore[callerStack].layoutEffects;
  const currentCursor = layoutEffectsStore[callerStack].cursor;

  if (currentEffects[currentCursor] === undefined) {
    currentEffects[currentCursor] = {
      cleanupFunction: callback(),
      dependencies,
    };
  }

  if (currentEffects[currentCursor]) {
    const depsSame = compareArrays(
      currentEffects[currentCursor].dependencies,
      dependencies,
    );

    if (!depsSame) {
      currentEffects[currentCursor].cleanupFunction = callback();
    }
  }

  layoutEffectsStore[callerStack].cursor++;
};

subscribeToStateChange(() => {
  for (const item of Object.values(layoutEffectsStore)) {
    item.cursor = 0;
  }
});

componentRegistry.subscribeToStoreChange((_, unmountedComponents) => {
  for (const key in layoutEffectsStore) {
    if (unmountedComponents.includes(key) === false) {
      continue;
    }

    for (let i = 0; i < layoutEffectsStore[key].layoutEffects.length; i++) {
      const cleanupFunction =
        layoutEffectsStore[key].layoutEffects[i].cleanupFunction;
      if (typeof cleanupFunction === "function") {
        cleanupFunction();
      }
    }
    delete layoutEffectsStore[key];
  }
});

export default useLayoutEffect;
