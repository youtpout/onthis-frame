import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // without a title, warpcast won't validate your frame
  title: "frames.js starter",
  description: "...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div> Welcome to onthis-frame, integrate this url in compatible protocol to show the frame</div>
        <div>{children}</div></body>
    </html>
  );
}
