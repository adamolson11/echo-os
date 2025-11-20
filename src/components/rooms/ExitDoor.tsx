"use client";

import Link from "next/link";
import React from "react";

export default function ExitDoor() {
  return (
    <Link href="/gateway" className="fixed left-6 bottom-6 z-40 rounded-full bg-black/60 p-3 text-white border border-white/10">
      Exit
    </Link>
  );
}
