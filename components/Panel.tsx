type PanelProps = {
  title: string;
  icon?: string;
  className?: string;
  children: React.ReactNode;
};

export function Panel({ title, icon, className = "", children }: PanelProps) {
  return (
    <section className={`hud-window pixel-corners min-w-0 p-4 sm:p-5 ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="pixel-label text-gold">{title}</h2>
        {icon ? <span className="grid h-8 w-8 place-items-center border border-gold/30 bg-black/20 text-lg">{icon}</span> : null}
      </div>
      {children}
    </section>
  );
}
