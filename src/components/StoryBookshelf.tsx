"use client";

import { useRouter } from "next/navigation";

const books = [
  { title: "Wolves in the Echo House", slug: "wolves" },
  { title: "The Fire That Dreamed", slug: "fire-that-dreamed" },
  { title: "Future Farm", slug: "future-farm" },
  { title: "Fragments", slug: "fragments" },
];

export default function StoryBookshelf() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {books.map((b) => (
        <button
          key={b.slug}
          type="button"
          onClick={() => router.push(`/story/${b.slug}`)}
          className="group cursor-pointer flex flex-col items-center focus:outline-none"
        >
          {/* Book spine */}
          <div className="relative w-24 h-36 rounded-md shadow-lg border border-white/10
                          bg-gradient-to-b from-stone-900 to-stone-800
                          group-hover:from-stone-700 group-hover:to-stone-900
                          transition-all duration-300 transform group-hover:scale-[1.05]">
            {/* vertical metallic highlight */}
            <div className="absolute inset-y-3 left-1 w-1 rounded-full bg-white/5 group-hover:bg-white/15" />
          </div>

          {/* Book title */}
          <span className="mt-2 text-sm text-white/90 text-center tracking-wide 
                           group-hover:text-white transition">
            {b.title}
          </span>
        </button>
      ))}
    </div>
  );
}
