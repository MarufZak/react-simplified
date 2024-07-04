import React from "@marufzak/react";

const StarIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 9.49945L2.29212 11.5L3.12013 7.48268L0 4.70177L4.21992 4.21937L6 0.5L7.78008 4.21937L12 4.70177L8.87987 7.48268L9.70788 11.5L6 9.49945Z" />
    </svg>
  );
};

export default StarIcon;
