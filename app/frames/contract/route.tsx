/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../frames";
import { acceptedProtocols } from "../../utils";

const handleRequest = frames(async (ctx) => {
  try {

    const description = ctx.message?.inputText;
    console.log("searchParams", ctx.searchParams);




    return {
      image: (
        <div tw="flex flex-col">
          <span tw="mb-5">📜 Set shortcut smartcontract address</span>
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
          target={{ query: { description }, pathname: '/contract/chain' }}
        >
          Next step
        </Button >
      ],
      textInput: "Address",
      accepts: acceptedProtocols
    };
  } catch (error: any) {
    console.log(error);

    return {
      image: (
        <div tw="flex flex-col">
          <div tw="flex"> Error </div>
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
      textInput: "Action",
      accepts: acceptedProtocols
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
