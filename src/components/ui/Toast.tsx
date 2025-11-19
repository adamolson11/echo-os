"use client";
import { useState } from "react";

export function ToastDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className="bg-echo-accent text-black rounded-echo-pill px-4 py-2 font-semibold shadow-echo-soft hover:shadow-echo-glow"
        onClick={() => setShow(true)}
      >
        Show Toast
      </button>
      {show && (
        <div className="mt-4 animate-fade-in-up bg-echo-surface rounded-echo-lg shadow-echo-glow px-6 py-3 text-echo-text font-semibold">
          This is a toast notification!
          <button className="ml-4 text-echo-accent underline text-xs" onClick={() => setShow(false)}>Dismiss</button>
        </div>
      )}
    </div>
  );
}
