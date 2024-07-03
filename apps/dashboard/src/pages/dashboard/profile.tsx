import React from "@marufzak/react";
import { Button, PasswordInput, TextInput } from "@marufzak/strapi-ui";
import { CheckIcon } from "@marufzak/strapi-ui/icons";
import Block from "../../components/block";

const Profile = () => {
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    for (const [key, value] of formData.entries()) {
      if (key === "password" || key === "confirm-password") {
        return;
      }

      localStorage.setItem(key, value as string);
    }

    alert("Profile saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <header className="flex items-center justify-between mb-14">
        <h2 className="text-[32px] leading-10 font-bold">Kai Doe</h2>
        <Button
          type="submit"
          size="md"
          className="flex items-center gap-2"
          theme="default"
          variant="primary"
        >
          <CheckIcon width={12} height={9} className="fill-neutral-0" />
          Save
        </Button>
      </header>
      <div className="flex flex-col gap-6">
        <Block
          key="block-1"
          className="grid grid-cols-2 gap-x-4 gap-y-6"
          title="Profile"
        >
          <TextInput
            defaultValue={localStorage.getItem("given-name") || ""}
            key="input-given-name"
            name="given-name"
            autoComplete="given-name"
            label="First name"
            placeholder="Kai"
          />
          <TextInput
            defaultValue={localStorage.getItem("family-name") || ""}
            key="input-family-name"
            name="family-name"
            autoComplete="family-name"
            label="Last name"
            placeholder="Doe"
          />
          <TextInput
            defaultValue={localStorage.getItem("email") || ""}
            key="input-email"
            autoComplete="email"
            name="email"
            type="email"
            label="Email"
            placeholder="kai@doe.com"
          />
          <TextInput
            defaultValue={localStorage.getItem("username") || ""}
            key="input-username"
            autoComplete="username"
            label="Username"
            placeholder="kai_doe"
          />
        </Block>
        {/* unfortunately InputPassword cannot be used here because
            of experimental patching feature is not being used */}
        <Block
          key="block-2"
          className="grid grid-cols-2 gap-x-4 gap-y-6"
          title="Change password"
        >
          <TextInput
            type="password"
            key="password"
            name="password"
            autoComplete="new-password"
            label="Password"
            placeholder="Your password"
          />
          <TextInput
            type="password"
            key="password-confirmation"
            name="confirm-password"
            autoComplete="new-password"
            label="Password confirmation"
            placeholder="Your password"
          />
        </Block>
      </div>
    </form>
  );
};

export default Profile;
