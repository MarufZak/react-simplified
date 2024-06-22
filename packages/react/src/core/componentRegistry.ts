import type { ReactElementPropsType } from "../shared/types";

type StoreType = Record<string, string[]>;
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
      // TODO: check for dev and prod env
      throw new Error("Found same components with same keys");
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

    console.log({
      freshStore: this.freshStore,
      staleStore: this.staleStore,
    });

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

    console.log({
      mountedComponentsKeys,
      unmountedComponentsKeys,
    });

    const mountedComponents: string[] = [];
    const unmountedComponents: string[] = [];

    for (let i = 0; i < mountedComponentsKeys.length; i++) {
      const mountedComponentKey = mountedComponentsKeys[i];
      const firstDotIndex = mountedComponentKey.indexOf(".");

      for (let x = 0; x < this.freshStore[mountedComponentKey].length; x++) {
        const mountedComponent = this.freshStore[mountedComponentKey][x];

        if (this.staleStore[mountedComponentKey]?.includes(mountedComponent)) {
          continue;
        }

        const pushItem = [
          mountedComponentKey.slice(0, firstDotIndex),
          `-${mountedComponent}`,
          mountedComponentKey.slice(firstDotIndex),
        ].join("");
        mountedComponents.push(pushItem);
      }
    }

    for (let i = 0; i < unmountedComponentsKeys.length; i++) {
      const unmountedComponentKey = unmountedComponentsKeys[i];
      const firstDotIndex = unmountedComponentKey.indexOf(".");

      for (let x = 0; x < this.staleStore[unmountedComponentKey].length; x++) {
        const unmountedComponent = this.staleStore[unmountedComponentKey][x];

        if (
          this.freshStore[unmountedComponentKey]?.includes(unmountedComponent)
        ) {
          continue;
        }

        const pushItem = [
          unmountedComponentKey.slice(0, firstDotIndex),
          `-${unmountedComponent}`,
          unmountedComponentKey.slice(firstDotIndex),
        ].join("");
        unmountedComponents.push(pushItem);
      }
    }

    for (let i = 0; i < this.subscribers.length; i++) {
      const subscriber = this.subscribers[i];
      subscriber(mountedComponents, unmountedComponents);
    }

    console.log({
      mountedComponents,
      unmountedComponents,
    });
  }

  subscribeToComponentStoreChange(callback: SubscriberType) {
    this.subscribers.push(callback);
  }
}

const componentRegistry = new ComponentRegistry();
export default componentRegistry;
