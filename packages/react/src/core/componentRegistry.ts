import { ComponentError } from "../shared/errors";
import type { ReactElementPropsType } from "../shared/types";
import { transformStorePaths } from "./utils";

export type StoreType = Record<string, string[]>;
type ComponentRegistryStateType = "pending" | "completed";
type SubscriberType = (
  mountedComponents: string[],
  unmountedComponents: string[],
) => any;

// keys in components should be unique for
// same components in component scope. Meaning
// it doesn't need to be global across application,
// just in one component. If one key is not provided,
// but for others key is provided, this is counted as unique.

class ComponentRegistry {
  private staleStore: StoreType = {};
  private freshStore: StoreType = {};
  private state: ComponentRegistryStateType = "pending";
  private subscribers: SubscriberType[] = [];

  registerComponent(
    name: string,
    key: ReactElementPropsType["key"] = "default",
  ) {
    const storeKey = key === null ? "default" : key.toString();
    if (this.freshStore[name] && this.freshStore[name].includes(storeKey)) {
      throw new ComponentError("Found same components with same keys");
    }

    if (this.freshStore[name] === undefined) {
      this.freshStore[name] = [];
    }

    this.freshStore[name].push(storeKey);
  }

  hasComponent(name: string, key: ReactElementPropsType["key"] = "default") {
    const storeKey = key === null ? "default" : key.toString();
    return (
      Boolean(this.freshStore[name]) && this.freshStore[name].includes(storeKey)
    );
  }

  setComponentRegistryState(newState: ComponentRegistryStateType) {
    this.state = newState;

    if (newState === "pending") {
      this.staleStore = structuredClone(this.freshStore);
      this.freshStore = {};
      return;
    }

    const staleOuterKeys = Object.keys(this.staleStore);
    const freshOuterKeys = Object.keys(this.freshStore);

    const mountedComponentsKeys = freshOuterKeys.filter((freshOuterKey) => {
      return (
        staleOuterKeys.includes(freshOuterKey) === false ||
        this.freshStore[freshOuterKey].length >
          this.staleStore[freshOuterKey]?.length
      );
    });
    const unmountedComponentsKeys = staleOuterKeys.filter((staleOuterKey) => {
      return (
        freshOuterKeys.includes(staleOuterKey) === false ||
        this.staleStore[staleOuterKey].length >
          this.freshStore[staleOuterKey]?.length
      );
    });

    const mountedComponents = transformStorePaths(
      this.freshStore,
      this.staleStore,
      mountedComponentsKeys,
    );
    const unmountedComponents = transformStorePaths(
      this.staleStore,
      this.freshStore,
      unmountedComponentsKeys,
    );

    for (let i = 0; i < this.subscribers.length; i++) {
      const subscriber = this.subscribers[i];
      subscriber(mountedComponents, unmountedComponents);
    }
  }

  subscribeToComponentStoreChange(callback: SubscriberType) {
    this.subscribers.push(callback);
  }
}

const componentRegistry = new ComponentRegistry();
export default componentRegistry;
