import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
  style: ["normal", "italic"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Nicola Frizzale — Executive Sous Chef",
  description:
    "Nicola Frizzale, Executive Sous Chef. Italian cooking, private dinners, chef's table and off-site events. By appointment. Tel +86 158 2106 9064 · WhatsApp +39 333 578 8520 · frizzale.nicola@icloud.com",
  openGraph: {
    title: "Nicola Frizzale — Executive Sous Chef",
    description:
      "Italian cooking, by appointment. Private dinners, chef's table, off-site events.",
    images: ["/media/chef-portrait.jpg"],
  },
};

export const viewport = {
  themeColor: "#1a1612",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
