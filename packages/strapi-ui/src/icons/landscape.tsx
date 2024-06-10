import React from "react-simplified";

const LandscapeIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.86628 0.399902C2.53491 0.399902 2.26628 0.668532 2.26628 0.999903C2.26628 1.33127 2.53491 1.5999 2.86628 1.5999H13.0737C13.4051 1.5999 13.6737 1.33127 13.6737 0.999903C13.6737 0.668532 13.4051 0.399902 13.0737 0.399902H2.86628ZM13.7327 2.86637C14.6163 2.86637 15.3327 3.58281 15.3327 4.46647V4.98304V13.733C15.3327 14.6167 14.6159 15.333 13.7322 15.333H11.666H4.33268H2.26614C1.38248 15.333 0.666039 14.6167 0.666038 13.733L0.666034 5.33306C0.666034 5.33306 0.666018 10.583 0.666016 4.47396C0.666015 3.59031 1.38236 2.86637 2.26602 2.86637H7.99935H13.7327ZM3.35417 12.7862H12.9115L10.8208 10.6498L9.62616 11.8706L6.93817 9.12383L3.35417 12.7862ZM10.8208 8.51435C9.98454 8.51435 9.32748 7.84292 9.32748 6.98838C9.32748 6.13383 9.98454 5.4624 10.8208 5.4624C11.6571 5.4624 12.3141 6.13383 12.3141 6.98838C12.3141 7.84292 11.6571 8.51435 10.8208 8.51435Z"
      />
    </svg>
  );
};

export default LandscapeIcon;