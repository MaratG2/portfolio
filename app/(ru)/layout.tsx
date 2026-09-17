import Document from "../_components/document";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document lang="ru">{children}</Document>;
}
