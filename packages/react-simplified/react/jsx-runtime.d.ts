import type { HTMLTagElementType, ReactElementType, VDOMType } from "../shared/types";
export declare function createElement(type: HTMLTagElementType | Function, attributes: ReactElementType["props"], ...rest: VDOMType[]): ReactElementType;
