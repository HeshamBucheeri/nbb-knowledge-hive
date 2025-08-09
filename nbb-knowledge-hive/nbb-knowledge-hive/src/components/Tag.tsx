import React from "react";

type Props = { label: string };
export default function Tag({ label }: Props) {
  return (
    <span className="inline-flex items-center rounded-full border border-nbb-teal/25 bg-white px-2.5 py-0.5 text-xs font-medium text-nbb-teal">
      {label}
    </span>
  );
}
