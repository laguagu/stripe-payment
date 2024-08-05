"use client";
import { login, LoginState, signup, SignupState } from "@/app/actions";
import { useFormState } from "react-dom";
import Image from "next/image";
import { githubSignIn } from "@/app/actions";

const initialLoginState: LoginState = null;
const initialSignupState: SignupState = null;

export default function LoginPage() {
  const [loginState, loginAction] = useFormState(login, initialLoginState);
  const [signupState, signupAction] = useFormState(signup, initialSignupState);

  return (
    <div>
      <form className="p-20 bg-red-50">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <div className="gap-4 inline-flex flex-nowrap ">
          <button formAction={loginAction}>Log in</button>
          <button formAction={signupAction}>Sign up</button>
        </div>
        {loginState && (
          <p className={loginState.error ? "text-red-500" : "text-green-500"}>
            {loginState.error}
          </p>
        )}
        {signupState && (
          <p className={signupState.error ? "text-red-500" : "text-green-500"}>
            {signupState.error || signupState.message}
          </p>
        )}
      </form>
      <form
        action={githubSignIn}
        className="flex-1 flex min-h-screen justify-center items-center"
      >
        <button className="hover:bg-gray-800 p-8 rounded-xl bg-zinc-800">
          <Image
            className="mx-auto mb-3"
            src="/github-mark-white.png"
            width={100}
            height={100}
            alt="GitHub logo"
            priority
            style={{ width: "auto", height: "auto" }}
          />
          <p className="text-white">Sign in with GitHub</p>
        </button>
      </form>
    </div>
  );
}
