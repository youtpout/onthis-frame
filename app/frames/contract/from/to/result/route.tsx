/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../../../../frames";
import { acceptedProtocols } from "../../../../../utils";

const handleRequest = frames(async (ctx) => {
  try {

    const description = ctx.message?.inputText;
    console.log("searchParams", ctx.searchParams);




    return {
      image: (
        <div tw="flex flex-col">
          <span tw="text-blue-500 mb-5">Result</span>
          <span>Description : </span>
          <span>Shortcut address : </span>
          <span>From chain : </span>
          <span>To chain : </span>
          <span>Copy the frame link in Warpcast</span>
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target="/"
        >
          🏠 Home
        </Button>,
        <Button
          action="post"
          target="/contract/from/to"
        >
          ← back
        </Button>,
        <Button
          action="link"
          target={{ query: { d: "swap contract", s: "0x11", f: "base", t: "optimism" }, pathname: '/' }}
        >
          Frame Link
        </Button >
      ],
      accepts: acceptedProtocols
    };
  } catch (error) {
    console.log(error);

    return {
      image: (
        <div tw="flex flex-col">
          Incorrect description
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
