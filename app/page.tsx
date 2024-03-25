import Link from "next/link";
import { currentURL, vercelURL } from "./utils";
import { createDebugUrl } from "./debug";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  console.log("searc", searchParams);
  let url = "/frames";
  if (searchParams) {
    url += "?" + new URLSearchParams(searchParams).toString()
  }
  return {
    title: "Portfolio",
    description: "Manage your portfolio",
    other: {
      ...(await fetchMetadata(
        new URL(
          url,
          vercelURL() || "http://localhost:3000"
        )
      )),
    },
  };
}

export default async function Home() {
  const url = currentURL("/");

  console.log("vercel", vercelURL());
  console.log("currentURL", url);
  return (
    <div> Welcome to onthis frame generator, integrate this url in compatible protocol (like warpcast) to show the frame</div>
  );
}
