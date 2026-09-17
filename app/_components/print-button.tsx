"use client";

export default function PrintButton({ label }: { label: string }) {
  return <button type="button" className="text-link print-action" onClick={() => window.print()}>{label}</button>;
}
