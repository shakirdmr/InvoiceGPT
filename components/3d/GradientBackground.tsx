interface GradientBackgroundProps {
  className?: string;
  variant?: "light" | "dark";
}

export function GradientBackground({
  className = "",
  variant = "light",
}: GradientBackgroundProps) {
  const gradients = {
    light:
      "linear-gradient(-45deg, #fefce8, #fff7ed, #fef3c7, #ffffff, #ecfdf5, #fefce8)",
    dark:
      "linear-gradient(-45deg, #111827, #1e1b4b, #172554, #111827, #1e293b, #111827)",
  };

  return (
    <div
      className={`absolute inset-0 -z-10 ${className}`}
      style={{
        background: gradients[variant],
        backgroundSize: "400% 400%",
        animation: "gradient-shift 8s ease infinite",
      }}
    />
  );
}
