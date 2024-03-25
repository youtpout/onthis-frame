/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../../frames";
import { acceptedProtocols } from "../../../utils";
import { isAddress } from 'viem'

const handleRequest = frames(async (ctx) => {
  try {

    const address = ctx.message?.inputText;
    const description = ctx.searchParams?.description;
    console.log("searchParams", ctx.searchParams);

    if (!isAddress(address || "")) {
      throw new Error("Invalid address");
    }

    return {
      image: (
        <div tw="flex flex-col">
          <span tw="mb-5">⛓️ Select the starting blockchain</span>
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target="/"
        >
          ← back
        </Button>,
        <Button
          action="post"
          target={{ query: { chain: "Ethereum", description, address }, pathname: '/contract/chain/result' }}
        >
          Ethereum
        </Button >,
        <Button
          action="post"
          target={{ query: { chain: "Base", description, address }, pathname: '/contract/chain/result' }}
        >
          Base
        </Button >,
        <Button
          action="post"
          target={{ query: { chain: "Optimism", description, address }, pathname: '/contract/chain/result' }}
        >
          Optimism
        </Button >
      ],
      accepts: acceptedProtocols
    };
  } catch (error: any) {
    console.log(error);

    return {
      image: (
        <div tw="flex flex-col">
          <div tw="flex">
            {error.toString()}
          </div>
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target="/"
        >
          ← back
        </Button>

      ],
      accepts: acceptedProtocols
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
