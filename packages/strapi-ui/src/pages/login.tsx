import React from "react-simplified";
import { PasswordInput, TextInput } from "../components/input";
import Checkbox from "../components/checkbox";
import Button from "../components/button";
import { LogoIcon } from "../components/icons";

const Login = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-start pt-24 bg-neutral-100">
      <div className="max-w-[560px] w-full px-[60px] pt-12 pb-[42px] bg-neutral-0 border-[0.5px] border-neutral-150 rounded-[4px] shadow-sm">
        <LogoIcon className="mx-auto mb-6" width={72} height={72} />
        <h2 className="text-[32px] leading-10 mb-1 text-center font-bold text-neutral-800">
          Welcome back!
        </h2>
        <p className="text-neutral-600 mb-[38px] text-center">
          Log in to your Strapi account
        </p>
        <TextInput
          label="Email"
          placeholder="kaidoe@gmail.com"
          className="mb-6"
        />
        <PasswordInput label="Password" placeholder="Your password" />
        <label className="flex items-center text-sm text-neutral-800 gap-2 my-6">
          <Checkbox />
          Remember me
        </label>
        <Button className="w-full" theme="default" variant="primary" size="md">
          Login
        </Button>
      </div>
      <a
        href="/"
        className="inline-block mx-auto mt-6 text-sm text-primary-600"
      >
        Forgot password?
      </a>
    </section>
  );
};

export default Login;
