"use client";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import Link from "next/link";

const buttonStyles = cva(
  "inline-flex items-center justify-center font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-echo-accent motion-scale-hover",
  {
    variants: {
      variant: {
        primary:
          "bg-echo-accent text-black rounded-echo-pill px-6 py-3 shadow-echo-soft hover:shadow-echo-glow hover:bg-cyan-400",
        ghost:
          "border border-white/30 text-echo-text bg-transparent rounded-echo-pill px-6 py-3 hover:bg-white/5",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "ghost";
  href?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button({ variant = "primary", href, children, ...props }, ref) {
  const className = buttonStyles({ variant });
  if (href) {
    return (
      <Link href={href} className={className} ref={ref} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={className} ref={ref} {...props}>
      {children}
    </button>
  );
});
