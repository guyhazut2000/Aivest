import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    const signIn = new URL("/sign-in", req.nextUrl.origin);
    signIn.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(signIn);
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
