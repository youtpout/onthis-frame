/* eslint-disable react/jsx-key */
import { NextRequest, NextResponse } from "next/server";
import { TransactionTargetResponse, getFrameMessage } from "frames.js";
import { parseEther, encodeFunctionData } from 'viem';
import { checkQuery } from "../../utils";

export async function POST(
    req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {

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
    let idChain = "8453";
    if (data.chain.toLowerCase() === "base") {
        idChain = "8453";
    } else if (data.chain.toLowerCase() === "optimism") {
        idChain = "10";
    }
    else if (data.chain.toLowerCase() === "ethereum") {
        idChain = "1";
    }
    else {
        throw new Error("Invalid chain");
    }

    const amount = parseEther(frameMessage.inputText!);

    const abi = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "FEE_DESTINATION", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "SHORTCUT_BASE_FEE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "SHORTCUT_COMPLEXITY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "enum PoolType", "name": "_pType", "type": "uint8" }, { "internalType": "address", "name": "_pool", "type": "address" }, { "internalType": "address", "name": "_swapRouter", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "originWeth", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pool", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "swapRouter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];



    const tx = {
        chainId: "eip155:" + idChain, // OP Mainnet 10
        method: "eth_sendTransaction",
        params: {
            abi,
            to: address,
            value: amount.toString()
        },
    };

    console.log("tx", tx);

    return NextResponse.json(tx);
}