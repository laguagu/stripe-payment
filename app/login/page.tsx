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
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-200"
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login or Sign Up</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget.form!);
                loginAction(formData);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-200"
            >
              Log in
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget.form!);
                signupAction(formData);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300 transition-colors duration-200"
            >
              Sign up
            </button>
          </div>
        </form>
        {loginState && loginState.error && (
          <p className="text-red-500 mt-2">{loginState.error}</p>
        )}
        {signupState && (signupState.error || signupState.message) && (
          <p className={`mt-2 ${signupState.error ? "text-red-500" : "text-green-500"}`}>
            {signupState.error || signupState.message}
          </p>
        )}
      </div>
      <div className="mt-8">
        <button
          onClick={() => startTransition(() => githubSignIn())}
          disabled={isPending}
          className="flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 disabled:bg-gray-500 transition-colors duration-200"
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
      </div>
    </div>
  );
}