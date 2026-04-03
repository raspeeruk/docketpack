const categoryLabels: Record<string, string> = {
  "food-safety": "Food Safety",
  "health-and-safety": "Health & Safety",
  "employment-hr": "Employment & HR",
  "licensing": "Licensing",
  "fire-safety": "Fire Safety",
  "insurance": "Insurance",
  "data-privacy": "Data & Privacy",
  "operations": "Operations",
};

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block border border-fold bg-cotton px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-graphite uppercase">
      {categoryLabels[category] || category}
    </span>
  );
}
