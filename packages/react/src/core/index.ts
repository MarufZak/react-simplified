import type ReactTypes from "../types";
import { Fragment, createElement } from "./jsx-runtime";
import useEffect from "./useEffect";
import useId from "./useId";
import useLayoutEffect from "./useLayoutEffect";
import useRef from "./useRef";
import useState, { flushStateUpdates } from "./useState";

const React = {
  createElement,
  Fragment,
  useState,
  useId,
  useRef,
  useEffect,
  useLayoutEffect,
  flushStateUpdates,
};

export { type ReactTypes as React };

export default React;
