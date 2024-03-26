/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { frames } from "../../../frames";
import { acceptedProtocols, checkQuery } from "../../../../utils";

const handleRequest = frames(async (ctx) => {
  try {

    const address = ctx.searchParams?.address;
    const description = ctx.searchParams?.description;
    const chain = ctx.searchParams?.chain;

    console.log("searchParams", ctx.searchParams);
    console.log("ctx", ctx);


    const verify = await checkQuery(ctx.searchParams);
    const target = `${process.env.EXPORT_URL}?description=${description}&address=${address}&chain=${chain}`;

    return {
      image: (
        <div tw="flex flex-col">
          <span>Description : {description}</span>
          <span>Shortcut address : {address?.slice(0, 10)}...</span>
          <span>From chain : {chain}</span>
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
          action="link"
          target={target}
        >
          Frame Link
        </Button >
      ],
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
          🏠 Home
        </Button>
      ],
      accepts: acceptedProtocols
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
