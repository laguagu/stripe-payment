import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/oauth-middleware";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Salli pääsy julkisille reiteille ilman autentikointia
  const publicRoutes = ["/login", "/auth/callback", "/signup"];
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return response;
  }

  if (!user) {
    console.log("User not found, redirecting to login page");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("User found, continuing to the requested page");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
