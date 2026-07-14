import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={`w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  size?: "none" | "sm" | "md" | "lg";
  as?: React.ElementType;
  id?: string;
}

export function Section({
  children,
  className = "",
  size = "md",
  as: Component = "section",
  id,
}: SectionProps) {
  const paddingMap = {
    none: "",
    sm: "py-[var(--section-y-sm)]",
    md: "py-[var(--section-y-md)]",
    lg: "py-[var(--section-y-lg)]",
  };

  return (
    <Component
      id={id}
      className={`w-full ${paddingMap[size]} ${className}`}
    >
      {children}
    </Component>
  );
}
