import React from "react-simplified";

interface Props extends React.ComponentProps<"svg"> {}

const EyeCloseIcon = (props: Props) => {
  return (
    <svg viewBox="0 0 16 13" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2.6987 2.5834L1.40181 1.28651C1.1406 1.0253 1.13809 0.604309 1.40025 0.342145C1.6606 0.0817952 2.08439 0.0834751 2.34462 0.3437L13.6552 11.6543C13.9164 11.9155 13.9189 12.3365 13.6568 12.5987C13.3964 12.859 12.9726 12.8573 12.7124 12.5971L10.9218 10.8065C10.0237 11.1476 9.04977 11.3323 7.99992 11.3323C5.61823 11.3323 3.62745 10.3818 2.02557 8.81041C1.46976 8.26517 1.00081 7.68219 0.614746 7.09818C0.380295 6.74353 0.22318 6.4623 0.140437 6.2906C0.0628298 6.12955 0.0635985 5.86685 0.140437 5.7074C0.22318 5.5357 0.380295 5.25447 0.614746 4.89981C1.00081 4.31581 1.46976 3.73283 2.02557 3.18759C2.24279 2.9745 2.46717 2.77283 2.6987 2.5834L2.6987 2.5834ZM9.72447 9.60917L8.69064 8.57534C8.47034 8.63426 8.2388 8.66567 7.99992 8.66567C6.52716 8.66567 5.33325 7.47176 5.33325 5.999C5.33325 5.76012 5.36466 5.52858 5.42357 5.30828L4.38974 4.27445C4.13985 4.79663 3.99992 5.38147 3.99992 5.999C3.99992 8.20814 5.79078 9.999 7.99992 9.999C8.61744 9.999 9.20229 9.85906 9.72447 9.60917ZM5.07805 1.19151C5.97616 0.85036 6.95006 0.665666 7.99992 0.665666C10.3816 0.665666 12.3724 1.61619 13.9743 3.18759C14.5301 3.73283 14.999 4.31581 15.3851 4.89981C15.6195 5.25447 15.7767 5.5357 15.8594 5.7074C15.937 5.86845 15.9362 6.13115 15.8594 6.2906C15.7767 6.4623 15.6195 6.74353 15.3851 7.09818C14.999 7.68219 14.5301 8.26517 13.9743 8.81041C13.757 9.0235 13.5327 9.22517 13.3011 9.4146L11.6101 7.72355C11.86 7.20137 11.9999 6.61653 11.9999 5.999C11.9999 3.78986 10.2091 1.999 7.99992 1.999C7.38239 1.999 6.79754 2.13894 6.27536 2.38883L5.07805 1.19151ZM7.30919 3.42266C7.52949 3.36374 7.76104 3.33233 7.99992 3.33233C9.47268 3.33233 10.6666 4.52624 10.6666 5.999C10.6666 6.23788 10.6352 6.46942 10.5763 6.68972L7.30919 3.42266Z" />
    </svg>
  );
};

export default EyeCloseIcon;
