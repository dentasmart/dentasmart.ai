import * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Callback-level tests of the real components, not source-text assertions.
 * The small hook runner preserves state/effect dependencies across renders;
 * visual wrappers, routing, analytics delivery, and tRPC transport are mocked.
 * This is NOT a DOM/browser renderer: native validity, real consent, SPA/store
 * navigation, layout, and provider/runtime integration need browser coverage.
 */
const mocks = vi.hoisted(() => ({
  active: null as any,
  route: "/",
  track: vi.fn(),
  mutate: vi.fn(),
  mutationOptions: null as null | {
    onSuccess: (data: Record<string, unknown>) => void;
    onError: (error: Error) => void;
  },
}));

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useState: (initial: unknown) => mocks.active.useState(initial),
    useRef: (initial: unknown) => mocks.active.useRef(initial),
    useEffect: (effect: () => void | (() => void), deps?: unknown[]) =>
      mocks.active.useEffect(effect, deps),
  };
});
vi.mock("wouter", () => ({ Link: "a", useLocation: () => [mocks.route, vi.fn()] }));
vi.mock("framer-motion", () => ({
  motion: { nav: "nav", div: "div", span: "span" },
  AnimatePresence: "animation-presence",
  useReducedMotion: () => true,
}));
vi.mock("lucide-react", () => ({
  ChevronDown: "svg", ChevronRight: "svg", Stethoscope: "svg", DollarSign: "svg",
  ShieldCheck: "svg", HeartPulse: "svg", BookOpen: "svg", Scale: "svg",
  HelpCircle: "svg", Activity: "svg", Search: "svg", CheckCircle2: "svg", Loader2: "svg",
}));
vi.mock("@/components/ui/button", () => ({ Button: "button" }));
vi.mock("@/components/ui/input", () => ({ Input: "input" }));
vi.mock("@/components/ui/label", () => ({ Label: "label" }));
vi.mock("@/components/ui/textarea", () => ({ Textarea: "textarea" }));
vi.mock("@/components/ui/dialog", () => ({
  Dialog: "dialog", DialogContent: "section", DialogHeader: "header",
  DialogTitle: "h2", DialogDescription: "p",
}));
vi.mock("@/components/ui/breadcrumb", () => ({
  Breadcrumb: "nav", BreadcrumbItem: "li", BreadcrumbLink: "a", BreadcrumbList: "ol",
  BreadcrumbPage: "span", BreadcrumbSeparator: "span",
}));
vi.mock("@/lib/analytics", () => ({ trackConversionEvent: mocks.track }));
vi.mock("@/lib/trpc", () => ({
  trpc: { waitlist: { joinBenefits: { useMutation: (options: typeof mocks.mutationOptions) => {
    mocks.mutationOptions = options;
    return { mutate: mocks.mutate, isPending: false };
  } } } },
}));

import Navigation from "../client/src/components/Navigation";
import { DemoRequestModal } from "../client/src/components/DemoRequestModal";

type Element = React.ReactElement<Record<string, any>>;
type Effect = { deps?: unknown[]; cleanup?: () => void };
const runners: HookRunner[] = [];

class HookRunner {
  private slots: unknown[] = [];
  private effects = new Map<number, Effect>();
  private pending: Array<() => void> = [];
  private cursor = 0;
  private dirty = false;
  tree: React.ReactNode;

  constructor(private component: () => React.ReactNode) { runners.push(this); }

  useState(initial: unknown) {
    const index = this.cursor++;
    if (!(index in this.slots)) this.slots[index] = typeof initial === "function" ? initial() : initial;
    return [this.slots[index], (next: unknown) => {
      const value = typeof next === "function" ? next(this.slots[index]) : next;
      if (!Object.is(value, this.slots[index])) { this.slots[index] = value; this.dirty = true; }
    }];
  }

  useRef(initial: unknown) {
    const index = this.cursor++;
    if (!(index in this.slots)) this.slots[index] = { current: initial };
    return this.slots[index];
  }

