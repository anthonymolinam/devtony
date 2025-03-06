import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevTony",
  description:
    "Meet DevTony! An engineer by degree, a Frontend Developer by passion, and a bug exorcist by necessity. I build slick, fast, and user-friendly interfaces—unless the user is too friendly and breaks things. Welcome to my portfolio, where pixels obey my commands… most of the time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.className}>
      <body>{children}</body>
    </html>
  );
}
