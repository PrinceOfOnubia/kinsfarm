type PixelProgressProps = {
  value: number;
  blocks?: number;
  tone?: "green" | "gold" | "red";
};

export function PixelProgress({ value, blocks = 20, tone = "green" }: PixelProgressProps) {
  const filled = Math.max(0, Math.min(blocks, Math.round((value / 100) * blocks)));
  const color =
    tone === "gold"
      ? "bg-gold shadow-[0_0_10px_rgba(255,196,91,0.48)]"
      : tone === "red"
        ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.46)]"
        : "";

  return (
    <div className="pixel-blocks" aria-label={`${Math.round(value)} percent`}>
      {Array.from({ length: blocks }).map((_, index) => (
        <span key={index} className={`pixel-block ${index < filled ? `is-filled ${color}` : ""}`} />
      ))}
    </div>
  );
}
