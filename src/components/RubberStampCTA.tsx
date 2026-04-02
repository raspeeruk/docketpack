import Link from "next/link";

export function RubberStampCTA({
  href,
  children,
  size = "default",
}: {
  href: string;
  children: React.ReactNode;
  size?: "default" | "large";
}) {
  const padding = size === "large" ? "px-10 py-4 text-base" : "px-6 py-3 text-sm";
  return (
    <Link
      href={href}
      className={`inline-block bg-burgundy font-body font-medium text-cotton transition-colors hover:bg-burgundy-hover ${padding}`}
    >
      {children}
    </Link>
  );
}
