import { auth } from "../auth"

export default auth

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/private/:path*",
    "/auth-test",
    "/onboarding"
  ],
}
