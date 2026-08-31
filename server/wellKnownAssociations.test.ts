import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { setStaticHeaders } from "./_core/vite";

const publicWellKnownDir = resolve(process.cwd(), "client/public/.well-known");

describe("public app association files", () => {
  it("publishes the extensionless Apple App Site Association contract", () => {
    const raw = readFileSync(
      resolve(publicWellKnownDir, "apple-app-site-association"),
      "utf8",
    );

    expect(JSON.parse(raw)).toEqual({
      applinks: {
        details: [
          {
            appIDs: ["CGWX99R5NK.com.denta.smart.app.ios"],
            components: [
              {
                "/": "/app/*",
                comment: "Any DentaSmart Universal Link opens the app",
              },
            ],
          },
        ],
      },
    });
  });

  it("serves the extensionless Apple association file as JSON", () => {
    const headers = new Map<string, string>();

    setStaticHeaders(
      {
        setHeader(name, value) {
          headers.set(name, value);
        },
      },
      resolve(publicWellKnownDir, "apple-app-site-association"),
    );

    expect(headers.get("Content-Type")).toBe("application/json; charset=utf-8");
  });
});
