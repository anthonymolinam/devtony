import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { applyTheme, currentTheme, storeTheme } from "@/scripts/theme";

export default function ThemeToggle() {
  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    storeTheme(next);
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle color theme">
      <SunIcon className="theme-toggle__sun" size={20} aria-hidden="true" />
      <MoonIcon className="theme-toggle__moon" size={20} aria-hidden="true" />
    </button>
  );
}
