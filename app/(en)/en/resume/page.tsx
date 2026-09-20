import ResumeViewer, { resumeMetadata } from "../../../_components/resume-viewer";

export const metadata = resumeMetadata("en");
export default function Resume() { return <ResumeViewer lang="en" />; }
