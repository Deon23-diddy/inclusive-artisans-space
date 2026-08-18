import { Link } from "@tanstack/react-router";
import { Ear, Hand, Volume2 } from "lucide-react";
import { formatPrice, getArtisan, type Product } from "@/lib/data";
import { useA11y } from "@/lib/a11y";

export function ProductCard({ product }: { product: Product }) {
  const { settings } = useA11y();
  const artisan = getArtisan(product.artisan);

  return (
    <article className="group flex h-full flex-col border border-border bg-card">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring"
      >
        <div className="aspect-4/5 overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.imageAlt}
            width={900}
            height={1100}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight">
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              className="after:absolute hover:text-accent"
            >
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 text-sm font-semibold">{formatPrice(product.price)}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          {product.category} · {product.material} · {artisan?.region}
        </p>

        <p className="text-sm">
          {settings.easyRead
            ? product.easyRead.slice(0, 2).join(" ")
            : `Made by ${artisan?.name} over ${product.madeInDays} days. ${product.edition}.`}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Accessibility features">
          <li className="inline-flex items-center gap-1.5 border border-foreground/25 px-2 py-1 text-xs">
            <Volume2 aria-hidden="true" className="size-3.5" />
            Audio description
          </li>
          {product.hasSignLanguage ? (
            <li className="inline-flex items-center gap-1.5 border border-foreground/25 px-2 py-1 text-xs">
              <Ear aria-hidden="true" className="size-3.5" />
              ISL video
            </li>
          ) : null}
          <li className="inline-flex items-center gap-1.5 border border-foreground/25 px-2 py-1 text-xs">
            <Hand aria-hidden="true" className="size-3.5" />
            Tactile notes
          </li>
        </ul>
      </div>
    </article>
  );
}
