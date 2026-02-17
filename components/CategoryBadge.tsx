import Link from "next/link";

const categoryColors: Record<string, string> = {
  "授乳・ミルク": "bg-yellow-100 text-yellow-800",
  "おむつ・ケア": "bg-green-100 text-green-800",
  "移動・おでかけ": "bg-blue-100 text-blue-800",
  "ねんね・寝具": "bg-purple-100 text-purple-800",
  "おもちゃ・知育": "bg-orange-100 text-orange-800",
  "安全・衛生": "bg-teal-100 text-teal-800",
  "ベビー服・小物": "bg-rose-100 text-rose-800",
};

export default function CategoryBadge({ category }: { category: string }) {
  const colorClass = categoryColors[category] ?? "bg-gray-100 text-gray-800";

  return (
    <Link
      href={`/categories/${encodeURIComponent(category)}`}
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass} hover:opacity-80 transition-opacity`}
    >
      {category}
    </Link>
  );
}
