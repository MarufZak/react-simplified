import React from "@marufzak/react";
import { Button, ToggleInput } from "@marufzak/strapi-ui";

interface Props {
  onLogout?: () => void;
}

const Settings = ({ onLogout }: Props) => {
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

  const handleLogout = () => {
    localStorage.clear();
    onLogout?.();
  };

  return (
    <section>
      <header className="flex items-center justify-between mb-14">
        <h2 className="text-[32px] leading-10 font-bold text-neutral-800">
          Settings
        </h2>
        <Button
          onClick={handleLogout}
          type="submit"
          size="md"
          theme="danger"
          variant="primary"
        >
          Logout
        </Button>
      </header>
      <ToggleInput
        hint="Both of them look great!"
        label="Dark mode"
        offLabel="False"
        onLabel="True"
        checked={isDark}
        onChange={handleToggle}
      />
    </section>
  );
};

export default Settings;
