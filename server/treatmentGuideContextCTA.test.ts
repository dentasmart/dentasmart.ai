import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getPageContext } from "../client/src/lib/pageContext";
import { guidesData } from "../client/src/data/guides";
import { analyticsEventEnvelopeSchema } from "./analyticsValidation";

const mocks = vi.hoisted(() => ({ route: "/", track: vi.fn() }));
vi.mock("wouter", () => ({ Link: "a", useLocation: () => [mocks.route, vi.fn()] }));
vi.mock("@/lib/analytics", () => ({ trackConversionEvent: mocks.track }));
import MidContentCTA from "../client/src/components/MidContentCTA";
import NextStepsBox from "../client/src/components/NextStepsBox";

type Element = React.ReactElement<Record<string, any>>;
function elements(tree: React.ReactNode): Element[] {
  const found: Element[] = [];
  React.Children.forEach(tree, child => {
    if (!React.isValidElement<Record<string, any>>(child)) return;
    found.push(child, ...elements(child.props.children));
  });
  return found;
}
function text(tree: React.ReactNode): string {
  return React.Children.toArray(tree).map(child => React.isValidElement<Record<string, any>>(child)
    ? text(child.props.children) : String(child)).join("");
}
function link(tree: React.ReactNode, label: string): Element {
  const matches = elements(tree).filter(e => e.type === "a" && text(e.props.children) === label);
  expect(matches).toHaveLength(1);
  return matches[0];
}
const route = "/guides/when-to-get-dental-second-opinion";
const genericGuide = {
  contentType: "guide", ctaHeadline: "Put this knowledge into action",
  ctaDescription: "Explore DentaSmart services that can help you apply what you learned and prepare better questions.",
  ctaButtonText: "See DentaSmart Plans", ctaAction: "app-download", ctaLink: "/pricing/",
};
beforeEach(() => { vi.clearAllMocks(); mocks.route = route; vi.stubGlobal("React", React); });
afterEach(() => { vi.unstubAllGlobals(); });

function expectClick(e: Element, id: string) {
  expect(mocks.track).not.toHaveBeenCalled();
  e.props.onClick();
  const expected = ["cta_click", {
    cta_id: id, surface: "mid_content", intent: "content_engagement",
    destination_type: "internal_route", destination_path: "/pricing/",
  }];
  expect(mocks.track.mock.calls).toEqual([expected]);
  const [event_name, fields] = mocks.track.mock.calls[0];
  expect(analyticsEventEnvelopeSchema.safeParse({
    event_name, ...fields, event_version: 1, event_id: "test-event-20261122",
    timestamp: "2026-11-22T15:00:00.000Z", page_path: route + "/",
  }).success).toBe(true);
  // A second activation records a second click, never a purchase or case start.
  e.props.onClick();
  expect(mocks.track.mock.calls).toEqual([expected, expected]);
}

describe("Exact second-opinion guide context", () => {
  it.each([route, route + "/", route.toUpperCase() + "/"])("adds navigation-only context for %s", path => {
    expect(getPageContext(path)).toEqual({ ...genericGuide,
      ctaButtonText: "View Treatment Plan Review", ctaFragment: "#treatment-plan-review" });
  });
  it("leaves every other guide's context unchanged, including existing symptom classification", () => {
    for (const slug of Object.keys(guidesData).filter(s => s !== "when-to-get-dental-second-opinion")) {
      for (const suffix of ["", "/"]) {
        const context = getPageContext(`/guides/${slug}${suffix}`);
        expect(context).not.toHaveProperty("ctaFragment");
        expect(context.ctaButtonText).not.toBe("View Treatment Plan Review");
        if (context.contentType === "guide") expect(context).toEqual(genericGuide);
      }
    }
  });
  it.each([route + "-cost/", route + "/extra", route + "//", "/guides/", "/oral-health-hub/second-opinion/",
    "/treatments/root-canal/", "/conditions/cavities/", "/", "/employers/", "/pricing/"])("does not broaden the exception to %s", path => {
    expect(getPageContext(path)).not.toHaveProperty("ctaFragment");
    expect(getPageContext(path).ctaButtonText).not.toBe("View Treatment Plan Review");
  });
});

describe.each(["interactive", "card", "inline"] as const)("Real MidContentCTA %s", variant => {
  it("renders one native anchored link and preserves its exact navigation-only click event", () => {
    const tree = MidContentCTA({ variant, trackingLabel: "guide_page_mid_cta" });
    const primary = link(tree, "View Treatment Plan Review");
    expect(primary.props.href).toBe("/pricing/#treatment-plan-review");
    expect(primary.props.target).toBeUndefined();
    expect(elements(primary.props.children).some(e => ["a", "button"].includes(String(e.type)))).toBe(false);
    expect(renderToStaticMarkup(tree)).toContain('href="/pricing/#treatment-plan-review"');
    expectClick(primary, "mid_content_guide_page_mid_cta");
  });
  it("preserves explicit label overrides and forced generic-guide context", () => {
    const labelOverride = MidContentCTA({ variant, buttonText: "Custom next step" });
    expect(link(labelOverride, "Custom next step").props.href).toBe("/pricing/#treatment-plan-review");
    const forced = MidContentCTA({ variant, forceContentType: "guide" });
    expect(link(forced, "See DentaSmart Plans").props.href).toBe("/pricing/");
    expect(mocks.track).not.toHaveBeenCalled();
  });
});

describe("Real NextStepsBox", () => {
  it("renders the guide-specific primary link without changing steps or related destinations", () => {
    const tree = NextStepsBox({ forceContentType: "guide" });
    const primary = link(tree, "View Treatment Plan Review");
    expect(primary.props.href).toBe("/pricing/#treatment-plan-review");
    expect(link(tree, "Start Symptom Quiz").props.href).toBe("/symptom-quiz/");
    expect(link(tree, "Oral Health Hub").props.href).toBe("/oral-health-hub/");
    expect(text(tree)).toContain("Choose the next step that fits your goal.");
    expectClick(primary, "next_steps_primary");
  });
  it("retains unrelated guide links and event fields", () => {
    mocks.route = "/guides/brushing-guide/";
    const tree = NextStepsBox({ forceContentType: "guide" });
    const primary = link(tree, "See DentaSmart Plans");
    expect(primary.props.href).toBe("/pricing/");
    expectClick(primary, "next_steps_primary");
  });
});
