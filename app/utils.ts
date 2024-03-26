import { ClientProtocolId } from "frames.js";
import { headers } from "next/headers";
import { createPublicClient, http } from 'viem';
import { mainnet, optimism, base } from 'viem/chains';

export function currentURL(pathname: string): URL {
  const headersList = headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  try {
    return new URL(pathname, `${protocol}://${host}`);
  } catch (error) {
    return new URL("http://localhost:3000");
  }
}

export function vercelURL() {
  if (process.env.AZURE) {
    return "http://localhost:8080"
  }
  // override vercelurl
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;
}

export const acceptedProtocols: ClientProtocolId[] = [
  {
    id: "xmtp",
    version: "vNext",
  },
  {
    id: "farcaster",
    version: "vNext",
  },
];

export async function checkQuery(data: any): Promise<boolean> {

  if (!data?.chain || !data?.address) {
    throw new Error("Bad data");
  }

  let publicClient: any;
  if (data.chain.toLowerCase() === "base") {
    publicClient = createPublicClient({
      chain: base,
      transport: http()
    })
  } else if (data.chain.toLowerCase() === "optimism") {
    publicClient = createPublicClient({
      chain: optimism,
      transport: http()
    })
  }
  else if (data.chain.toLowerCase() === "ethereum") {
    publicClient = createPublicClient({
      chain: mainnet,
      transport: http()
    })
  }
  else {
    throw new Error("Invalid chain");
  }

  const bytecode = await publicClient.getBytecode({
    address: data.address
  });

  if (!bytecode?.length) {
    throw new Error("Not a smartcontract");
  }


  return true;

}