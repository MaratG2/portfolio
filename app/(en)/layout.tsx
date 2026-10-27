import type { Viewport } from "next";
import Document from "../_components/document";

export const viewport: Viewport = { themeColor: "#0a0c0b", colorScheme: "dark" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
