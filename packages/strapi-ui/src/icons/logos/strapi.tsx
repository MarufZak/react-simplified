import React from "@marufzak/react";

const StrapiIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.4976 0H7.68018V8.0346H15.4632C15.7407 8.0346 15.9657 8.25934 15.9657 8.53657V16.3202H24.0001V0.501961C24.0001 0.224735 23.7751 0 23.4976 0Z"
      />
      <path
        opacity="0.404989"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.68006 0V8.0346H0.251752C0.0279794 8.0346 -0.0841489 7.76439 0.0739959 7.60624L7.68006 0ZM16.3945 23.9259C16.2363 24.0841 15.9656 23.9722 15.9656 23.7486V16.3203H24L16.3945 23.9259ZM15.7144 8.03461H7.68018V15.8183C7.68018 16.0955 7.90515 16.3202 8.18267 16.3202H15.9657V8.28559C15.9657 8.14698 15.8532 8.03461 15.7144 8.03461Z"
      />
    </svg>
  );
};

export default StrapiIcon;
