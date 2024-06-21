import type { ReactElementPropsType } from "../shared/types";

type ComponentType = Function;
type StoreItemType = Record<string, ComponentType>;
type StoreType = Record<string, StoreItemType>;

// keys in components should be unique for
// same components in component scope. Meaning
// it doesn't need to be global across application,
// just in one component. If one key is not provided,
// but for others key is provided, this is counted as unique.

class ComponentRegistry {
  private store: StoreType = {};

  registerComponent(
    name: string,
    component: ComponentType,
    key: ReactElementPropsType["key"] = "default",
  ) {
    const storeKey = key === null ? "default" : key.toString();
    if (this.store[name] && this.store[name][storeKey]) {
      // TODO: check for dev and prod env
      throw new Error("Found same components with same keys");
    }

    if (this.store[name] === undefined) {
      this.store[name] = {};
    }

    this.store[name][storeKey] = component;
  }

  hasComponent(name: string, key: ReactElementPropsType["key"] = "default") {
    const storeKey = key === null ? "default" : key.toString();
    return Boolean(this.store[name]) && Boolean(this.store[name][storeKey]);
  }

  resetStore() {
    this.store = {};
  }
}

const componentRegistry = new ComponentRegistry();
export default componentRegistry;
