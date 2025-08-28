import Link from "next/link";
import { ThemeSwitcher } from "../ui/theme-provider";

export default function Header() {
  return (
    <header
      data-testid="header"
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              aiseoturbo.com
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/about"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              About
            </Link>
            <Link
              href="/features"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Features
            </Link>
            <Link
              href="/features/seo-audit"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              SEO Audit
            </Link>
            <Link
              href="/contact"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ThemeSwitcher />
          <Link
            href="/seo-audit"
            data-testid="cta-primary"
            className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
          >
            Start Free Audit
          </Link>
        </div>
      </div>
    </header>
  );
}
