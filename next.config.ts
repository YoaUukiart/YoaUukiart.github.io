import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? "/").split("/");
const isUserOrOrganizationSite =
  Boolean(owner && repository) && repository === `${owner}.github.io`;
const basePath =
  isGitHubPages && repository && !isUserOrOrganizationSite
    ? `/${repository}`
    : "";
const siteUrl =
  isGitHubPages && owner
    ? `https://${owner}.github.io${basePath}`
    : process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
