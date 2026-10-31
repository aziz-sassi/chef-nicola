import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni",
  style: ["normal", "italic"],
  axes: ["opsz"],
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

export const metadata = {
  title: "Nicola Frizzale — Executive Chef",
  description:
    "Nicola Frizzale, Executive Chef. Italian cooking, private dinners, chef's table and events. By appointment. Tel +86 158 2106 9064 · WhatsApp +39 333 578 8520 · frizzale.nicola@icloud.com",
  openGraph: {
    title: "Nicola Frizzale — Executive Chef",
    description: "Cucina italiana, by appointment. Private dinners, chef's table, events.",
    images: ["/media/chef-portrait.jpg"],
  },
};

export const viewport = {
  themeColor: "#0d0c0a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
