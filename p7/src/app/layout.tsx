import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";
import AudioLoop from "./AudioLoop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const deathNote = localFont({
  src: "./fonts/death_note/DeathNote.ttf",
  variable: "--font-deathnote",
});

export const metadata: Metadata = {
  title: "DeathPost API Notebook",
  description: "A Death Note–inspired API testing tool",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${deathNote.variable}
          antialiased death-layout
        `}
      >
        {/* Corners */}
        <Image src="/topleft.png" alt="corner" width={140} height={140} className="corner top-left" />
        <Image src="/topright.png" alt="corner" width={140} height={140} className="corner top-right" />
        <Image src="/bottomleft.png" alt="corner" width={140} height={140} className="corner bottom-left" />
        <Image src="/bottomright.png" alt="corner" width={140} height={140} className="corner bottom-right" />

        {/* Heart background */}
        <div className="heart-bg">
          <Image
            src="/heart.png"
            alt="heart"
            fill
            sizes="100vw"
            className="heart-img"
          />
        </div>

        {/* ✅ Global ambient audio */}
        <AudioLoop />

        {children}
      </body>
    </html>
  );
}