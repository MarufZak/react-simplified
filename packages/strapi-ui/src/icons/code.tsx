import React from "react-simplified";

const CodeIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 16 11" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.14278 7.65856V10.5708L15.999 6.69265V3.87815L9.14278 -3.00045e-05V2.90564L13.3022 5.2854L9.14278 7.65856ZM6.85625 7.65859L2.69679 5.28543L6.85625 2.90567V0L0 3.87686V6.69268L6.85625 10.5709V7.65859Z"
      />
    </svg>
  );
};

export default CodeIcon;
