type PixelButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "green";
};

export function PixelButton({ className = "", variant = "gold", ...props }: PixelButtonProps) {
  return (
    <button
      className={`pixel-button pixel-corners pixel-label inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 text-center transition ${variant === "green" ? "pixel-button-green" : ""} ${className}`}
      {...props}
    />
  );
}
