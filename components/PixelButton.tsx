type PixelButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "green" | "secondary";
  href?: string;
};

export function PixelButton({ className = "", href, variant = "gold", ...props }: PixelButtonProps) {
  const variantClass = variant === "green" ? "pixel-button-green" : variant === "secondary" ? "pixel-button-secondary" : "";
  const classes = `pixel-button pixel-corners pixel-label inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 text-center transition ${variantClass} ${className}`;

  if (href) {
    return (
      <a className={classes} href={href}>
        {props.children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...props}
    />
  );
}
