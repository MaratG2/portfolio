import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./assets.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function AssetsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.site}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/assets" aria-label="maratg2 assets home">
          <Image src="/assets/publisher-avatar.webp" alt="" width={44} height={44} />
          <span>maratg2</span>
        </Link>
        <nav aria-label="Asset portfolio" className={styles.nav}>
          <Link href="/assets#retro-kitchen">Work</Link>
          <Link href="/assets/contact">Contact</Link>
        </nav>
      </header>
      {children}
      <footer className={styles.footer}>
        <Link href="/assets">maratg2</Link>
        <span>3D assets for Unity</span>
      </footer>
    </div>
  );
}
