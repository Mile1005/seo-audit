import { auth } from "@/src/auth";
export default auth;
export const config = { matcher: ["/dashboard/:path*", "/api/private/:path*"] };
