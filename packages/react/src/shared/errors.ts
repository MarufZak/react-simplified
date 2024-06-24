declare global {}

export class InternalError extends Error {
  constructor(message: string) {
    if (__DEV__) {
      super(message);
      return;
    }

    super(`${message}\n
      If you encounter this error, please consider opening an issue at:
      https://github.com/MarufZak/react-simplified/issues`);
    this.name = "InternalError";
  }
}

export class ComponentError extends Error {
  constructor(message: string) {
    if (__DEV__) {
      super(message);
      return;
    }

    super(`${message}\n
            If you encounter this error, consider the following steps for debugging:\n
            1. Check if any repeated components have different keys. (Note that keys should be unique within the component scope, not globally across the application).
            2. Verify that the root element or root component is registered before rendering.\n
            If you still encounter this error after following the above steps, please consider opening an issue at: https://github.com/MarufZak/react-simplified/issues`);
    this.name = "ComponentError";
  }
}
