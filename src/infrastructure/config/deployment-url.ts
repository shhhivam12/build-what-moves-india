type DeploymentEnvironment = Record<string, string | undefined>;

function normaliseOrigin(value: string): string {
  return new URL(value).origin;
}

function vercelOrigin(hostname: string | undefined): string | undefined {
  const host = hostname?.trim();
  return host ? `https://${host}` : undefined;
}

export function getPublicSiteOrigin(environment: DeploymentEnvironment = process.env): string {
  const configuredOrigin = environment.NEXT_PUBLIC_SITE_URL?.trim() || environment.BETTER_AUTH_URL?.trim();
  if (configuredOrigin) return normaliseOrigin(configuredOrigin);

  const productionOrigin = vercelOrigin(environment.VERCEL_PROJECT_PRODUCTION_URL);
  if (productionOrigin) return productionOrigin;

  const deploymentOrigin = vercelOrigin(environment.VERCEL_URL);
  if (deploymentOrigin) return deploymentOrigin;

  return "http://localhost:3000";
}

export function getAuthAllowedHosts(
  environment: DeploymentEnvironment = process.env,
  trustedOrigins: string[] = [],
): string[] {
  const hosts = new Set<string>();

  for (const origin of [environment.BETTER_AUTH_URL, ...trustedOrigins]) {
    if (!origin?.trim()) continue;
    hosts.add(new URL(origin).host);
  }

  for (const hostname of [environment.VERCEL_PROJECT_PRODUCTION_URL, environment.VERCEL_URL]) {
    if (hostname?.trim()) hosts.add(hostname.trim());
  }

  if (environment.VERCEL === "1") hosts.add("*.vercel.app");

  if (environment.NODE_ENV === "development") {
    hosts.add("localhost:3000");
    hosts.add("127.0.0.1:3000");
  }

  return [...hosts];
}
