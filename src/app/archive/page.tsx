"use client";

import React from "react";
import RoomShell from "@/components/RoomShell";
import ExitDoor from "@/components/rooms/ExitDoor";

export default function ArchivePage() {
  return (
    <>
      <ExitDoor />
      <RoomShell
        title="Archive"
        kicker="The Archive"
        description="Quiet halls of storage and memory."
      />
    </>
  );
}
