import React from "react-simplified";

const WarningIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 0C4.48606 0 0 4.48606 0 10C0 15.5139 4.48606 20 10 20C15.5139 20 20 15.5139 20 10C20 4.48606 15.5139 0 10 0ZM10.9615 15.3803H9.03846V13.4572H10.9615V15.3803ZM10.7692 12.3077H9.23077L8.94231 4.61538H11.0577L10.7692 12.3077Z" />
    </svg>
  );
};

export default WarningIcon;
