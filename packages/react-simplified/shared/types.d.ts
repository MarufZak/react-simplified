/// <reference types="react" />
export type VDOMType = string | number | null | undefined | boolean | ReactElementType;
export type HTMLTagElementType = keyof JSX.IntrinsicElements;
export interface ReactElementPropsType {
    children: VDOMType[];
    [key: string]: any;
}
export interface ReactElementType {
    type: HTMLTagElementType;
    props: ReactElementPropsType;
}
