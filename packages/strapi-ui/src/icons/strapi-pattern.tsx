import React from "@marufzak/react";

const StrapiPatternIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clip-path="url(#clip0_15301_12320)">
        <rect width="64" height="64" rx="6" fill="#DAD9FF" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M40 0H60C48.9543 0 40 8.9543 40 20V0ZM60 40H40V20C40 31.0457 48.9543 40 60 40ZM80 20V40H60C71.0457 40 80 31.0457 80 20ZM80 20V0H60C71.0457 0 80 8.9543 80 20ZM60 28C64.4183 28 68 24.4183 68 20C68 15.5817 64.4183 12 60 12C55.5817 12 52 15.5817 52 20C52 24.4183 55.5817 28 60 28Z"
          fill="#7673FF"
        />
        <path
          d="M40 0C22.5 0 2.28882e-05 0 2.28882e-05 0C2.28882e-05 22.0914 2.28882e-05 21.75 0 40C22.0914 40 40 22.0914 40 0Z"
          fill="#4945FF"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M40 40H80V60H60V80H40V40Z"
          fill="#4945FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_15301_12320">
          <rect width="64" height="64" rx="6" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StrapiPatternIcon;
