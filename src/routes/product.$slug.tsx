import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Ear, Hand, Play, Square, Volume2 } from "lucide-react";
import { Button, Eyebrow, Tag } from "@/components/ui-kit";
import { formatPrice, getArtisan, getProduct, productsByArtisan } from "@/lib/data";
import { useA11y } from "@/lib/a11y";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Piece unavailable | KAARU" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${formatPrice(product.price)} | KAARU`;
    return {
      meta: [
        { title },
        { name: "description", content: product.audioDescription.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: product.audioDescription.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const artisan = getArtisan(product.artisan);
  const { settings, speak, stopSpeaking, speaking, announce } = useA11y();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = productsByArtisan(product.artisan).filter((p) => p.slug !== product.slug);

  const handleAdd = () => {
    add(product.slug, qty);
    setAdded(true);
    announce(`${product.name}, quantity ${qty}, added to your bag.`);
    window.setTimeout(() => setAdded(false), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          to="/marketplace"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium hover:text-accent"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to the marketplace
        </Link>
      </nav>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <img
            src={product.image}
            alt={product.imageAlt}
            width={900}
            height={1100}
            className="aspect-4/5 w-full border border-border object-cover"
          />

          <div className="mt-4 border border-border bg-parchment p-5">
            <h2 className="flex items-center gap-2 text-lg">
              <Volume2 aria-hidden="true" className="size-5 text-accent" />
              Audio description
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {product.audioDescription}
            </p>
            <Button
              className="mt-4"
              variant={speaking ? "clay" : "outline"}
              onClick={() => (speaking ? stopSpeaking() : speak(product.audioDescription))}
            >
              {speaking ? (
                <>
                  <Square aria-hidden="true" className="size-4" />
                  Stop reading
                </>
              ) : (
                <>
                  <Play aria-hidden="true" className="size-4" />
                  Play description aloud
                </>
              )}
            </Button>
          </div>

          {product.hasSignLanguage ? (
            <div className="mt-4 border border-border bg-parchment p-5">
              <h2 className="flex items-center gap-2 text-lg">
                <Ear aria-hidden="true" className="size-5 text-accent" />
                Signed by {artisan?.name}
              </h2>
              <div className="mt-3 flex aspect-video items-center justify-center border border-dashed border-foreground/30 bg-secondary">
                <p className="px-6 text-center text-sm text-muted-foreground">
                  Indian Sign Language video, 1 min 20 s — with open captions and a full transcript
                  below.
                </p>
              </div>
              <details className="mt-3">
                <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold">
                  Read the video transcript
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  “{product.story}” — {artisan?.name}, {artisan?.region}.
                </p>
              </details>
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-6">
          <Eyebrow>
            {product.category} · {product.edition}
          </Eyebrow>
          <h1 className="display-lg mt-3">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold">{formatPrice(product.price)}</p>

          {artisan ? (
            <p className="mt-4">
              Made by{" "}
              <Link
                to="/artisan/$slug"
                params={{ slug: artisan.slug }}
                className="font-semibold text-accent underline underline-offset-4"
              >
                {artisan.name}
              </Link>{" "}
              — {artisan.craft}, {artisan.region}.
            </p>
          ) : null}

          {settings.easyRead ? (
            <div className="mt-7 border-l-4 border-accent bg-parchment p-5">
              <h2 className="text-lg">In short</h2>
              <ul className="mt-3 space-y-2 text-base">
                {product.easyRead.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-7 text-lg leading-relaxed">{product.story}</p>
          )}

          <div className="mt-7 border border-border bg-parchment p-5">
            <h2 className="flex items-center gap-2 text-lg">
              <Hand aria-hidden="true" className="size-5 text-accent" />
              How it feels
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{product.tactile}</p>
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-px border border-border bg-border text-sm">
            {[
              ["Material", product.material],
              ["Size", product.dimensions],
              ["Time to make", `${product.madeInDays} days`],
              ["Edition", product.edition],
            ].map(([label, value]) => (
              <div key={label} className="bg-parchment p-4">
                <dt className="text-xs tracking-wider text-muted-foreground uppercase">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-end gap-4">
            <div>
              <label htmlFor="qty" className="block text-sm font-semibold">
                Quantity
              </label>
              <select
                id="qty"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="mt-1.5 min-h-11 w-24 border border-input bg-parchment px-3 text-base focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <Button size="lg" variant="clay" onClick={handleAdd} className="flex-1 sm:flex-none">
              {added ? (
                <>
                  <Check aria-hidden="true" className="size-5" />
                  Added to your bag
                </>
              ) : (
                <>Add to bag · {formatPrice(product.price * qty)}</>
              )}
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            <Tag>Ships in 5–7 days</Tag>
            <Tag>82% to the maker</Tag>
            <Tag>Returns within 14 days</Tag>
          </ul>

          <div className="mt-7">
            <h2 className="text-lg">Care</h2>
            <p className="mt-2 text-sm text-muted-foreground">{product.care}</p>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="mt-24">
          <h2 id="related-heading" className="display-lg">
            More from {artisan?.name}
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
