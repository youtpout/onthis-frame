/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../frames";
import { acceptedProtocols } from "../../utils";

const handleRequest = frames(async (ctx) => {

  console.log("message degen", ctx.message);

  try {
    if (ctx.message?.transactionId) {
      return {
        image: (
          <div tw="flex flex-col">
            <div tw="flex"> Transaction submitted! </div>
            <div tw="flex">
              {ctx.message.transactionId.slice(0, 10)}...
            </div>
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
            action="link"
            target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}
          >
            View tx
          </Button>
        ]
      };
    }

  } catch (error: any) {
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
      ]
    }
  }

  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex"> Error </div>
      </div>
    ),
    buttons: [
      <Button
        action="post"
        target="/"
      >
        ← back
      </Button>
    ]
  }



});

export const POST = handleRequest;
