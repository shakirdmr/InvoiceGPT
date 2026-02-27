"use client";

import { ReactNode, createContext, useContext } from "react";
import { useInView } from "./useInView";

const StaggerContext = createContext(false);

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
}

export function StaggerChildren({ children, className = "" }: StaggerChildrenProps) {
  const { ref, isInView } = useInView();

  return (
    <StaggerContext.Provider value={isInView}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </StaggerContext.Provider>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function StaggerItem({ children, className = "", index }: StaggerItemProps) {
  const isParentVisible = useContext(StaggerContext);
  const staggerClass = index !== undefined ? `stagger-${Math.min(index, 6)}` : "";

  return (
    <div className={`reveal ${staggerClass} ${isParentVisible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
