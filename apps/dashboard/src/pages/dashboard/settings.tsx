import React from "@marufzak/react";
import { ToggleInput } from "@marufzak/strapi-ui";

const Settings = () => {
  const [isDark, setIsDark] = React.useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const handleToggle = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const newValue = target.checked;

    if (newValue) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setIsDark(newValue);
  };

  return (
    <ToggleInput
      hint="Both of them look great!"
      label="Dark mode"
      offLabel="False"
      onLabel="True"
      checked={isDark}
      onChange={handleToggle}
    />
  );
};

export default Settings;
