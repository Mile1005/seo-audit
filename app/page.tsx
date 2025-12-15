import { redirect } from "../lib/navigation";

export default function RootPage() {
  // With 'as-needed' locale prefix, redirect to root with English locale
  redirect({ href: "/", locale: "en" });
}
