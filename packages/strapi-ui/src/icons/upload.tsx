import React from "@marufzak/react";

const UploadIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 10 13" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.78571 10.0748H4.21429V5.83949H0.486912C0.30816 5.83949 0.219187 5.62288 0.34633 5.49723L4.85942 1.03724C4.93733 0.960244 5.06267 0.960244 5.14058 1.03724L9.65367 5.49723C9.78081 5.62288 9.69184 5.83949 9.51309 5.83949H5.78571V10.0748ZM0.2 11.4866C0.089543 11.4866 0 11.5761 0 11.6866V12.6983C0 12.8088 0.0895429 12.8983 0.2 12.8983H9.8C9.91046 12.8983 10 12.8088 10 12.6983V11.6866C10 11.5761 9.91046 11.4866 9.8 11.4866H0.2Z"
      />
    </svg>
  );
};

export default UploadIcon;
