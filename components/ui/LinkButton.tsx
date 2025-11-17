"use client";
import Link from "next/link";
import { Button } from "./Button";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  className = "",
}: LinkButtonProps) {
  return (
    <Link href={href} className="block w-full">
      <Button
        type="button"
        variant={variant}
        className={`w-full ${className}`}
      >
        {children}
      </Button>
    </Link>
  );
}
