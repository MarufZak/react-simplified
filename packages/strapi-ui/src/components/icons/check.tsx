import React from "react-simplified";

const CheckIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM8.80192 10.7784L13.4653 6.25L15 7.70388L8.80192 13.6877L5.08301 10.2711L6.61683 8.81642L8.80192 10.7784Z"
      />
    </svg>
  );
};

export default CheckIcon;
