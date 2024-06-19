type ComponentType = Function;
type StoreType = Record<string, ComponentType[]>;

class ComponentRegistry {
  private store: StoreType = {};

  registerComponent(
    name: string,
    component: ComponentType,
    index: number = this.store[name]?.length || 0,
  ) {
    if (Object.keys(this.store).includes(name) === false) {
      this.store[name] = [];
    }
    this.store[name][index] = component;
  }

  hasComponent(name: string) {
    console.log({ store: this.store });
    return Boolean(this.store[name]);
  }

  resetStore() {
    this.store = {};
  }
}

const componentRegistry = new ComponentRegistry();
export default componentRegistry;
