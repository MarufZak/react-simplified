import type { ReactElementPropsType } from "../shared/types";

type ComponentType = Function;
type StoreItemType = Record<string, ComponentType>;
type StoreType = Record<string, StoreItemType>;

class ComponentRegistry {
  private store: StoreType = {};

  registerComponent(
    name: string,
    component: ComponentType,
    key: ReactElementPropsType["key"] = "default",
  ) {
    if (this.store[name] && this.store[name][key]) {
      // TODO: check for dev and prod
      throw new Error("Found same components with same keys");
    }

    if (this.store[name] === undefined) {
      this.store[name] = {};
    }

    this.store[name][key] = component;
  }

  hasComponent(name: string, key: ReactElementPropsType["key"] = "default") {
    return Boolean(this.store[name]) && Boolean(this.store[name][key]);
  }

  resetStore() {
    this.store = {};
  }
}

const componentRegistry = new ComponentRegistry();
export default componentRegistry;
