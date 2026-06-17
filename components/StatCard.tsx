type StatCardProps = {
  icon: string;
  label: string;
  value: string;
  tone?: "gold" | "green" | "sky";
};

const toneClass = {
  gold: "text-gold",
  green: "text-grass",
  sky: "text-skyGame",
};

export function StatCard({ icon, label, value, tone = "gold" }: StatCardProps) {
  return (
    <div className="pixel-stat pixel-corners flex items-center gap-3 p-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center border border-white/15 bg-black/25 text-lg">{icon}</span>
      <div className="min-w-0">
        <p className="pixel-label text-white/60">{label}</p>
        <p className={`pixel-font truncate text-lg ${toneClass[tone]}`}>{value}</p>
      </div>
    </div>
  );
}
