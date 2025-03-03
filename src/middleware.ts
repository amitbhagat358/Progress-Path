// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/", "/verify/:path*"],
// };

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const url = request.nextUrl;

//   // Redirect to dashboard if the user is already authenticated
//   // and trying to access sign-in, sign-up, or home page
//   if (
//     token &&
//     (url.pathname.startsWith("/sign-in") ||
//       url.pathname.startsWith("/sign-up") ||
//       url.pathname.startsWith("/verify") ||
//       url.pathname === "/")
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (!token && url.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/sessions";
import { cookies } from "next/headers";

const protectedRoutes: (string | RegExp)[] = [
  "/dashboard",
  "/checklist",
  "/tasks",
  "/get-summary",
  "/purpose-of-study",
];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    typeof route === "string" ? path === route : route.test(path)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
