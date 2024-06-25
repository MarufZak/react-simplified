import { Fragment, createElement } from "./jsx-runtime";
import useEffect from "./useEffect";
import useId from "./useId";
import useRef from "./useRef";
import useState from "./useState";
// 'type' prevents importing react in the bundle
import type * as ReactTypes from "react";

const React = {
  createElement,
  Fragment,
  useState,
  useId,
  useRef,
  useEffect,
};

export type {
  // Use a single re-export to get all types under one alias
  ReactTypes as React,
};

export default React;
