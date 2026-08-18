import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button, Eyebrow } from "@/components/ui-kit";
import { categories, products } from "@/lib/data";
import { cn } from "@/lib/utils";

type MarketplaceSearch = { q?: string };

export const Route = createFileRoute("/marketplace")({
  validateSearch: (search: Record<string, unknown>): MarketplaceSearch =>
    typeof search["q"] === "string" && search["q"].trim() ? { q: search["q"] } : {},
  head: () => ({
    meta: [
      { title: "Marketplace — every piece, fully described | KAARU" },
      {
        name: "description",
        content:
          "Browse handmade textiles, pottery, brass and fibre work from disabled artisans. Filter by craft, material or the access features you need.",
      },
      { property: "og:title", content: "Marketplace — every piece, fully described | KAARU" },
      {
        property: "og:description",
        content: "Filter craft by category, material and access features like ISL video.",
      },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("All");
  const [signOnly, setSignOnly] = useState(false);

  const results = useMemo(() => {
    const query = (q ?? "").toLowerCase().trim();
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSign = !signOnly || p.hasSignLanguage;
      const haystack =
        `${p.name} ${p.category} ${p.material} ${p.region} ${p.story} ${p.tactile}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      return matchesCategory && matchesSign && matchesQuery;
    });
  }, [q, category, signOnly]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <header>
        <Eyebrow>The collection</Eyebrow>
        <h1 className="display-lg mt-3 max-w-2xl">
          {q ? <>Results for “{q}”</> : "Everything on the shelf right now"}
        </h1>
        {q ? (
          <Button
            variant="outline"
            className="mt-5"
            onClick={() => navigate({ to: "/marketplace", search: {} })}
          >
            <X aria-hidden="true" className="size-4" />
            Clear search
          </Button>
        ) : (
          <p className="mt-4 max-w-xl text-muted-foreground">
            Six pieces, six weeks of work between them. Use the filters, the search box, or the
            microphone in the header — whichever is easiest for you today.
          </p>
        )}
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <aside aria-label="Filters" className="lg:col-span-3">
          <div className="border border-border bg-parchment p-5">
            <fieldset>
              <legend className="text-sm font-semibold">Craft</legend>
              <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      aria-pressed={category === c}
                      onClick={() => setCategory(c)}
                      className={cn(
                        "inline-flex min-h-11 w-full items-center justify-start border px-3 text-sm font-medium transition-colors",
                        category === c
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-foreground/25 hover:bg-secondary",
                      )}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset className="mt-7 border-t border-border pt-5">
              <legend className="text-sm font-semibold">Access features</legend>
              <div className="mt-3 flex items-start gap-3">
                <input
                  id="filter-sign"
                  type="checkbox"
                  checked={signOnly}
                  onChange={(e) => setSignOnly(e.target.checked)}
                  className="mt-1 size-5 accent-[var(--accent)]"
                />
                <label htmlFor="filter-sign" className="text-sm">
                  Only show pieces with a sign-language video
                </label>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Audio descriptions and tactile notes are on every listing, so there is nothing to
                filter for.
              </p>
            </fieldset>
          </div>
        </aside>

        <section aria-label="Products" className="lg:col-span-9">
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            Showing {results.length} of {products.length} pieces
            {category !== "All" ? ` in ${category}` : ""}.
          </p>

          {results.length === 0 ? (
            <div className="mt-6 border border-border bg-parchment p-10 text-center">
              <h2 className="font-display text-3xl">Nothing matches yet</h2>
              <p className="mt-2 text-muted-foreground">
                Try a broader craft, or clear the search and start again.
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => {
                  setCategory("All");
                  setSignOnly(false);
                  navigate({ to: "/marketplace", search: {} });
                }}
              >
                Reset all filters
              </Button>
            </div>
          ) : (
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((product) => (
                <li key={product.slug}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
