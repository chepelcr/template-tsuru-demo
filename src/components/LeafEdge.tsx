// A fringe of leaves hanging from the canopy: narrow lens shapes, overlapping,
// each with its own tilt and length (deterministic, so it never shifts).
const LEAF = 'M0 0C-16 16-15 46 0 68C15 46 16 16 0 0Z';

function fringe(): Array<[x: number, rotate: number, scale: number]> {
  const leaves: Array<[number, number, number]> = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let x = -10; x < 1460; x += 17 + rand() * 15) {
    leaves.push([x, -32 + rand() * 64, 0.62 + rand() * 0.55]);
  }
  return leaves;
}

const LEAVES = fringe();

/** The canopy's lower edge: leaves hanging over the next surface (`flip` for the footer). */
export function LeafEdge({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 64" preserveAspectRatio="xMidYMin slice" className={`block h-8 w-full sm:h-12 lg:h-16 ${flip ? 'rotate-180' : ''} ${className}`}>
      <rect width="1440" height="8" fill="currentColor" />
      {LEAVES.map(([x, rotate, scale], i) => (
        <path key={i} d={LEAF} fill="currentColor" transform={`translate(${x.toFixed(1)} 2) rotate(${rotate.toFixed(1)}) scale(${scale.toFixed(2)})`} />
      ))}
    </svg>
  );
}
