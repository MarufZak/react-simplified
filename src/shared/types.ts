import type { REACT_ELEMENT_TYPES } from "./element-types";

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
  $$typeof: REACT_ELEMENT_TYPES;
  type: HTMLTagElementType;
  props: ReactElementPropsType;
}
