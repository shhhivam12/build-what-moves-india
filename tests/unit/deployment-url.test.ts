import { getAuthAllowedHosts, getPublicSiteOrigin } from "@/src/infrastructure/config/deployment-url";

describe("deployment URL configuration", () => {
  it("prefers the explicit public origin and removes paths and trailing slashes", () => {
    expect(
      getPublicSiteOrigin({
        NEXT_PUBLIC_SITE_URL: "https://citizen.example.gov.in/portal/",
        VERCEL_PROJECT_PRODUCTION_URL: "ignored.vercel.app",
      }),
    ).toBe("https://citizen.example.gov.in");
  });

  it("uses Vercel's production URL when no explicit origin is configured", () => {
    expect(getPublicSiteOrigin({ VERCEL_PROJECT_PRODUCTION_URL: "cpgrams-demo.vercel.app" })).toBe(
      "https://cpgrams-demo.vercel.app",
    );
  });

  it("allows configured hosts and Vercel previews only on Vercel", () => {
    expect(
      getAuthAllowedHosts(
        {
          BETTER_AUTH_URL: "https://cpgrams-demo.vercel.app",
          VERCEL: "1",
          VERCEL_URL: "cpgrams-demo-git-main-team.vercel.app",
        },
        ["https://citizen.example.gov.in"],
      ),
    ).toEqual([
      "cpgrams-demo.vercel.app",
      "citizen.example.gov.in",
      "cpgrams-demo-git-main-team.vercel.app",
      "*.vercel.app",
    ]);
  });
});
