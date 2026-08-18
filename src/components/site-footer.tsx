import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-parchment">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-4xl leading-none">KAARU</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A marketplace where disabled and differently abled artisans sell in their own words —
            spoken, signed, or stitched.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow text-muted-foreground">Browse</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/marketplace" className="hover:text-accent">
                All pieces
              </Link>
            </li>
            <li>
              <Link
                to="/artisan/$slug"
                params={{ slug: "meera-devi" }}
                className="hover:text-accent"
              >
                Meera Devi, weaver
              </Link>
            </li>
            <li>
              <Link
                to="/artisan/$slug"
                params={{ slug: "ravi-kumar" }}
                className="hover:text-accent"
              >
                Ravi Kumar, brass caster
              </Link>
            </li>
            <li>
              <Link to="/artisan/$slug" params={{ slug: "hasan-ali" }} className="hover:text-accent">
                Hasan Ali, potter
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-muted-foreground">Our access promise</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Every listing carries an audio description.</li>
            <li>Sign-language video wherever the maker signs.</li>
            <li>Easy-read text on every product and profile.</li>
            <li>Keyboard-complete, screen-reader tested, WCAG 2.2 AA.</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-muted-foreground lg:px-8">
          © {new Date().getFullYear()} KAARU. Prototype built for a hackathon. Artisan stories are
          illustrative.
        </p>
      </div>
    </footer>
  );
}
