export type VDOMType =
  | string
  | number
  | null
  | undefined
  | boolean
  | ReactElementType;

export type HTMLTagElementType = keyof JSX.IntrinsicElements;

export interface ReactElementPropsType {
  children: VDOMType[];
  [key: string]: any;
}

export interface ReactElementType {
  type: HTMLTagElementType;
  props: ReactElementPropsType;
}

// used to get type of literal types, for ex
// false => boolean;
export type ExtractType<T> = T extends boolean
  ? boolean
  : T extends string
    ? string
    : T extends number
      ? number
      : T;
