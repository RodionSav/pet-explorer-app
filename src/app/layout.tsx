import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pet explorer",
  description: "App for searching of pet breeds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen`}>
        <div className="relative min-h-screen overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1] brightness-50"
          >
            <source src="/wallpaper.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}