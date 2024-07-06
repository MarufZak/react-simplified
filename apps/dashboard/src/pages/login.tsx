import React from "@marufzak/react";
import {
  PasswordInput,
  TextInput,
  Checkbox,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@marufzak/strapi-ui";
import { CircleCheckIcon } from "@marufzak/strapi-ui/icons";
import { StrapiIcon } from "@marufzak/strapi-ui/icons/logos";

interface Props {
  onLogin: (username: string, password: string) => void;
}

const Login = ({ onLogin }: Props) => {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    onLogin(username, password);
  };

  console.log({
    isDialogOpen,
  });

  return (
    <section
      experimental__patching={true}
      className="min-h-screen flex flex-col items-center justify-start pt-24 bg-neutral-100"
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-[560px] w-full px-[60px] pt-12 pb-[42px] bg-neutral-0 border-[0.5px] border-neutral-150 rounded-[4px] shadow-sm"
        experimental__patching={true}
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
        <PasswordInput
          key={`input-password`}
          label="Password"
          placeholder="Your password"
          autoComplete="current-password"
          name="password"
          required={true}
        />
        <label
          experimental__patching={true}
          className="flex items-center text-sm text-neutral-800 gap-2 my-6"
        >
          <Checkbox />
          Remember me
        </label>
        <Button
          key={`button-login`}
          type="submit"
          className="w-full"
          theme="default"
          variant="primary"
          size="md"
        >
          Login
        </Button>
      </form>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="inline-block mx-auto mt-6 text-sm text-primary-600"
      >
        Forgot password?
      </button>
      <Modal open={isDialogOpen}>
        <ModalHeader>
          <h3 className="font-bold text-neutral-800 text-center">
            Forgot password?
          </h3>
        </ModalHeader>
        <ModalContent className="flex flex-col items-center">
          <CircleCheckIcon
            className="fill-primary-600 mb-2"
            width={24}
            height={24}
          />
          <p className="text-neutral-800 text-center text-sm">
            Relax, type any email, website works without email verification.
          </p>
        </ModalContent>
        <ModalFooter>
          <Button
            className="w-full"
            size="lg"
            key={`button-done`}
            variant="secondary"
            theme="default"
            onClick={() => setIsDialogOpen(false)}
          >
            Done
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
};

export default Login;
