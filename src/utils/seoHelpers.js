export const SITE_URL = "https://hcinterior.in";
export const DEFAULT_SITEMAP_CHANGE_FREQUENCY = "monthly";
export const DEFAULT_SITEMAP_PRIORITY = 0.8;
export const SITEMAP_CHANGE_FREQUENCY_OPTIONS = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
];

export function normalizeBoolean(value, fallback = true) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes", "on"].includes(normalized)) return true;
    if (["false", "0", "no", "off"].includes(normalized)) return false;
  }
  if (typeof value === "number") return value !== 0;
  return fallback;
}

export function extractCanonicalValue(rawValue) {
  if (typeof rawValue !== "string") return "";

  const trimmedValue = rawValue.trim();
  if (!trimmedValue) return "";

  const hrefMatch = trimmedValue.match(/href\s*=\s*["“']([^"'”]+)["”']/i);
  return hrefMatch?.[1]?.trim() || trimmedValue;
}

export function normalizeUrl(rawValue, siteUrl = SITE_URL) {
  const value = extractCanonicalValue(rawValue);
  if (!value) return "";

  try {
    const parsedUrl = value.startsWith("http")
      ? new URL(value)
      : new URL(value.startsWith("/") ? value : `/${value}`, siteUrl);

    const normalizedPath =
      parsedUrl.pathname !== "/"
        ? parsedUrl.pathname.replace(/\/+$/, "")
        : parsedUrl.pathname;

    return `${parsedUrl.origin}${normalizedPath}${parsedUrl.search}`;
  } catch (error) {
    return "";
  }
}

export function getCanonicalUrl({
  canonicalUrl = "",
  metaCanonicalTag = "",
  fallbackPath = "",
  siteUrl = SITE_URL,
} = {}) {
  return normalizeUrl(canonicalUrl || metaCanonicalTag || fallbackPath, siteUrl);
}

export function parseRobotsString(metaRobots = "") {
  const robotsString = String(metaRobots || "").toLowerCase();

  return {
    index: robotsString.includes("index") && !robotsString.includes("noindex"),
    follow:
      robotsString.includes("follow") && !robotsString.includes("nofollow"),
  };
}

export function getRobotsDirectives(seoData = {}) {
  if (!seoData || typeof seoData !== "object") {
    return { index: true, follow: true };
  }

  if (seoData.meta_robots) {
    return parseRobotsString(seoData.meta_robots);
  }

  return {
    index: String(seoData.meta_robots_index || "index").toLowerCase() !== "noindex",
    follow:
      String(seoData.meta_robots_follow || "follow").toLowerCase() !==
      "nofollow",
  };
}

export function shouldIncludeInSitemap(seoData = {}) {
  if (!seoData || typeof seoData !== "object") {
    return true;
  }

  if (normalizeBoolean(seoData.exclude_from_sitemap, false)) {
    return false;
  }

  if (!normalizeBoolean(seoData.include_in_sitemap, true)) {
    return false;
  }

  return getRobotsDirectives(seoData).index;
}

export function getSitemapChangeFrequency(
  value,
  fallback = DEFAULT_SITEMAP_CHANGE_FREQUENCY
) {
  const normalizedValue = String(value || "").trim().toLowerCase();

  if (SITEMAP_CHANGE_FREQUENCY_OPTIONS.includes(normalizedValue)) {
    return normalizedValue;
  }

  return fallback;
}

export function getSitemapPriority(
  value,
  fallback = DEFAULT_SITEMAP_PRIORITY
) {
  const parsedValue = Number.parseFloat(value);

  if (!Number.isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 1) {
    return parsedValue;
  }

  return fallback;
}
