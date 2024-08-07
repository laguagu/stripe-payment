"use client";

import { login, LoginState, signup, SignupState, githubSignIn } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { useTransition } from "react";

const initialLoginState: LoginState = null;
const initialSignupState: SignupState = null;

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {pending ? "Loading..." : children}
    </button>
  );
}

export default function LoginPage() {
  const [loginState, loginAction] = useFormState(login, initialLoginState);
  const [signupState, signupAction] = useFormState(signup, initialSignupState);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login or Sign Up</h2>
        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="flex space-x-2">
            <SubmitButton>Log in</SubmitButton>
            <form action={signupAction} className="inline">
              <SubmitButton>Sign up</SubmitButton>
            </form>
          </div>
          {loginState && loginState.error && (
            <p className="text-red-500">{loginState.error}</p>
          )}
          {signupState && (signupState.error || signupState.message) && (
            <p className={signupState.error ? "text-red-500" : "text-green-500"}>
              {signupState.error || signupState.message}
            </p>
          )}
        </form>
      </div>
      <div className="mt-8">
        <form action={githubSignIn}>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 disabled:bg-gray-500"
            onClick={() => startTransition(() => {})}
          >
            {isPending ? (
              "Loading..."
            ) : (
              <>
                <Image
                  src="/github-mark-white.png"
                  width={24}
                  height={24}
                  alt="GitHub logo"
                  className="mr-2"
                />
                Sign in with GitHub
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}