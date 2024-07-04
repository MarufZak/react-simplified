import { flushStateUpdates, subscribeToStateChange } from "./useState";
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

const subscribeToComponentRegistryComplete = (callback: Function) => {
  return componentRegistry.subscribeToStateChange((state) => {
    if (state === "completed") {
      return callback();
      // TODO: causing infinite loop
      // flushStateUpdates();
    }
  });
};

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
          cleanupFunction: undefined,
          dependencies,
        },
      ],
    };

    // refresh the cleanup function
    subscribeToComponentRegistryComplete(() => {
      effectsStore[callerStack].effects[0].cleanupFunction = callback();
    });
  }

  // effects inside component, which invoked hook
  const currentEffects = effectsStore[callerStack].effects;
  const currentCursor = effectsStore[callerStack].cursor;

  if (currentEffects[currentCursor] === undefined) {
    currentEffects[currentCursor] = {
      cleanupFunction: undefined,
      dependencies,
    };

    subscribeToComponentRegistryComplete(() => {
      currentEffects[currentCursor].cleanupFunction = callback();
    });
  }

  if (currentEffects[currentCursor]) {
    const depsSame = compareArrays(
      currentEffects[currentCursor].dependencies,
      dependencies,
    );

    if (!depsSame) {
      // refresh the cleanup function
      subscribeToComponentRegistryComplete(() => {
        currentEffects[currentCursor].cleanupFunction = callback();
        currentEffects[currentCursor].dependencies = dependencies;
      });
    }
  }

  effectsStore[callerStack].cursor++;
};

subscribeToStateChange(() => {
  for (const item of Object.values(effectsStore)) {
    item.cursor = 0;
  }
});

componentRegistry.subscribeToStoreChange(
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