  useEffect(effect: () => void | (() => void), deps?: unknown[]) {
    const index = this.cursor++;
    const previous = this.effects.get(index);
    if (previous && deps && previous.deps && deps.length === previous.deps.length &&
      deps.every((value, i) => Object.is(value, previous.deps![i]))) return;
    this.pending.push(() => {
      previous?.cleanup?.();
      this.effects.set(index, { deps, cleanup: effect() || undefined });
    });
  }

  render(): React.ReactNode {
    let renders = 0;
    do {
      if (++renders > 20) throw new Error("Hook runner did not settle");
      this.cursor = 0;
      this.dirty = false;
      mocks.active = this;
      try { this.tree = this.component(); } finally { mocks.active = null; }
      this.pending.splice(0).forEach((effect) => effect());
    } while (this.dirty);
    return this.tree;
  }

  dispose() { this.effects.forEach((effect) => effect.cleanup?.()); }
}

function elements(tree: React.ReactNode): Element[] {
  const result: Element[] = [];
  React.Children.forEach(tree, (child) => {
    if (!React.isValidElement<Record<string, any>>(child)) return;
    result.push(child);
    result.push(...elements(child.props.children));
  });
  return result;
}

function one(tree: React.ReactNode, predicate: (element: Element) => boolean): Element {
  const matches = elements(tree).filter(predicate);
  expect(matches).toHaveLength(1);
  return matches[0];
}

function text(tree: React.ReactNode): string {
  return React.Children.toArray(tree).map((child): string =>
    React.isValidElement<Record<string, any>>(child) ? text(child.props.children) : String(child),
  ).join("");
}

function button(tree: React.ReactNode, label: string) {
  return one(tree, (element) => element.type === "button" && text(element.props.children) === label);
}

const privateValues = {
  fullName: "Private Regression Person",
  email: "private-regression@example.invalid",
  phone: "+15559876543",
  employeeCount: "98765",
  notes: "Private symptoms and employer notes sentinel",
};
const employerFields = { surface: "employer_form", intent: "employer_demo", destination_type: "employer_form" };
const attempt = ["employer_demo_submit_attempt", { cta_id: "employer_demo_form_submit_attempt", ...employerFields }];
const submitted = ["employer_demo_submitted", { cta_id: "employer_demo_form_submitted", ...employerFields }];
let listeners: Map<string, Set<() => void>>;
let browser: { scrollY: number; location: { pathname: string; hash: string; href: string }; addEventListener: ReturnType<typeof vi.fn>; removeEventListener: ReturnType<typeof vi.fn> };
let scrollIntoView: ReturnType<typeof vi.fn>;
let getElementById: ReturnType<typeof vi.fn>;
let fetchGuard: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.clearAllMocks();
  mocks.route = "/";
  mocks.mutationOptions = null;
  listeners = new Map();
  browser = {
    scrollY: 0,
    location: { pathname: "/", hash: "", href: "/" },
    addEventListener: vi.fn((name: string, callback: () => void) => {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name)!.add(callback);
    }),
    removeEventListener: vi.fn((name: string, callback: () => void) => listeners.get(name)?.delete(callback)),
  };
  scrollIntoView = vi.fn();
  getElementById = vi.fn(() => ({ scrollIntoView }));
  fetchGuard = vi.fn(() => { throw new Error("Unexpected network call in isolated callback test"); });
  vi.stubGlobal("React", React); // Also supports the config's classic TSX transform.
  vi.stubGlobal("window", browser);
  vi.stubGlobal("document", { getElementById, addEventListener: vi.fn(), removeEventListener: vi.fn() });
  vi.stubGlobal("fetch", fetchGuard);
});

afterEach(() => {
  try {
    expect(fetchGuard).not.toHaveBeenCalled();
    const serialized = JSON.stringify(mocks.track.mock.calls);
    for (const value of Object.values(privateValues)) expect(serialized).not.toContain(value);
    expect(serialized).not.toContain("private-backend-error");
    // Exact event expectations below are supplemented by a payload-key allowlist.
    for (const [, fields] of mocks.track.mock.calls) {
      expect(Object.keys(fields).every((key) => [
        "cta_id", "surface", "intent", "destination_type", "destination_path",
      ].includes(key))).toBe(true);
    }
  } finally {
    runners.splice(0).forEach((runner) => runner.dispose());
    vi.unstubAllGlobals();
  }
});

