import { login, signup } from "@/app/actions";

export default function LoginPage() {
  return (
    <form className="p-20 bg-red-50">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <div className="gap-4 inline-flex flex-nowrap ">
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </div>
    </form>
  );
}
