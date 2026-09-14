import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const clientRoot = path.resolve(import.meta.dirname, "../client");
const indexHtml = fs.readFileSync(path.join(clientRoot, "index.html"), "utf8");
const indexCss = fs.readFileSync(path.join(clientRoot, "src/index.css"), "utf8");
const navigationSource = fs.readFileSync(path.join(clientRoot, "src/components/Navigation.tsx"), "utf8");
const consentSource = fs.readFileSync(path.join(clientRoot, "src/components/ConsentManager.tsx"), "utf8");

describe("Phase 4 Batch 4-A accessibility foundations", () => {
  it("keeps a non-restrictive responsive viewport", () => {
    expect(indexHtml).toContain('content="width=device-width, initial-scale=1.0"');
    expect(indexHtml).not.toContain("maximum-scale=1");
    expect(indexHtml).not.toContain("user-scalable=no");
  });

  it("connects the mobile menu toggle to its real controlled menu", () => {
    expect(navigationSource).toContain('const MOBILE_NAV_MENU_ID = "mobile-navigation-menu"');
    expect(navigationSource).toContain("aria-expanded={isOpen}");
    expect(navigationSource).toContain("aria-controls={MOBILE_NAV_MENU_ID}");
    expect(navigationSource).toContain("id={MOBILE_NAV_MENU_ID}");
    expect(navigationSource).toContain('aria-label="Toggle menu"');
  });

  it("connects the desktop Learn disclosure to its real controlled menu", () => {
    expect(navigationSource).toContain('const DESKTOP_LEARN_MENU_ID = "desktop-learn-menu"');
    expect(navigationSource).toContain("aria-expanded={megaMenuOpen}");
    expect(navigationSource).toContain("aria-controls={DESKTOP_LEARN_MENU_ID}");
    expect(navigationSource).toContain("id={DESKTOP_LEARN_MENU_ID}");
  });

  it("implements scoped Escape close behavior for both disclosures", () => {
    expect(navigationSource).toContain('if (event.key !== "Escape") return;');
    expect(navigationSource).toContain("if (megaMenuOpen)");
    expect(navigationSource).toContain("setMegaMenuOpen(false)");
    expect(navigationSource).toContain("setIsOpen(false)");
    expect(navigationSource).toContain('window.addEventListener("keydown", handleEscape)');
    expect(navigationSource).toContain('window.removeEventListener("keydown", handleEscape)');
  });

  it("restores focus to the matching disclosure trigger after Escape", () => {
    expect(navigationSource).toContain("desktopLearnButtonRef.current?.focus()");
    expect(navigationSource).toContain("mobileMenuButtonRef.current?.focus()");
  });

  it("preserves native navigation links and menu close handlers", () => {
    expect(navigationSource).toContain("href={item.href}");
    expect(navigationSource).toContain("onClick={() => setIsOpen(false)}");
    expect(navigationSource).toContain("setMobileLearnOpen(false)");
  });

  it("defines a shared focus-visible baseline without removing browser focus", () => {
    expect(indexCss).toContain(":focus-visible");
    expect(indexCss).toContain("outline: 2px solid var(--foreground) !important");
    expect(indexCss).toContain("box-shadow: 0 0 0 4px var(--ring) !important");
  });

  it("defines a shared reduced-motion baseline and navigation motion guard", () => {
    expect(indexCss).toContain("@media (prefers-reduced-motion: reduce)");
    expect(indexCss).toContain("transition-duration: 0.01ms !important");
    expect(navigationSource).toContain("useReducedMotion");
    expect(navigationSource).toContain("const shouldReduceMotion = useReducedMotion()");
  });

  it("keeps consent focus inside the modal and prevents background pointer interaction", () => {
    expect(consentSource).toContain('aria-modal="true"');
    expect(consentSource).toContain('aria-describedby="consent-dialog-description"');
    expect(consentSource).toContain('className="fixed inset-0 z-[99]"');
    expect(consentSource).toContain('if (event.key !== "Tab") return;');
    expect(consentSource).toContain('window.addEventListener("keydown", trapFocus)');
    expect(consentSource).toContain('window.removeEventListener("keydown", trapFocus)');
  });

  it("keeps Accept all visually equivalent to Reject non-essential with a compliant foreground pairing", () => {
    const acceptAllControl = consentSource.match(/<button[^>]*onClick=\{\(\) => save\(\{ analytics: true, marketing: true \}\)\}[^>]*className="([^"]+)"/);
    expect(acceptAllControl?.[1]).toContain("border border-border bg-background");
    expect(acceptAllControl?.[1]).toContain("text-foreground");
    expect(acceptAllControl?.[1]).not.toContain("bg-primary");
  });
});
