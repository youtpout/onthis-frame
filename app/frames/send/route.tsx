/* eslint-disable react/jsx-key */
import { NextRequest, NextResponse } from "next/server";
import { TransactionTargetResponse, getFrameMessage } from "frames.js";
import { parseEther } from 'viem';
import { checkQuery } from "../../utils";

export async function POST(
    req: NextRequest
): Promise<NextResponse<any>> {

    const json = await req.json();

    console.log("searchParams", req.nextUrl.searchParams);
    const paramData = req.nextUrl.searchParams.get("data");
    const data = JSON.parse(paramData!);
    const frameMessage = await getFrameMessage(json);
    console.log("frameMessage", frameMessage);

    const res = await checkQuery(data);

    if (!frameMessage?.inputText) {
        throw new Error("No amount");
    }

    const address = data.address;
    let chainId = "8453";
    if (data.chain.toLowerCase() === "base") {
        chainId = "8453";
    } else if (data.chain.toLowerCase() === "optimism") {
        chainId = "10";
    }
    else if (data.chain.toLowerCase() === "ethereum") {
        chainId = "1";
    }
    else {
        throw new Error("Invalid chain");
    }

    const amount = parseEther(frameMessage.inputText!);

    return NextResponse.json({
        chainId: "eip155:" + chainId, // OP Mainnet 10
        method: "eth_sendTransaction",
        params: {
            to: address,
            data: "",
            value: amount.toString()
        },
    });
}