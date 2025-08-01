import Link from "next/link";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";

export default function HeaderNav() {
  return (
    <header className="border-primary/20 bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center">
        {/* logo component */}
        <Logo className="h-9 w-8 mr-3" /> 
        <Link href="/" className="flex items-center gap-2">
          <span className="text-primary text-xl font-bold">CineScope</span>
        </Link>

        <nav className="ml-auto flex items-center gap-4 ">
          <Link
            href="/"
            className="hover:text-primary text-sm font-bold transition-colors "
          >
            Movies
          </Link>

          <Link
            href="/genres"
            className="hover:text-primary text-sm font-bold transition-colors"
          >
            Genres
          </Link>

          <Link
            href="/about"
            className="hover:text-primary text-sm font-bold transition-colors"
          >
            About
          </Link>

          <Link
            href="/admin"
            className="hover:text-primary text-sm font-bold transition-colors"
          >
            Admin
          </Link>

          <Link
            href="/login"
            className="hover:text-primary text-sm font-bold transition-colors"
          >
            Login
          </Link>

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
