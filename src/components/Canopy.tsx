import { useEffect, useRef } from 'react';
import { LazyScene, useReducedMotion } from '@/core';

const loadLight = () => import('@/scenes/light');

/** The static light: what the shader looks like, frozen. Also the fallback. */
function StillLight() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(38% 42% at 74% 30%, var(--canopy-light-gold), transparent 70%), radial-gradient(30% 34% at 58% 62%, var(--canopy-light-fern), transparent 70%), radial-gradient(22% 26% at 88% 70%, var(--canopy-light-gold-soft), transparent 70%)',
      }}
    />
  );
}

// One leaf (a lens with a midrib), reused at different sizes and angles.
const LEAF = 'M0 0C26-30 86-34 128 0C86 34 26 30 0 0Z';

type LeafSpec = [x: number, y: number, rotate: number, scale: number];

const BACK: LeafSpec[] = [
  [-30, 40, -20, 1.9], [120, -10, 25, 1.6], [300, 10, -8, 1.4], [980, -20, 160, 1.8], [1160, 30, 200, 1.7],
  [1320, 120, 230, 1.6], [1380, 300, 250, 1.5], [1300, 460, 210, 1.3],
];
const MID: LeafSpec[] = [
  [40, -30, 35, 1.3], [210, 20, 10, 1.1], [860, -10, 150, 1.2], [1060, 40, 175, 1.25], [1240, 200, 220, 1.2],
  [1400, 420, 240, 1.15], [-20, 260, -40, 1.1],
];
const FRONT: LeafSpec[] = [
  [-10, -20, 20, 1.05], [1180, -30, 150, 1.05], [1420, 180, 235, 1], [1360, 560, 200, 0.95], [-40, 520, -60, 0.9],
];

function Layer({ leaves, fill, vein, depth }: { leaves: LeafSpec[]; fill: string; vein: string; depth: number }) {
  return (
    <svg
      aria-hidden="true"
      className="canopy-layer absolute inset-0 h-full w-full"
      viewBox="0 0 1440 640"
      preserveAspectRatio="xMidYMin slice"
      style={{ transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)` }}
    >
      {leaves.map(([x, y, rotate, scale], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
          <path d={LEAF} fill={fill} />
          <path d="M6 0H120" stroke={vein} strokeWidth="1.4" fill="none" />
        </g>
      ))}
    </svg>
  );
}

/**
 * The hero's signature: leaf layers over light that drifts through them.
 * On a fine pointer the layers shift a few pixels with the pointer; under
 * reduced motion everything is still.
 */
export function Canopy() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty('--px', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
        node.style.setProperty('--py', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
      });
    };
    const parent = node.parentElement ?? node;
    parent.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(frame);
      parent.removeEventListener('pointermove', onMove);
    };
  }, [reduced]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <LazyScene load={loadLight} fallback={<StillLight />} style={{ position: 'absolute', inset: 0 }} className="[&>[data-fx-fallback]]:absolute [&>[data-fx-fallback]]:inset-0 [&_canvas]:mix-blend-screen" />
      <Layer leaves={BACK} fill="var(--canopy-leaf-back)" vein="var(--canopy-vein-back)" depth={6} />
      <Layer leaves={MID} fill="var(--canopy-leaf-mid)" vein="var(--canopy-vein-mid)" depth={12} />
      <Layer leaves={FRONT} fill="var(--canopy-leaf-front)" vein="var(--canopy-vein-front)" depth={20} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[color:var(--surface-deep)] to-transparent" />
    </div>
  );
}
