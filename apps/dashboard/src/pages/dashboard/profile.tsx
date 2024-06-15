import React from "../../../../../packages/react/dist/core";
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
        <Block className="grid grid-cols-2 gap-x-4 gap-y-6" title="Profile">
          <TextInput
            autoComplete="given-name"
            label="First name"
            placeholder="Kai"
          />
          <TextInput
            autoComplete="family-name"
            label="Last name"
            placeholder="Doe"
          />
          <TextInput
            autoComplete="email"
            type="email"
            label="Email"
            placeholder="kai@doe.com"
          />
          <TextInput
            autoComplete="username"
            label="Username"
            placeholder="kai_doe"
          />
        </Block>
        <Block
          className="grid grid-cols-2 gap-x-4 gap-y-6"
          title="Change password"
        >
          <PasswordInput
            autoComplete="new-password"
            label="Password"
            placeholder="Your password"
          />
          <PasswordInput
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
