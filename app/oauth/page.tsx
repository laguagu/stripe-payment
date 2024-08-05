import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function LoginForm() {
  const signIn = async () => {
    "use server";

    // 1. Create a Supabase client
    const supabase = createClient();
    const origin = headers().get("origin");
    console.log('origin:', origin)
    
    // 2. Sign in with GitHub
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    console.log('data:', data)
    
    if (error) {
      console.log(error);
    } else {
        console.log('Redirecting to:', data.url);
        
      return redirect(data.url);
    }
    // 3. Redirect to landing page
  };

  return (
    <form
      action={signIn}
      className="flex-1 flex min-h-screen justify-center items-center"
    >
      <button className="hover:bg-gray-800 p-8 rounded-xl">
        <Image
          className="mx-auto mb-3"
          src="/github-mark-white.png"
          width={100}
          height={100}
          alt="GitHub logo"
        />
        Sign in with GitHub
      </button>
    </form>
  );
}
