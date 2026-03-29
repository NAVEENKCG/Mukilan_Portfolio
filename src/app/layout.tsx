import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Mukilan Architecture",
  description:
    "Mukilan Architecture crafts buildings by carefully balancing the needs of the individual and the attributes of the location. Led by Mukilan EV.",
  keywords: ["architecture", "design", "Mukilan EV", "buildings", "modern architecture"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <div className="site-layout">
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Sidebar />
        </div>
      </body>
    </html>
  );
}
