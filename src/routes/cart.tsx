import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import { Button, Eyebrow, Field, inputClass } from "@/components/ui-kit";
import { formatPrice, getArtisan, getProduct } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useA11y } from "@/lib/a11y";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your bag & checkout | KAARU" },
      {
        name: "description",
        content:
          "Review the pieces in your bag and check out. Large tap targets, clear labels, and a choice of how you would like your order updates.",
      },
      { property: "og:title", content: "Your bag & checkout | KAARU" },
      {
        property: "og:description",
        content: "An accessible, three-field checkout for handmade craft from disabled artisans.",
      },
    ],
  }),
  component: CartPage,
});

const CONTACT_MODES = [
  { id: "text", label: "Text message", hint: "Short written updates." },
  { id: "voice", label: "Voice note", hint: "Spoken updates from the maker." },
  { id: "video", label: "Signed video", hint: "Updates in Indian Sign Language." },
];

function CartPage() {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const { announce } = useA11y();
  const [placed, setPlaced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = subtotal > 0 ? 180 : 0;
  const total = subtotal + shipping;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    if (!String(form.get("name") ?? "").trim()) next["name"] = "Please enter the name for delivery.";
    const email = String(form.get("email") ?? "").trim();
    if (!email) next["email"] = "Please enter an email address.";
    else if (!email.includes("@")) next["email"] = "That email address is missing an @ symbol.";
    if (!String(form.get("address") ?? "").trim())
      next["address"] = "Please enter a delivery address.";
    setErrors(next);

    if (Object.keys(next).length > 0) {
      announce(`${Object.keys(next).length} problems with the form. Please check the fields.`);
      const first = document.getElementById(Object.keys(next)[0] ?? "");
      first?.focus();
      return;
    }
    setPlaced(true);
    clear();
    announce("Order placed. Thank you.");
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center lg:px-8">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-success" />
        <h1 className="display-lg mt-6">Your order is with the makers</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          You'll hear from each artisan in the format you chose. Nothing is mass-packed here — every
          parcel is wrapped by the person who made what's inside it.
        </p>
        <Button asChild size="lg" className="mt-8" variant="ink">
          <Link to="/marketplace">Keep browsing</Link>
        </Button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center lg:px-8">
        <Eyebrow>Your bag</Eyebrow>
        <h1 className="display-lg mt-3">Nothing in the bag yet</h1>
        <p className="mt-4 text-muted-foreground">
          Pick something with a story attached — every piece here has one.
        </p>
        <Button asChild size="lg" className="mt-8" variant="clay">
          <Link to="/marketplace">Browse the collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <Eyebrow>Checkout</Eyebrow>
      <h1 className="display-lg mt-3">Your bag</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <section aria-labelledby="items-heading" className="lg:col-span-7">
          <h2 id="items-heading" className="sr-only">
            Items in your bag
          </h2>
          <ul className="space-y-px bg-border">
            {lines.map((line) => {
              const product = getProduct(line.slug);
              if (!product) return null;
              const artisan = getArtisan(product.artisan);
              return (
                <li key={line.slug} className="flex gap-4 bg-parchment p-4">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    width={900}
                    height={1100}
                    loading="lazy"
                    className="aspect-4/5 w-24 shrink-0 border border-border object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl leading-tight">
                      <Link
                        to="/product/$slug"
                        params={{ slug: product.slug }}
                        className="hover:text-accent"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {artisan?.name} · {artisan?.region}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center border border-foreground/25">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => setQty(product.slug, line.qty - 1)}
                        >
                          <Minus aria-hidden="true" className="size-4" />
                        </Button>
                        <span className="min-w-10 text-center text-sm font-semibold">
                          <span className="sr-only">Quantity: </span>
                          {line.qty}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => setQty(product.slug, line.qty + 1)}
                        >
                          <Plus aria-hidden="true" className="size-4" />
                        </Button>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatPrice(product.price * line.qty)}
                      </p>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          remove(product.slug);
                          announce(`${product.name} removed from your bag.`);
                        }}
                        className="ml-auto"
                      >
                        <Trash2 aria-hidden="true" className="size-4" />
                        Remove
                        <span className="sr-only"> {product.name}</span>
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="checkout-heading" className="lg:col-span-5">
          <div className="border border-border bg-parchment p-6">
            <h2 id="checkout-heading" className="display-lg text-3xl">
              Order summary
            </h2>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Delivery</dt>
                <dd>{formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-lg font-semibold">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>

            <form className="mt-7 space-y-5" onSubmit={onSubmit} noValidate>
              <Field label="Full name" id="name">
                {(props) => (
                  <>
                    <input
                      {...props}
                      name="name"
                      autoComplete="name"
                      className={inputClass}
                      aria-invalid={Boolean(errors["name"])}
                      aria-errormessage={errors["name"] ? "name-error" : undefined}
                    />
                    {errors["name"] ? (
                      <p id="name-error" className="text-sm font-semibold text-destructive">
                        {errors["name"]}
                      </p>
                    ) : null}
                  </>
                )}
              </Field>

              <Field label="Email" id="email" hint="We send one confirmation, nothing else.">
                {(props) => (
                  <>
                    <input
                      {...props}
                      type="email"
                      name="email"
                      autoComplete="email"
                      className={inputClass}
                      aria-invalid={Boolean(errors["email"])}
                      aria-errormessage={errors["email"] ? "email-error" : undefined}
                    />
                    {errors["email"] ? (
                      <p id="email-error" className="text-sm font-semibold text-destructive">
                        {errors["email"]}
                      </p>
                    ) : null}
                  </>
                )}
              </Field>

              <Field label="Delivery address" id="address">
                {(props) => (
                  <>
                    <textarea
                      {...props}
                      name="address"
                      rows={3}
                      autoComplete="street-address"
                      className={inputClass}
                      aria-invalid={Boolean(errors["address"])}
                      aria-errormessage={errors["address"] ? "address-error" : undefined}
                    />
                    {errors["address"] ? (
                      <p id="address-error" className="text-sm font-semibold text-destructive">
                        {errors["address"]}
                      </p>
                    ) : null}
                  </>
                )}
              </Field>

              <fieldset>
                <legend className="text-sm font-semibold">How should we send updates?</legend>
                <div className="mt-3 space-y-2">
                  {CONTACT_MODES.map((mode, i) => (
                    <div key={mode.id} className="flex items-start gap-3">
                      <input
                        id={`contact-${mode.id}`}
                        type="radio"
                        name="contact"
                        value={mode.id}
                        defaultChecked={i === 0}
                        className="mt-1 size-5 accent-[var(--accent)]"
                      />
                      <label htmlFor={`contact-${mode.id}`} className="text-sm">
                        <span className="font-medium">{mode.label}</span>
                        <span className="block text-xs text-muted-foreground">{mode.hint}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <Button type="submit" size="lg" variant="clay" className="w-full">
                Place order · {formatPrice(total)}
              </Button>
              <p className="text-xs text-muted-foreground">
                Prototype checkout — no payment is taken.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
