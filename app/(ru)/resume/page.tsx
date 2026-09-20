import ResumeViewer, { resumeMetadata } from "../../_components/resume-viewer";

export const metadata = resumeMetadata("ru");
export default function Resume() { return <ResumeViewer lang="ru" />; }
