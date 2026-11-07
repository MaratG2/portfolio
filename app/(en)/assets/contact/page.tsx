import type { Metadata } from "next";
import Link from "next/link";
import { links } from "../../../_content/profile";
import styles from "../assets.module.css";

export const metadata: Metadata = {
  title: "Contact & support — maratg2 assets",
  description: "Contact Marat Gazizulin about Unity assets, compatibility and technical support.",
  alternates: { canonical: "https://maratg2.ru/assets/contact" },
};

export default function AssetContactPage() {
  return (
    <main id="main-content" className={styles.contactPage}>
      <Link className={styles.textLink} href="/assets">Back to assets</Link>
      <h1>Contact &amp; support</h1>
      <p className={styles.contactIntro}>Questions about an asset or help with a project? Get in touch with Marat Gazizulin, the creator behind maratg2.</p>
      <a className={styles.contactEmail} href={links.email}>{links.emailAddress}</a>
      <div className={styles.supportDetails}>
        <section aria-labelledby="support-heading">
          <h2 id="support-heading">For technical questions</h2>
          <p>Include the pack name and version, your Unity version and render pipeline. Describe what happened and what you expected; a screenshot or the relevant Console error helps.</p>
          <p>You can write in English or Russian.</p>
        </section>
        <section aria-labelledby="compatibility-heading">
          <h2 id="compatibility-heading">Retro Kitchen compatibility</h2>
          <p>The current pack is prepared for Unity 6000.5.9f1 and URP 17.5.0. It contains decorative props and editable demo scenes. Other Unity versions, Built-in and HDRP are not currently supported.</p>
          <Link className={styles.textLink} href="/assets#retro-kitchen">View work samples and specifications</Link>
        </section>
      </div>
    </main>
  );
}