function navigation(path = "/") {
  mocks.route = path;
  browser.location.pathname = path;
  browser.location.href = path;
  const runner = new HookRunner(() => Navigation());
  runner.render();
  return runner;
}

function quickCheck(runner: HookRunner, device: "desktop" | "mobile") {
  if (device === "desktop") return button(runner.tree, "Free Quick Check");
  one(runner.tree, (element) => element.props["aria-label"] === "Toggle menu").props.onClick();
  runner.render();
  const menu = one(runner.tree, (element) => element.props.id === "mobile-navigation-menu");
  return button(menu, "Free Quick Check");
}

function expectMobileClosed(runner: HookRunner, device: string) {
  if (device !== "mobile") return;
  runner.render();
  expect(one(runner.tree, (element) => element.props["aria-label"] === "Toggle menu").props["aria-expanded"]).toBe(false);
}

function scroll(runner: HookRunner, y: number) {
  browser.scrollY = y;
  listeners.get("scroll")?.forEach((callback) => callback());
  runner.render();
}

describe("Navigation visible breadcrumbs", () => {
  const lists = (runner: HookRunner) => elements(runner.tree).filter((element) => element.type === "ol");

  it.each(["/oral-health-hub", "/oral-health-hub/"])("omits the Hub index breadcrumb on %s, including after mobile menu disclosure", (path) => {
    const runner = navigation(path);
    expect(lists(runner)).toHaveLength(0);
    const toggle = () => {
      one(runner.tree, (element) => element.props["aria-label"] === "Toggle menu").props.onClick();
      runner.render();
    };
    toggle();
    expect(lists(runner)).toHaveLength(0);
    toggle();
    expect(lists(runner)).toHaveLength(0);
    expect(mocks.track).not.toHaveBeenCalled();
  });

  it.each([
    ["/conditions/", "HomeConditions"],
    ["/symptoms/tooth-pain-when-biting/", "HomeSymptomsTooth Pain When Biting"],
    ["/treatments/braces/", "HomeTreatmentsBraces"],
  ])("retains the existing hierarchy breadcrumb on %s", (path, expected) => {
    const runner = navigation(path);
    expect(lists(runner)).toHaveLength(1);
    expect(text(lists(runner)[0])).toBe(expected);
    expect(mocks.track).not.toHaveBeenCalled();
  });

  it("removes and restores only the visible breadcrumb when the SPA route changes", () => {
    const runner = navigation("/conditions/");
    expect(lists(runner)).toHaveLength(1);
    mocks.route = "/oral-health-hub/";
    runner.render();
    expect(lists(runner)).toHaveLength(0);
    mocks.route = "/conditions/";
    runner.render();
    expect(text(lists(runner)[0])).toBe("HomeConditions");
    expect(mocks.track).not.toHaveBeenCalled();
  });
});

describe("Navigation approved brand lockup", () => {
  it.each(["/", "/pricing/", "/oral-health-hub/"])("renders the exact tagline on %s before and after mobile menu disclosure", (path) => {
    const runner = navigation(path);
    const expectTagline = () => {
      const treeText = text(runner.tree);
      expect(treeText.match(/Better Teeth\. Lower Costs(?!\.)/g)).toHaveLength(1);
      expect(treeText).not.toContain("Your Personal AI Dentist in Your Pocket");
      expect(mocks.track).not.toHaveBeenCalled();
    };
    expectTagline();
    one(runner.tree, (element) => element.props["aria-label"] === "Toggle menu").props.onClick();
    runner.render();
    expectTagline();
  });
});

