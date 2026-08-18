import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type A11ySettings = {
  textScale: number;
  contrast: "normal" | "high";
  readable: boolean;
  motion: boolean;
  underline: boolean;
  easyRead: boolean;
};

const DEFAULTS: A11ySettings = {
  textScale: 1,
  contrast: "normal",
  readable: false,
  motion: true,
  underline: false,
  easyRead: false,
};

const STORAGE_KEY = "kaaru.a11y";

type A11yContextValue = {
  settings: A11ySettings;
  set: <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => void;
  reset: () => void;
  announce: (message: string) => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  speaking: boolean;
};

const A11yContext = createContext<A11yContextValue | null>(null);

export function A11yProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const [message, setMessage] = useState("");
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULTS, ...(JSON.parse(raw) as Partial<A11ySettings>) });
    } catch {
      /* ignore unreadable storage */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--text-scale", String(settings.textScale));
    root.dataset["contrast"] = settings.contrast;
    root.dataset["readable"] = settings.readable ? "on" : "off";
    root.dataset["motion"] = settings.motion ? "on" : "off";
    root.dataset["underline"] = settings.underline ? "on" : "off";
    root.dataset["easyread"] = settings.easyRead ? "on" : "off";
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage may be unavailable */
    }
  }, [settings]);

  const set = useCallback<A11yContextValue["set"]>((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const announce = useCallback((next: string) => {
    setMessage("");
    window.setTimeout(() => setMessage(next), 60);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        announce("Audio description is not supported in this browser.");
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [announce],
  );

  useEffect(() => () => stopSpeaking(), [stopSpeaking]);

  const value = useMemo(
    () => ({ settings, set, reset: () => setSettings(DEFAULTS), announce, speak, stopSpeaking, speaking }),
    [settings, set, announce, speak, stopSpeaking, speaking],
  );

  return (
    <A11yContext.Provider value={value}>
      {children}
      <p aria-live="polite" role="status" className="sr-only">
        {message}
      </p>
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used inside A11yProvider");
  return ctx;
}
