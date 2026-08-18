import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Ear, Hand, Languages, Volume2 } from "lucide-react";
import { artisans, heroImage, products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Button, Eyebrow } from "@/components/ui-kit";
import { useA11y } from "@/lib/a11y";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KAARU — Craft, hand-told by disabled artisans" },
      {
        name: "description",
        content:
          "Buy handwoven textiles, terracotta and cast brass directly from disabled and differently abled artisans. Signed, spoken and easy-read listings on every piece.",
      },
      { property: "og:title", content: "KAARU — Craft, hand-told by disabled artisans" },
      {
        property: "og:description",
        content:
          "An inclusive craft marketplace: audio descriptions, sign-language video and easy-read text on every listing.",
      },
    ],
  }),
  component: Home,
});

const PROMISES = [
  {
    icon: Volume2,
    title: "Every piece, described aloud",
    body: "A written audio description on all listings, playable in one keystroke — not an alt tag afterthought.",
  },
  {
    icon: Ear,
    title: "Signed by the maker",
    body: "Where an artisan signs, the listing carries their ISL video. Their language, not a translation of it.",
  },
  {
    icon: Hand,
    title: "Told by touch",
    body: "Weight, temperature, grain. What the object does in your hand, written before what it looks like.",
  },
  {
    icon: Languages,
    title: "Easy read, always on tap",
    body: "One switch rewrites every story into short, plain sentences. No separate 'simple' website.",
  },
];

function Home() {
  const { settings } = useA11y();
  const featured = products.slice(0, 3);

  return (
    <>
      <section className="grain border-b border-border" aria-labelledby="hero-heading">
        <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 pt-14 pb-16 lg:grid-cols-12 lg:px-8 lg:pt-20">
          <div className="lg:col-span-6">
            <Eyebrow>Inclusive craft marketplace</Eyebrow>
            <h1 id="hero-heading" className="display-xl mt-5">
              Hands that were
              <span className="block italic text-accent">counted out</span>
              made this.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {settings.easyRead
                ? "Artisans who are disabled make these things by hand. You can buy them here. Every item has sound, sign language and easy words."
                : "KAARU is a marketplace for disabled and differently abled artisans — and it is built so both the maker and the buyer can use it. Signed, spoken, tactile, plain."}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="ink">
                <Link to="/marketplace">
                  Browse the collection
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/artisan/$slug" params={{ slug: "hasan-ali" }}>
                  Meet a maker
                </Link>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                ["71", "makers on board"],
                ["100%", "listings described"],
                ["AA", "WCAG 2.2 conformance"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="block font-display text-4xl leading-none">{value}</span>
                    <span className="mt-1.5 block text-xs text-muted-foreground">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6">
            <figure className="relative">
              <img
                src={heroImage}
                alt="A weaver's hands drawing deep indigo thread across a wooden handloom in a sunlit workshop."
                width={1600}
                height={1008}
                className="aspect-4/3 w-full border border-border object-cover"
              />
              <figcaption className="mt-3 border-l-2 border-accent pl-3 text-sm text-muted-foreground">
                Meera Devi's pit loom, rebuilt at chair height. Bhuj, Kutch.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="promise-heading" className="border-b border-border bg-parchment">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <h2 id="promise-heading" className="display-lg max-w-2xl">
            Access isn't a settings page. It's the shopfront.
          </h2>
          <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="bg-parchment p-6">
                <Icon aria-hidden="true" className="size-6 text-accent" />
                <h3 className="mt-4 text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>This week's shelf</Eyebrow>
            <h2 id="featured-heading" className="display-lg mt-3">
              Three pieces, three hands
            </h2>
          </div>
          <Link to="/marketplace" className="inline-flex min-h-11 items-center gap-2 font-medium hover:text-accent">
            See all pieces
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="makers-heading" className="border-y border-border bg-parchment">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <Eyebrow>The makers</Eyebrow>
          <h2 id="makers-heading" className="display-lg mt-3 max-w-2xl">
            They are not a cause. They are a workshop with a waiting list.
          </h2>

          <ul className="mt-12 space-y-px bg-border">
            {artisans.map((artisan) => (
              <li key={artisan.slug} className="bg-parchment">
                <Link
                  to="/artisan/$slug"
                  params={{ slug: artisan.slug }}
                  className="group grid items-center gap-6 py-6 md:grid-cols-12"
                >
                  <img
                    src={artisan.portrait}
                    alt={artisan.portraitAlt}
                    width={900}
                    height={900}
                    loading="lazy"
                    className="aspect-square w-24 border border-border object-cover md:col-span-2 md:w-full"
                  />
                  <div className="md:col-span-4">
                    <h3 className="font-display text-3xl group-hover:text-accent">{artisan.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {artisan.craft} · {artisan.region} · {artisan.identity}
                    </p>
                  </div>
                  <p className="text-base italic md:col-span-5">“{artisan.quote}”</p>
                  <span className="flex justify-start md:col-span-1 md:justify-end">
                    <ArrowRight
                      aria-hidden="true"
                      className="size-6 transition-transform group-hover:translate-x-1"
                    />
                    <span className="sr-only">Read {artisan.name}'s profile</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="border border-border bg-primary px-6 py-16 text-center text-primary-foreground md:px-16">
          <h2 id="cta-heading" className="display-lg mx-auto max-w-3xl">
            Buy the object. Keep the maker's name attached to it.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base opacity-90">
            Eighty-two percent of every sale reaches the artisan directly, and every dispatch note
            arrives in the format they asked for.
          </p>
          <div className="mt-9 flex justify-center">
            <Button asChild size="lg" variant="clay">
              <Link to="/marketplace">
                Start browsing
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
