import * as Dialog from "@radix-ui/react-dialog";
import { Accessibility, Minus, Plus, RotateCcw, X } from "lucide-react";
import { useA11y } from "@/lib/a11y";
import { Button } from "./ui-kit";
import { cn } from "@/lib/utils";

const SCALES = [1, 1.15, 1.3, 1.5];

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full min-h-11 items-start justify-between gap-4 border border-border bg-parchment px-4 py-3 text-left transition-colors hover:bg-secondary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex h-6 w-11 shrink-0 items-center border p-0.5 transition-colors",
          checked ? "border-accent bg-accent" : "border-foreground/40 bg-muted",
        )}
      >
        <span
          className={cn(
            "block size-4 bg-background transition-transform",
            checked && "translate-x-5",
          )}
        />
      </span>
    </button>
  );
}

export function AccessibilityPanel() {
  const { settings, set, reset, announce } = useA11y();
  const scaleIndex = SCALES.indexOf(settings.textScale);

  const changeScale = (delta: number) => {
    const next = SCALES[Math.min(SCALES.length - 1, Math.max(0, scaleIndex + delta))];
    if (next === undefined) return;
    set("textScale", next);
    announce(`Text size ${Math.round(next * 100)} percent`);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="fixed right-4 bottom-4 z-50 flex min-h-13 items-center gap-2 border border-primary bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary/88 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring"
        >
          <Accessibility aria-hidden="true" className="size-5" />
          Accessibility
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-primary/45" />
        <Dialog.Content className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-md flex-col overflow-y-auto border-l border-border bg-background shadow-lift focus:outline-none">
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
            <div>
              <Dialog.Title className="display-lg text-3xl">Make it yours</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                Your choices are saved on this device and apply across every page.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close accessibility settings">
                <X aria-hidden="true" className="size-5" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="space-y-3 px-6 py-6">
            <div className="border border-border bg-parchment px-4 py-3">
              <p className="text-sm font-semibold">Text size</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Currently {Math.round(settings.textScale * 100)}% of normal.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Decrease text size"
                  disabled={scaleIndex <= 0}
                  onClick={() => changeScale(-1)}
                >
                  <Minus aria-hidden="true" className="size-5" />
                </Button>
                <div
                  className="flex flex-1 items-center gap-1"
                  role="meter"
                  aria-label="Text size level"
                  aria-valuenow={scaleIndex + 1}
                  aria-valuemin={1}
                  aria-valuemax={SCALES.length}
                >
                  {SCALES.map((s, i) => (
                    <span
                      key={s}
                      aria-hidden="true"
                      className={cn("h-2 flex-1", i <= scaleIndex ? "bg-accent" : "bg-muted")}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Increase text size"
                  disabled={scaleIndex >= SCALES.length - 1}
                  onClick={() => changeScale(1)}
                >
                  <Plus aria-hidden="true" className="size-5" />
                </Button>
              </div>
            </div>

            <Toggle
              label="High contrast"
              description="Pure black on white, heavier borders, no tints."
              checked={settings.contrast === "high"}
              onChange={(next) => {
                set("contrast", next ? "high" : "normal");
                announce(next ? "High contrast on" : "High contrast off");
              }}
            />
            <Toggle
              label="Readable font"
              description="Atkinson Hyperlegible, with wider letter and word spacing."
              checked={settings.readable}
              onChange={(next) => {
                set("readable", next);
                announce(next ? "Readable font on" : "Readable font off");
              }}
            />
            <Toggle
              label="Easy read mode"
              description="Short sentences and plain words in place of long story text."
              checked={settings.easyRead}
              onChange={(next) => {
                set("easyRead", next);
                announce(next ? "Easy read mode on" : "Easy read mode off");
              }}
            />
            <Toggle
              label="Underline links"
              description="Never rely on colour alone to spot a link."
              checked={settings.underline}
              onChange={(next) => set("underline", next)}
            />
            <Toggle
              label="Animation"
              description="Turn off movement and transitions across the site."
              checked={!settings.motion}
              onChange={(next) => {
                set("motion", !next);
                announce(next ? "Animation reduced" : "Animation on");
              }}
            />

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                reset();
                announce("Accessibility settings reset");
              }}
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              Reset to defaults
            </Button>

            <p className="pt-2 text-xs text-muted-foreground">
              We also respect your system settings for reduced motion and text size, without you
              touching this panel.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