describe.each(["desktop", "mobile"] as const)("Navigation %s Free Quick Check callbacks", (device) => {
  const ctaId = device === "desktop" ? "header_free_quick_check" : "mobile_header_free_quick_check";

  it("scrolls on the homepage with exactly one cta_click per activation, never a quick-check outcome", () => {
    const runner = navigation();
    expect(mocks.track).not.toHaveBeenCalled();
    const expected = ["cta_click", {
      cta_id: ctaId, surface: "header", intent: "quick_check",
      destination_type: "internal_route", destination_path: "/#download-cta",
    }];
    quickCheck(runner, device).props.onClick();
    expect(mocks.track.mock.calls).toEqual([expected]);
    expect(getElementById.mock.calls).toEqual([["download-cta"]]);
    expect(scrollIntoView.mock.calls).toEqual([[{ behavior: "smooth" }]]);
    expect(browser.location.href).toBe("/");
    expectMobileClosed(runner, device);

    quickCheck(runner, device).props.onClick();
    runner.render();
    expect(mocks.track.mock.calls).toEqual([expected, expected]);
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it("does not fabricate a quick_check_start when the homepage scroll target is absent", () => {
    getElementById.mockReturnValue(null);
    const runner = navigation();
    expect(() => quickCheck(runner, device).props.onClick()).not.toThrow();
    expect(mocks.track.mock.calls).toEqual([["cta_click", {
      cta_id: ctaId, surface: "header", intent: "quick_check",
      destination_type: "internal_route", destination_path: "/#download-cta",
    }]]);
    expect(scrollIntoView).not.toHaveBeenCalled();
    expect(browser.location.href).toBe("/");
    expectMobileClosed(runner, device);
  });

  it.each(["/pricing/", "/oral-health-hub/"])("opens the download hub from %s with quick_check intent and one event", (path) => {
    const runner = navigation(path);
    quickCheck(runner, device).props.onClick();
    runner.render();
    expect(mocks.track.mock.calls).toEqual([["download_hub_open", {
      cta_id: ctaId, surface: "header", intent: "quick_check",
      destination_type: "internal_route", destination_path: "/download/",
    }]]);
    expect(browser.location.href).toBe("/download/");
    expect(getElementById).not.toHaveBeenCalled();
    expect(scrollIntoView).not.toHaveBeenCalled();
    expectMobileClosed(runner, device);
  });
});

describe("Navigation sticky quick-check callback", () => {
  it.each(["/", "/pricing/"])("opens the download hub from %s even on the homepage, retaining sticky identity", (path) => {
    const runner = navigation(path);
    const stickyButtons = () => elements(runner.tree).filter((element) =>
      element.type === "button" && text(element.props.children) === "Start Free Quick Check");
    expect(stickyButtons()).toHaveLength(0);
    scroll(runner, 600);
    expect(stickyButtons()).toHaveLength(0);
    scroll(runner, 601);
    expect(stickyButtons()).toHaveLength(1);
    expect(mocks.track).not.toHaveBeenCalled();
    button(runner.tree, "Start Free Quick Check").props.onClick();
    runner.render();
    expect(mocks.track.mock.calls).toEqual([["download_hub_open", {
      cta_id: "header_sticky_free_quick_check", surface: "sticky", intent: "quick_check",
      destination_type: "internal_route", destination_path: "/download/",
    }]]);
    expect(browser.location.href).toBe("/download/");
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("does not emit on scroll or menu disclosure, and hides the sticky control while the mobile menu is open", () => {
    const runner = navigation();
    scroll(runner, 700);
    button(runner.tree, "Start Free Quick Check");
    one(runner.tree, (element) => element.props["aria-label"] === "Toggle menu").props.onClick();
    runner.render();
    expect(elements(runner.tree).some((element) =>
      element.type === "button" && text(element.props.children) === "Start Free Quick Check")).toBe(false);
    expect(mocks.track).not.toHaveBeenCalled();
  });
});

function demo() {
  const runner = new HookRunner(() => DemoRequestModal({ isOpen: true, onClose: vi.fn() }));
  runner.render();
  return runner;
}

function populate(runner: HookRunner) {
  for (const [id, value] of Object.entries(privateValues)) {
    one(runner.tree, (element) => element.props.id === id).props.onChange({ target: { value: ` ${value} ` } });
    runner.render();
  }
}

function submitForm(runner: HookRunner) {
  const preventDefault = vi.fn();
  one(runner.tree, (element) => element.type === "form").props.onSubmit({ preventDefault });
  expect(preventDefault).toHaveBeenCalledTimes(1);
  runner.render();
  expect(button(runner.tree, "Sending Request...").props.disabled).toBe(true);
}

describe("DemoRequestModal actual submit and mutation callbacks", () => {
  it("declares required fields and native input types (attributes only, not browser validity)", () => {
    const runner = demo();
    for (const id of ["fullName", "email", "phone", "employeeCount"]) {
      expect(one(runner.tree, (element) => element.props.id === id).props.required).toBe(true);
    }
    for (const [id, type] of [["email", "email"], ["phone", "tel"], ["employeeCount", "number"]]) {
      expect(one(runner.tree, (element) => element.props.id === id).props.type).toBe(type);
    }
    expect(one(runner.tree, (element) => element.props.id === "notes").props.required).not.toBe(true);
    expect(mocks.track).not.toHaveBeenCalled();
    expect(mocks.mutate).not.toHaveBeenCalled();
  });

  it.each([
    { label: "new request without duplicate flag", data: { success: true }, emits: true },
    { label: "new request with explicit false duplicate flag", data: { success: true, alreadyExists: false }, emits: true },
    { label: "duplicate request", data: { success: true, alreadyExists: true }, emits: false },
    { label: "false success result", data: { success: false, alreadyExists: false }, emits: false },
    { label: "false success plus duplicate", data: { success: false, alreadyExists: true }, emits: false },
    { label: "missing success result", data: {}, emits: false },
    { label: "truthy but non-boolean success", data: { success: "true" }, emits: false },
  ])("$label: preserves success UI but records a lead only for a new true success", ({ data, emits }) => {
    const runner = demo();
    populate(runner);
    submitForm(runner);
    expect(mocks.track.mock.calls).toEqual([attempt]);
    expect(mocks.mutate.mock.calls).toEqual([[{
      name: privateValues.fullName, email: privateValues.email, phone: privateValues.phone,
      message: `Employer demo request\nTotal employees: ${privateValues.employeeCount}\nNotes: ${privateValues.notes}`,
    }]]);
    mocks.mutationOptions!.onSuccess({ ...data, email: privateValues.email, message: privateValues.notes });
    runner.render();
    expect(mocks.track.mock.calls).toEqual(emits ? [attempt, submitted] : [attempt]);
    expect(elements(runner.tree).some((element) => element.type === "form")).toBe(false);
    expect(text(runner.tree)).toContain("Request Received!");
    button(runner.tree, "Back to Website");
    // An ordinary re-render must not re-emit either callback event.
    runner.render();
    expect(mocks.track).toHaveBeenCalledTimes(emits ? 2 : 1);
  });

  it("records failed attempts but no lead; retry recovery records one new attempt and one eventual lead", () => {
    const runner = demo();
    populate(runner);
    submitForm(runner);
    mocks.mutationOptions!.onError(new Error(`private-backend-error ${privateValues.email}`));
    runner.render();
    expect(mocks.track.mock.calls).toEqual([attempt]);
    expect(button(runner.tree, "Schedule My Demo").props.disabled).toBe(false);
    expect(text(one(runner.tree, (element) => element.props.role === "alert")))
      .toContain("We could not send your demo request. Please try again.");
    expect(text(runner.tree)).not.toContain("private-backend-error");
    expect(text(runner.tree)).not.toContain("Request Received!");
    button(runner.tree, "Try Again").props.onClick();
    runner.render();
    expect(elements(runner.tree).some((element) => element.props.role === "alert")).toBe(false);
    expect(mocks.track.mock.calls).toEqual([attempt]);
    expect(mocks.mutate).toHaveBeenCalledTimes(1);
    submitForm(runner);
    expect(mocks.mutate).toHaveBeenCalledTimes(2);
    expect(mocks.track.mock.calls).toEqual([attempt, attempt]);
    mocks.mutationOptions!.onSuccess({ success: true, alreadyExists: false });
    runner.render();
    expect(mocks.track.mock.calls).toEqual([attempt, attempt, submitted]);
    expect(text(runner.tree)).toContain("Request Received!");
  });
});
