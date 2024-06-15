import React from "@marufzak/react";

const PuzzleIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.06005 0.467659L10.7849 2.19251L12.0306 0.946819C12.8654 0.112085 14.2187 0.112085 15.0534 0.946819C15.8882 1.78155 15.8882 3.13492 15.0534 3.96965L13.8078 5.21536L15.5321 6.93975C16.1179 7.52554 16.1179 8.47528 15.5322 9.06106L13.8079 10.7854L13.0379 10.0154C12.2032 9.18065 10.8499 9.18065 10.0151 10.0154C9.18037 10.8501 9.18037 12.2035 10.0151 13.0383L10.7851 13.8082L9.06015 15.5332C8.47436 16.119 7.52461 16.119 6.93882 15.5332L5.21453 13.8089L3.96972 15.0537C3.13499 15.8884 1.78162 15.8884 0.946888 15.0537C0.112161 14.219 0.112161 12.8656 0.946888 12.0309L2.19171 10.7861L0.466684 9.06103C-0.119103 8.47524 -0.119103 7.5255 0.466684 6.93971L2.19147 5.21493L2.96167 5.98514C3.79641 6.81988 5.14977 6.81988 5.98451 5.98514C6.81922 5.15041 6.81922 3.79703 5.98451 2.96231L5.2143 2.1921L6.93873 0.467661C7.52452 -0.118126 8.47427 -0.118127 9.06005 0.467659Z"
      />
    </svg>
  );
};

export default PuzzleIcon;
