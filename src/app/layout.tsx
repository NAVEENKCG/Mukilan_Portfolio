import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import IntroLoader from "@/components/IntroLoader";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";

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
      <body className="antialiased text-text-primary bg-bg-base">
        <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 blueprint-grid opacity-[0.15] [mask-image:radial-gradient(ellipse_92%_80%_at_50%_0%,#000_25%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_92%_80%_at_50%_0%,#000_25%,transparent_85%)]"></div>
          <div className="absolute -top-[25%] -right-[18%] w-[60vw] h-[60vw] max-w-[820px] max-h-[820px] rounded-full bg-[radial-gradient(circle,rgba(78,205,196,0.04),transparent_70%)]"></div>
          <div className="absolute bottom-[-15%] -left-[15%] w-[55vw] h-[55vw] max-w-[760px] max-h-[760px] rounded-full bg-[radial-gradient(circle,rgba(196,149,106,0.03),transparent_70%)]"></div>
        </div>
        <SmoothScroll>
          <IntroLoader />
          <Header />
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <main id="main-content" className="flex-1 relative w-full overflow-x-hidden">
            <PageTransition>{children}</PageTransition>
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
