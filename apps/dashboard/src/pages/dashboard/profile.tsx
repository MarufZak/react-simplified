import React from "@marufzak/react";
import { Button, PasswordInput, TextInput } from "@marufzak/strapi-ui";
import { CheckIcon } from "@marufzak/strapi-ui/icons";
import Block from "../../components/block";

const Profile = () => {
  return (
    <div>
      <header className="flex items-center justify-between mb-14">
        <h2 className="text-[32px] leading-10 font-bold">Kai Doe</h2>
        <Button
          size="md"
          className="flex items-center gap-2"
          theme="default"
          variant="primary"
        >
          <CheckIcon width={12} height={9} className="fill-neutral-0" />
          Save
        </Button>
      </header>
      <form>
        <Block
          key="block-1"
          className="grid grid-cols-2 gap-x-4 gap-y-6"
          title="Profile"
        >
          <TextInput
            key="input-given-name"
            autoComplete="given-name"
            label="First name"
            placeholder="Kai"
          />
          <TextInput
            key="input-family-name"
            autoComplete="family-name"
            label="Last name"
            placeholder="Doe"
          />
          <TextInput
            key="input-email"
            autoComplete="email"
            type="email"
            label="Email"
            placeholder="kai@doe.com"
          />
          <TextInput
            key="input-username"
            autoComplete="username"
            label="Username"
            placeholder="kai_doe"
          />
        </Block>
        <Block
          key="block-2"
          className="grid grid-cols-2 gap-x-4 gap-y-6"
          title="Change password"
        >
          <PasswordInput
            key="password"
            autoComplete="new-password"
            label="Password"
            placeholder="Your password"
          />
          <PasswordInput
            key="password-confirmation"
            autoComplete="new-password"
            label="Password confirmation"
            placeholder="Your password"
          />
        </Block>
      </form>
    </div>
  );
};

export default Profile;
