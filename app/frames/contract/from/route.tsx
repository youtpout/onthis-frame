/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../../frames";
import { acceptedProtocols } from "../../../utils";

const handleRequest = frames(async (ctx) => {
  try {

    const description = ctx.message?.inputText;
    console.log("searchParams", ctx.searchParams);


    
    return {
      image: (
        <div tw="flex flex-col">
          <span tw="text-blue-500 mb-5">Select chain From</span>
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target="/contract"
        >
          ← back
        </Button>,
        <Button
          action="post"
          target={{ query: { from: "Ethereum" }, pathname: '/contract/from/to' }}
        >
          Ethereum
        </Button >,
        <Button
          action="post"
          target={{ query: { from: "Base" }, pathname: '/contract/from/to' }}
        >
          Base
        </Button >,
        <Button
          action="post"
          target={{ query: { from: "Optimism" }, pathname: '/contract/from/to' }}
        >
          Optimism
        </Button >
      ],
      accepts: acceptedProtocols
    };
  } catch (error) {
    console.log(error);

    return {
      image: (
        <div tw="flex flex-col">
          Incorrect address
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
      textInput: "Action",
      accepts: acceptedProtocols
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
