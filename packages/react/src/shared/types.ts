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
  key?: string | number | bigint | null | undefined;
  experimental__patching?: boolean;
  [key: string]: any;
}

export interface ReactElementType {
  type: HTMLTagElementType | "fragment";
  props: ReactElementPropsType;
}

export type ReturnValueType<T> = T extends () => infer K ? K : T;
