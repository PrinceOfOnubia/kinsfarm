type SparklineProps = {
  points: number[];
};

export function Sparkline({ points }: SparklineProps) {
  const width = 320;
  const height = 96;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width;
    const y = height - ((point - min) / Math.max(1, max - min)) * (height - 12) - 6;
    return `${x},${y}`;
  });

  return (
    <svg className="sparkline h-24 w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Pixel reward sparkline">
      <polyline points={coords.join(" ")} fill="none" stroke="#ffc45b" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
      {coords.map((coord, index) => {
        const [x, y] = coord.split(",").map(Number);
        return <rect key={index} x={x - 3} y={y - 3} width="6" height="6" fill="#36aef2" />;
      })}
    </svg>
  );
}
