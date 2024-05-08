import type { REACT_ELEMENT_TYPES } from "./element-types";

// TODO: consider unknown values
export type VDOMType = string | number | ReactElementType;

export type HTMLTagElementType = keyof JSX.IntrinsicElements;

export interface ReactElementType {
  $$typeof: REACT_ELEMENT_TYPES;
  type: HTMLTagElementType;
  props: Record<string, VDOMType[]>;
}
