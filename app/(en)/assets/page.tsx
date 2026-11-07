import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { links } from "../../_content/profile";
import styles from "./assets.module.css";

const sampleUrl = (file: string) => `/assets/retro-kitchen/${file}.webp?v=20261107-model-fix`;

export const metadata: Metadata = {
  title: "maratg2 — Low-poly props for Unity",
  description: "Low-poly 3D props by Marat Gazizulin. Explore Retro Kitchen, a collection of kitchen appliances, furniture and everyday details for Unity URP. Work samples and contact.",
  alternates: { canonical: "https://maratg2.ru/assets" },
  openGraph: {
    title: "maratg2 — Low-poly props for Unity",
    description: "Retro-inspired 3D props, pixel textures and editable Unity scenes.",
    url: "https://maratg2.ru/assets",
    type: "website",
    locale: "en_US",
    images: [{ url: `https://maratg2.ru${sampleUrl("kitchen")}`, width: 1920, height: 1080, alt: "Retro Kitchen demo scene rendered in Unity" }],
  },
};

const specifications = [
  ["Prefabs", "36"],
  ["Demo scenes", "Kitchen + AllProps"],
  ["Triangles per prop", "92–1,440"],
  ["Textures", "128 / 256 px"],
  ["Unity", "6000.5.9f1"],
  ["Render pipeline", "URP 17.5.0"],
];

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

function WorkSample({ file, alt, caption, large = false }: { file: string; alt: string; caption: string; large?: boolean }) {
  const src = sampleUrl(file);
  return (
    <figure className={styles.sample}>
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`View ${caption.toLowerCase()} at full size (opens in a new tab)`}>
        <Image src={src} alt={alt} width={1920} height={1080} sizes={large ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 30vw"} />
        <span className={styles.expand}><Arrow /></span>
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function AssetsPage() {
  return (
    <main id="main-content">
      <section className={styles.hero} aria-labelledby="assets-heading">
        <div className={styles.heroCopy}>
          <h1 id="assets-heading">Low-poly props<br /><span>for Unity.</span></h1>
          <p>3D assets for Unity, with a soft spot for retro interiors and everyday details.</p>
          <a className={styles.primary} href="#retro-kitchen">Explore the first pack <Arrow /></a>
        </div>
        <figure className={styles.heroFigure}>
          <Image src={sampleUrl("kitchen")} alt="An isometric retro kitchen with pale blue cabinets, a cream refrigerator and stove, a patterned tablecloth and household props." width={1920} height={1080} sizes="(max-width: 900px) 100vw, 60vw" priority />
          <figcaption>Retro Kitchen / Unity scene render</figcaption>
        </figure>
      </section>

      <section className={styles.work} id="retro-kitchen" aria-labelledby="kitchen-heading">
        <div className={styles.packCopy}>
          <h2 id="kitchen-heading">Retro Kitchen</h2>
          <p className={styles.subtitle}>Low Poly Props (URP)</p>
          <p className={styles.description}>36 kitchen props: appliances, cabinets, cookware and household details. Pixel textures and two editable demo scenes.</p>
          <p className={styles.status}>In preparation for the Unity Asset Store</p>
          <dl className={styles.specifications}>
            {specifications.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <p className={styles.note}>Metre scale, box colliders, separate appliance parts and standard URP/Lit materials.</p>
          <p className={styles.note}>Decorative props. No gameplay scripts, animations or LODs. Prepared for the Unity and URP versions shown above; other versions and render pipelines are not currently supported.</p>
        </div>
        <div className={styles.gallery}>
          <WorkSample file="all-props" alt="All 36 kitchen prop prefabs arranged on individual tiles in the AllProps demonstration scene." caption="All 36 props" large />
          <div className={styles.galleryDetails}>
            <WorkSample file="table" alt="Close-up of the kitchen table with a patterned tablecloth, cups, plates and cookware." caption="Table details" />
            <WorkSample file="appliances" alt="Close-up of the retro refrigerator, cabinets, sink and stove." caption="Appliances" />
          </div>
          <p className={styles.galleryNote}>Renders of the included Unity demo scenes. Open any gallery image to inspect it at full size.</p>
        </div>
      </section>

      <section className={styles.about} aria-label="About the creator and contact">
        <div className={styles.creator}>
          <Image src="/assets/publisher-avatar.webp" alt="Low-poly portrait of Marat Gazizulin" width={88} height={88} />
          <div>
            <h2>Marat Gazizulin</h2>
            <p>Independent developer and 3D asset creator. I build props in Blender and prepare them for Unity, starting with retro interiors.</p>
          </div>
        </div>
        <div className={styles.contactTeaser}>
          <h2>Questions or support?</h2>
          <a className={styles.email} href={links.email}>{links.emailAddress}</a>
          <Link className={styles.textLink} href="/assets/contact">Contact &amp; support <Arrow /></Link>
        </div>
      </section>
    </main>
  );
}
