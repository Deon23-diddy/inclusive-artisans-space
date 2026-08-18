import { useNavigate } from "@tanstack/react-router";
import { Mic, MicOff, Search } from "lucide-react";
import { useRef, useState } from "react";
import { useA11y } from "@/lib/a11y";
import { Button, inputClass } from "./ui-kit";

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function getRecognition(): SpeechRecognitionLike | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

export function VoiceSearch({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const { announce } = useA11y();
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const submit = (query: string) => {
    const q = query.trim();
    navigate({ to: "/marketplace", search: q ? { q } : {} });
    announce(q ? `Searching for ${q}` : "Showing all pieces");
  };

  const toggleVoice = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = getRecognition();
    if (!recognition) {
      announce("Voice search is not supported in this browser. Please type instead.");
      return;
    }
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      setValue(transcript);
      submit(transcript);
    };
    recognition.onerror = () => {
      setListening(false);
      announce("Sorry, I did not catch that. Please try again or type your search.");
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    announce("Listening. Say what you are looking for.");
    recognition.start();
  };

  return (
    <form
      role="search"
      className="flex w-full items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        submit(value);
      }}
    >
      <div className="relative flex-1">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <label htmlFor="site-search" className="sr-only">
          Search crafts, makers or materials
        </label>
        <input
          id="site-search"
          type="search"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={compact ? "Search" : "Search indigo, terracotta, brass…"}
          className={`${inputClass} pl-9`}
        />
      </div>
      <Button
        type="button"
        variant={listening ? "clay" : "outline"}
        size="icon"
        aria-pressed={listening}
        aria-label={listening ? "Stop voice search" : "Search using your voice"}
        onClick={toggleVoice}
      >
        {listening ? (
          <MicOff aria-hidden="true" className="size-5" />
        ) : (
          <Mic aria-hidden="true" className="size-5" />
        )}
      </Button>
      <Button type="submit" variant="ink" className="hidden sm:inline-flex">
        Search
      </Button>
    </form>
  );
}
