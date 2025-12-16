"use client";

import React from "react";
import RoomShell from "@/components/RoomShell";
import ExitDoor from "@/components/rooms/ExitDoor";

export default function StoryPage() {
  return (
    <>
      <ExitDoor />
      <RoomShell
        title="Story Room"
        kicker="The Story"
        description="A focused room for narrative reading and scene context."
      />
    </>
  );
}
