import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play, Square } from "lucide-react";
import { Button, Eyebrow, Tag } from "@/components/ui-kit";
import { getArtisan, productsByArtisan } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { useA11y } from "@/lib/a11y";

export const Route = createFileRoute("/artisan/$slug")({
  loader: ({ params }) => {
    const artisan = getArtisan(params.slug);
    if (!artisan) throw notFound();
    return { artisan };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Maker unavailable | KAARU" }, { name: "robots", content: "noindex" }],
      };
    }
    const { artisan } = loaderData;
    const title = `${artisan.name} — ${artisan.craft} | KAARU`;
    const description = `${artisan.name} has practised ${artisan.craft.toLowerCase()} in ${artisan.region} for ${artisan.years} years. Read the story and shop the work.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ArtisanPage,
});

function ArtisanPage() {
  const { artisan } = Route.useLoaderData();
  const { settings, speak, stopSpeaking, speaking } = useA11y();
  const work = productsByArtisan(artisan.slug);
  const spoken = `${artisan.name}. ${artisan.craft} in ${artisan.region}. ${artisan.bio.join(" ")}`;

  return (
    <div>
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
          <div className="lg:col-span-5">
            <img
              src={artisan.portrait}
              alt={artisan.portraitAlt}
              width={900}
              height={900}
              className="aspect-square w-full border border-border object-cover"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>{artisan.identity}</Tag>
              <Tag>{artisan.years} years at the craft</Tag>
              {artisan.signsInVideo ? <Tag>Signs in ISL</Tag> : null}
            </div>
            <Button
              className="mt-4 w-full"
              variant={speaking ? "clay" : "outline"}
              onClick={() => (speaking ? stopSpeaking() : speak(spoken))}
            >
              {speaking ? (
                <>
                  <Square aria-hidden="true" className="size-4" />
                  Stop reading
                </>
              ) : (
                <>
                  <Play aria-hidden="true" className="size-4" />
                  Listen to this profile
                </>
              )}
            </Button>
          </div>

          <div className="lg:col-span-7">
            <Eyebrow>
              {artisan.craft} · {artisan.region}
            </Eyebrow>
            <h1 className="display-xl mt-3">{artisan.name}</h1>
            <blockquote className="mt-7 border-l-4 border-accent pl-5 font-display text-2xl leading-snug italic">
              “{artisan.quote}”
            </blockquote>

            {settings.easyRead ? (
              <ul className="mt-8 space-y-3 text-lg">
                {artisan.easyRead.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <div className="mt-8 space-y-5 text-lg leading-relaxed">
                {artisan.bio.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            )}

            <section aria-labelledby="studio-heading" className="mt-10 border border-border bg-parchment p-6">
              <h2 id="studio-heading" className="text-xl">
                Working with {artisan.name.split(" ")[0]}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {artisan.studioNotes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent">
                      —
                    </span>
                    {note}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <section aria-labelledby="work-heading" className="mt-24">
          <h2 id="work-heading" className="display-lg">
            Work by {artisan.name}
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
