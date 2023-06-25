import { Fuzzy_Bubbles } from "next/font/google";
import "./globals.scss";

const fuzzyBubbles = Fuzzy_Bubbles({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Corrieri TTG",
  description: "Generatore di corrieri per Terror Target Gemini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fuzzyBubbles.className}>{children}</body>
    </html>
  );
}
