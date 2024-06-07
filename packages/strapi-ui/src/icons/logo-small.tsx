import React from "react-simplified";

const LogoSmallIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="4" fill="#4945FF" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.2789 9.3335H11.9434V20.0668L11.9435 20.0669V14.6176H17.0007C17.2139 14.6176 17.3868 14.7905 17.3868 15.0037V20.0669L22.665 20.0668V9.71958C22.665 9.50635 22.4922 9.3335 22.2789 9.3335Z"
        fill="white"
      />
      <path
        opacity="0.404989"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.9444 9.3335V14.6176H7.13171C6.95977 14.6176 6.87362 14.4098 6.99513 14.2881L11.9444 9.3335Z"
        fill="white"
      />
      <path
        opacity="0.404989"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.7173 25.0211C17.5957 25.1428 17.3877 25.0567 17.3877 24.8847V20.067H22.666L17.7173 25.0211Z"
        fill="white"
      />
      <path
        opacity="0.404989"
        d="M11.9434 14.6177H17.1936C17.3002 14.6177 17.3867 14.7041 17.3867 14.8107V20.0669H12.3294C12.1162 20.0669 11.9434 19.8941 11.9434 19.6808V14.6177Z"
        fill="white"
      />
    </svg>
  );
};

export default LogoSmallIcon;
