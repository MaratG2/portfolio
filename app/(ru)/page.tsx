import Portfolio, { profileMetadata } from "../_components/portfolio";

export const metadata = profileMetadata("ru");
export default function Home() { return <Portfolio lang="ru" />; }
