"use client";

import { Button as ShadcnButton } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

interface ButtonProps {
  text: string;
  variant?: "default" | "outline";
  size?: "sm" | "lg";
  onClick?: () => void;
  withArrow?: boolean;
  className?: string;
  children?: React.ReactNode; 
}

export default function Button({ text, variant = "default", size = "lg", onClick, withArrow = false , className, children }: ButtonProps) {
  return (
    <ShadcnButton variant={variant} size={size} onClick={onClick} className={`gap-1 ${className ?? ""}`}>
      {text}
    {children} {}
      {withArrow && <FaArrowRight className="h-4 w-4" />}
    </ShadcnButton>
  );
}