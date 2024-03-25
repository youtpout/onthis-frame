/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "./frames";
import { acceptedProtocols, checkQuery } from "../utils";
import { NextResponse } from "next/server";

const handleRequest = frames(async (ctx) => {
  try {
    console.log("call home");
    console.log("searchParams", ctx.searchParams);

    if (!ctx.searchParams.description) {
      return {
        headers: {
          // Max cache age of 5 seconds
          "Cache-Control": "max-age=5",
        },
        image: (
          <div tw="flex flex-col">
            <div tw="mb-5">⚡ Create a frame for your shortcut</div>
            <div tw="mb-5">Supported chains : Ethereum, Base, Optimism</div>
            <div tw="mb-5">First step write a description for your shortcut frame</div>
            <div tw="mb-5">Ex : Swap degen from optimism to base</div>
          </div>
        ),
        textInput: "Description",
        buttons: [<Button
          action="post"
          target={{ query: { disconnect: 'false' }, pathname: "contract" }}
        >
          Next Step
        </Button>],
        accepts: acceptedProtocols,
      };
    }
    else {
      const res = await checkQuery(ctx.searchParams);
      return {
        image: (
          <div tw="flex flex-col">
            <div tw="flex flex-col">
              <div tw="flex">⚡ {ctx.searchParams.description}</div>
            </div>
          </div>
        ),
        buttons: [
          <Button
            action="tx"
            target={{ query: { data: JSON.stringify(ctx.searchParams) }, pathname: '/send' }}
            post_url="tx"
          >
            Send
          </Button>],
        textInput: "Eth amount",
        accepts: acceptedProtocols,
      };
    }
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
      accepts: acceptedProtocols
    };
  }


});

export const GET = handleRequest;
export const POST = handleRequest;
