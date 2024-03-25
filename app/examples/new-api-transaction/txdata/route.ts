import { STORAGE_REGISTRY_ADDRESS } from "@farcaster/core";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
  parseEther
} from "viem";
import { optimism } from "viem/chains";
import { storageRegistryABI } from "./contracts/storage-registry";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  // Get current storage price
  const units = 1n;

  const calldata = encodeFunctionData({
    abi: storageRegistryABI,
    functionName: "rent",
    args: [BigInt(frameMessage.requesterFid), units],
  });

  const publicClient = createPublicClient({
    chain: optimism,
    transport: http(),
  });

  const storageRegistry = getContract({
    address: STORAGE_REGISTRY_ADDRESS,
    abi: storageRegistryABI,
    client: publicClient,
  });

  const unitPrice = await storageRegistry.read.price([units]);

  return NextResponse.json({
    chainId: "eip155:8453", // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi: storageRegistryABI as Abi,
      to: "0xeac856237a85b70338a32b55bf44b13ef1a7811d",
      data: "0x",
      value: parseEther("0.001").toString(),
    },
  });
}
