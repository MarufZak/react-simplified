import { subscribeToStateChange } from "./useState";
import { compareArrays, getCallerStack } from "./utils";
import componentRegistry from "./componentRegistry";

type DependenciesType = any[];
type CallbackType = () => void | (() => any);
type CleanupFunctionType = (() => any) | void;

type EffectType = {
  dependencies: DependenciesType;
  cleanupFunction: CleanupFunctionType;
};

type StoreItemType = {
  cursor: number;
  // there may be multiple useEffects in component,
  // that's why effects key is array type
  effects: EffectType[];
};

const effectsStore: Record<string, StoreItemType> = {};

const useEffect = (
  callback: CallbackType,
  dependencies: DependenciesType,
): void => {
  const callerStack = getCallerStack().join(".");

  if (effectsStore[callerStack] === undefined) {
    effectsStore[callerStack] = {
      cursor: 0,
      effects: [
        {
          cleanupFunction: callback(),
          dependencies,
        },
      ],
    };
  }

  // effects inside component, which invoked hook
  const currentEffects = effectsStore[callerStack].effects;
  const currentCursor = effectsStore[callerStack].cursor;

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
      // refresh the cleanup function
      currentEffects[currentCursor].cleanupFunction = callback();
    }
  }

  effectsStore[callerStack].cursor++;
};

subscribeToStateChange(() => {
  for (const item of Object.values(effectsStore)) {
    item.cursor = 0;
  }
});

componentRegistry.subscribeToComponentStoreChange(
  (mountedComponents, unmountedComponents) => {
    for (const key in effectsStore) {
      if (unmountedComponents.includes(key) === false) {
        continue;
      }

      for (let i = 0; i < effectsStore[key].effects.length; i++) {
        const cleanupFunction = effectsStore[key].effects[i].cleanupFunction;
        if (typeof cleanupFunction === "function") {
          cleanupFunction();
        }
      }
      delete effectsStore[key];
    }
  },
);

export default useEffect;
