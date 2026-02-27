"use client";

import { type LucideIcon } from "lucide-react";

interface Cube3DProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
}

export function Cube3D({ icon: Icon, size = 40, color = "#111827" }: Cube3DProps) {
  const half = size / 2;

  return (
    <div
      className="preserve-3d shrink-0"
      style={{
        width: size,
        height: size,
        animation: "cube-rotate 6s ease-in-out infinite",
      }}
    >
      {/* Front face - shows icon */}
      <div
        className="absolute inset-0 flex items-center justify-center rounded-xl backface-hidden"
        style={{
          backgroundColor: color,
          transform: `translateZ(${half}px)`,
        }}
      >
        <Icon className="text-white" style={{ width: size * 0.5, height: size * 0.5 }} />
      </div>
      {/* Back face */}
      <div
        className="absolute inset-0 rounded-xl backface-hidden"
        style={{
          backgroundColor: color,
          transform: `rotateY(180deg) translateZ(${half}px)`,
          opacity: 0.8,
        }}
      />
      {/* Top face */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          backgroundColor: color,
          transform: `rotateX(90deg) translateZ(${half}px)`,
          opacity: 0.6,
        }}
      />
      {/* Bottom face */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          backgroundColor: color,
          transform: `rotateX(-90deg) translateZ(${half}px)`,
          opacity: 0.4,
        }}
      />
      {/* Left face */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          backgroundColor: color,
          transform: `rotateY(-90deg) translateZ(${half}px)`,
          opacity: 0.5,
        }}
      />
      {/* Right face */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          backgroundColor: color,
          transform: `rotateY(90deg) translateZ(${half}px)`,
          opacity: 0.7,
        }}
      />
    </div>
  );
}
