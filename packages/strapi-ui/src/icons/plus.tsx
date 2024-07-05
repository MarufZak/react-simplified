import React from "@marufzak/react";

const PlusIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 6.65223C12 6.81792 11.8657 6.95223 11.7 6.95223H6.95223V11.7C6.95223 11.8657 6.81792 12 6.65223 12H5.34777C5.18209 12 5.04777 11.8657 5.04777 11.7V6.95223H0.3C0.134314 6.95223 0 6.81792 0 6.65223V5.34777C0 5.18209 0.134315 5.04777 0.3 5.04777H5.04777V0.3C5.04777 0.134314 5.18209 0 5.34777 0H6.65223C6.81792 0 6.95223 0.134315 6.95223 0.3V5.04777H11.7C11.8657 5.04777 12 5.18209 12 5.34777V6.65223Z" />
    </svg>
  );
};

export default PlusIcon;