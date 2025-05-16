import type { NextConfig } from "next";

type Rule = {
  test?: RegExp;
  exclude?: RegExp;
  use?: string | string[];
};

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.discordapp.com", "i.scdn.co", "i.redd.it"],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: unknown): rule is Rule =>
        typeof rule !== "string" &&
        typeof rule === "object" &&
        rule !== null &&
        "test" in rule &&
        (rule as { test?: unknown }).test instanceof RegExp &&
        (rule as { test: RegExp }).test.test(".svg")
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
