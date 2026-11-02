import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-02");
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/audit`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
