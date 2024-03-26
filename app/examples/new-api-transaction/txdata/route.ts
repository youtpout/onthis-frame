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


  return NextResponse.json({
    chainId: "eip155:8453", // OP Mainnet 10
    method: "eth_sendTransaction",
    attribution: false,
    params: {
      abi: [] as Abi,
      to: "0xDf47F3A5Ca68802f9a858f8EBe6AFe64d99E9C8A",
      value: parseEther("0.001").toString(),
    },
  });
}
