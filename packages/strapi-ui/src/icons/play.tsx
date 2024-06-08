import React from "react-simplified";

const PlayIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 10 13" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 0.921343C0 0.524624 0.439868 0.285914 0.772494 0.502121L9.35504 6.08078C9.65838 6.27795 9.65838 6.72205 9.35504 6.91922L0.772495 12.4979C0.439868 12.7141 0 12.4754 0 12.0787V0.921343Z"
      />
    </svg>
  );
};

export default PlayIcon;
