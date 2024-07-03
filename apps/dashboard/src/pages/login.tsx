import React from "@marufzak/react";
import {
  PasswordInput,
  TextInput,
  Checkbox,
  Button,
} from "@marufzak/strapi-ui";
import { StrapiIcon } from "@marufzak/strapi-ui/icons/logos";

interface Props {
  onLogin: (username: string, password: string) => void;
}

const Login = ({ onLogin }: Props) => {
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    onLogin(username, password);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-start pt-24 bg-neutral-100">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-[560px] w-full px-[60px] pt-12 pb-[42px] bg-neutral-0 border-[0.5px] border-neutral-150 rounded-[4px] shadow-sm"
      >
        <div className="w-[72px] h-[72px] rounded-[4px] bg-primary-600 grid place-items-center mx-auto">
          <StrapiIcon className="fill-neutral-0" width={32} height={32} />
        </div>
        <h2 className="text-[32px] leading-10 mb-1 text-center font-bold text-neutral-800">
          Welcome back!
        </h2>
        <p className="text-neutral-600 mb-[38px] text-center">
          Log in to your Strapi account
        </p>
        <TextInput
          key={`input-username`}
          label="Username"
          placeholder="marufzak04"
          className="mb-6"
          autoComplete="email"
          name="username"
          required={true}
        />
        {/* unfortunately InputPassword cannot be used here because
            of experimental patching feature is not being used */}
        <TextInput
          key={`input-password`}
          label="Password"
          placeholder="Your password"
          autoComplete="current-password"
          name="password"
          type="password"
          required={true}
        />
        <label className="flex items-center text-sm text-neutral-800 gap-2 my-6">
          <Checkbox />
          Remember me
        </label>
        <Button
          type="submit"
          className="w-full"
          theme="default"
          variant="primary"
          size="md"
        >
          Login
        </Button>
      </form>
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
