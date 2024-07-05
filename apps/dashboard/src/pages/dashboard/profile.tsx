import React from "@marufzak/react";
import { Button, PasswordInput, TextInput } from "@marufzak/strapi-ui";
import { CheckIcon } from "@marufzak/strapi-ui/icons";
import Block from "../../components/block";
import type { User } from "../../App";

const Profile = () => {
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const user = JSON.parse(localStorage.getItem("user") as string) as User;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser: Record<string, any> = {
      ...user,
    };

    for (const [key, value] of formData.entries()) {
      if (key === "confirmPassword") {
        continue;
      }
      newUser[key] = value;
    }

    localStorage.setItem("user", JSON.stringify(newUser));

    alert("Profile saved successfully!");
  };

  // verified that it exists in the App

  return (
    <form experimental__patching={true} onSubmit={handleSubmit} ref={formRef}>
      <header className="flex items-center justify-between mb-14">
        <h2 className="text-[32px] leading-10 font-bold">{user.username}</h2>
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
      <div experimental__patching={true} className="flex flex-col gap-6">
        <Block
          key="block-1"
          className="grid grid-cols-2 gap-x-4 gap-y-6"
          title="Profile"
        >
          <TextInput
            defaultValue={user.firstName}
            key="input-given-name"
            name="firstName"
            autoComplete="given-name"
            label="First name"
            placeholder="Kai"
          />
          <TextInput
            defaultValue={user.familyName}
            key="input-family-name"
            name="familyName"
            autoComplete="family-name"
            label="Last name"
            placeholder="Doe"
          />
          <TextInput
            defaultValue={user.email}
            key="input-email"
            autoComplete="email"
            name="email"
            type="email"
            label="Email"
            placeholder="kai@doe.com"
          />
          <TextInput
            defaultValue={user.username}
            key="input-username"
            autoComplete="username"
            name="username"
            label="Username"
            placeholder="kai_doe"
          />
        </Block>
        <Block
          key="block-2"
          className="grid grid-cols-2 gap-x-4 gap-y-6"
          title="Change password"
          experimental__patching={true}
        >
          <PasswordInput
            defaultValue={user.password}
            key="password"
            name="password"
            autoComplete="new-password"
            label="Password"
            placeholder="Your password"
          />
          <PasswordInput
            key="password-confirmation"
            name="confirmPassword"
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
