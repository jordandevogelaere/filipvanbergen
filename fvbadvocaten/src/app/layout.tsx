import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl-BE"
      className={`${raleway.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-body">
        {children}
      </body>
    </html>
  );
}
