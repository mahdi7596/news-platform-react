import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeStyle } from "../models/ThemeStyles";

type ThemeContextValue = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

// Provide an explicit type; start with undefined so we can guard in the hook
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeStyle | string>(
    localStorage.getItem("theme") ?? ThemeStyle.Cupcake
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Remove the temporary no-transitions class after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      document.documentElement.classList.remove("no-transitions");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
