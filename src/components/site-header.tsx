import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { VoiceSearch } from "./voice-search";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/marketplace", label: "Marketplace" },
] as const;

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 lg:px-8">
        <Link
          to="/"
          className="flex items-baseline gap-2 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring"
        >
          <span className="font-display text-3xl leading-none tracking-tight">KAARU</span>
          <span className="hidden text-xs tracking-[0.2em] text-muted-foreground uppercase sm:inline">
            hand · told
          </span>
        </Link>

        <nav aria-label="Main" className="order-3 w-full lg:order-none lg:w-auto">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ "aria-current": "page", className: "border-accent" }}
                  className="inline-flex min-h-11 items-center border-b-2 border-transparent px-3 text-sm font-medium hover:border-foreground/40"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-4 min-w-0 flex-1 lg:order-none lg:max-w-md">
          <VoiceSearch />
        </div>

        <Link
          to="/cart"
          className="inline-flex min-h-11 items-center gap-2 border border-foreground/40 px-4 text-sm font-medium hover:bg-secondary focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring"
        >
          <ShoppingBag aria-hidden="true" className="size-5" />
          <span>Bag</span>
          <span className="sr-only">, {count} item{count === 1 ? "" : "s"}</span>
          <span aria-hidden="true" className="bg-accent px-2 py-0.5 text-xs text-accent-foreground">
            {count}
          </span>
        </Link>
        <a
  href="#"
  className="inline-flex min-h-11 items-center border border-foreground/40 px-4 text-sm font-medium hover:bg-secondary focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring"
>
  Login
</a>
      </div>
    </header>
  );
}
