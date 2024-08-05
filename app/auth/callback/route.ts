// Dokumentaatio https://supabase.com/docs/guides/auth/social-login/auth-github?queryGroups=environment&environment=server&queryGroups=language&language=js
// Dijonmuster - https://github.com/dijonmusters/nextjs-supabase-email-client/blob/main/middleware.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
    console.log('code:', code)
    console.log('requestUrl:', requestUrl)
    
  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
