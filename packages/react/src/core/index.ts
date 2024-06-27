import { Fragment, createElement } from "./jsx-runtime";
import useEffect from "./useEffect";
import useId from "./useId";
import useRef from "./useRef";
import useState from "./useState";
import type ReactTypes from "../types";
import useLayoutEffect from "./useLayoutEffect";

const React = {
  createElement,
  Fragment,
  useState,
  useId,
  useRef,
  useEffect,
  useLayoutEffect,
};

export { type ReactTypes as React };

export default React;
