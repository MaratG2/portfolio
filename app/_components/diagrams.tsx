// Server-rendered system diagrams. Lines draw in and packets flow once the figure is in view
// ([data-inview].is-in, set by MotionProvider); without JavaScript they render complete and still.

type Box = { id: string; x: number; y: number; w: number; h: number; label: string; note?: string; accent?: boolean; dashed?: boolean };
type Edge = { d: string; flow?: boolean; dashed?: boolean; delay?: number };
type Layout = { view: [number, number]; boxes: Box[]; edges: Edge[]; extra?: React.ReactNode };

function Figure({ layout, className }: { layout: Layout; className: string }) {
  const [vw, vh] = layout.view;
  return <svg className={`diagram ${className}`} viewBox={`0 0 ${vw} ${vh}`} role="presentation" aria-hidden="true">
    <g className="diagram-edges">
      {layout.edges.map((e, i) => <g key={i} style={{ "--d": `${(e.delay ?? i) * 90}ms` } as React.CSSProperties}>
        <path className={`edge ${e.dashed ? "edge-dashed" : ""}`} d={e.d} pathLength={100} />
        {e.flow && <path className="edge-flow" d={e.d} pathLength={100} />}
      </g>)}
    </g>
    {layout.extra}
    <g className="diagram-boxes">
      {layout.boxes.map((b, i) => <g key={b.id} className={`box ${b.accent ? "box-accent" : ""}`} style={{ "--d": `${120 + i * 70}ms` } as React.CSSProperties}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={8} className={b.dashed ? "box-dashed" : undefined} />
        <text x={b.x + 14} y={b.y + (b.note ? b.h / 2 - 3 : b.h / 2 + 4)} className="box-label">{b.label}</text>
        {b.note && <text x={b.x + 14} y={b.y + b.h / 2 + 13} className="box-note">{b.note}</text>}
      </g>)}
    </g>
  </svg>;
}

const h = (x1: number, y: number, x2: number) => `M${x1} ${y}H${x2}`;
const v = (x: number, y1: number, y2: number) => `M${x} ${y1}V${y2}`;
const elbow = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1}V${(y1 + y2) / 2}H${x2}V${y2}`;

type ArtillectLabels = { client: string; api: string; rag: string; queue: string; workers: string; gpu: string; external: string; outputs: string[] };

function chips(outputs: string[], positions: [number, number][], w: number) {
  return <g className="diagram-chips">
    {outputs.map((o, i) => <g key={o} className="chip" style={{ "--d": `${700 + i * 60}ms` } as React.CSSProperties}>
      <rect x={positions[i][0]} y={positions[i][1]} width={w} height={30} rx={15} />
      <text x={positions[i][0] + w / 2} y={positions[i][1] + 19.5} textAnchor="middle">{o}</text>
    </g>)}
  </g>;
}

export function ArtillectDiagram({ labels }: { labels: ArtillectLabels }) {
  const wide: Layout = {
    view: [800, 410],
    boxes: [
      { id: "rag", x: 160, y: 24, w: 150, h: 48, label: labels.rag, dashed: true },
      { id: "client", x: 16, y: 146, w: 110, h: 48, label: labels.client },
      { id: "api", x: 160, y: 146, w: 150, h: 48, label: labels.api, accent: true },
      { id: "queue", x: 344, y: 146, w: 160, h: 48, label: labels.queue },
      { id: "workers", x: 538, y: 146, w: 150, h: 48, label: labels.workers },
      { id: "gpu", x: 430, y: 254, w: 176, h: 48, label: labels.gpu },
      { id: "external", x: 622, y: 254, w: 168, h: 48, label: labels.external },
    ],
    edges: [
      { d: h(126, 170, 160), flow: true },
      { d: v(235, 146, 72), dashed: true, flow: true },
      { d: h(310, 170, 344), flow: true },
      { d: h(504, 170, 538), flow: true },
      { d: elbow(590, 194, 518, 254), flow: true },
      { d: elbow(636, 194, 706, 254), flow: true },
      { d: elbow(518, 302, 470, 344), flow: true, delay: 7 },
      { d: elbow(706, 302, 640, 344), flow: true, delay: 7 },
      { d: h(160, 344, 790), delay: 8 },
    ],
    extra: chips(labels.outputs, [0, 1, 2, 3, 4].map(i => [160 + i * 128, 360] as [number, number]), 110),
  };
  const narrow: Layout = {
    view: [360, 520],
    boxes: [
      { id: "client", x: 115, y: 8, w: 130, h: 44, label: labels.client },
      { id: "api", x: 16, y: 92, w: 156, h: 44, label: labels.api, accent: true },
      { id: "rag", x: 192, y: 92, w: 152, h: 44, label: labels.rag, dashed: true },
      { id: "queue", x: 94, y: 176, w: 172, h: 44, label: labels.queue },
      { id: "workers", x: 94, y: 260, w: 172, h: 44, label: labels.workers },
      { id: "gpu", x: 8, y: 344, w: 168, h: 44, label: labels.gpu },
      { id: "external", x: 184, y: 344, w: 168, h: 44, label: labels.external },
    ],
    edges: [
      { d: elbow(180, 52, 94, 92), flow: true },
      { d: h(172, 114, 192), dashed: true, flow: true },
      { d: elbow(94, 136, 180, 176), flow: true },
      { d: v(180, 220, 260), flow: true },
      { d: elbow(150, 304, 92, 344), flow: true },
      { d: elbow(210, 304, 268, 344), flow: true },
      { d: v(92, 388, 418), flow: true, delay: 7 },
      { d: v(268, 388, 418), flow: true, delay: 7 },
      { d: h(16, 418, 344), delay: 8 },
    ],
    extra: chips(labels.outputs, [[16, 436], [126, 436], [236, 436], [71, 478], [181, 478]], 104),
  };
  return <div className="diagram-frame" data-inview>
    <Figure layout={wide} className="diagram-wide" />
    <Figure layout={narrow} className="diagram-narrow" />
  </div>;
}

// Deterministic "workflow" graph: columns of small nodes with forward links and one highlighted trace.
function workflowGraph(x: number, y: number, w: number, h: number, vertical: boolean) {
  const cols = 8, rows = [10, 13, 14, 12, 15, 13, 11, 14];
  const rand = (n: number) => { const s = Math.sin(n * 91.7 + 12.9) * 43758.5453; return s - Math.floor(s); };
  const nodes: { cx: number; cy: number; c: number; r: number }[][] = [];
  for (let c = 0; c < cols; c++) {
    nodes.push([]);
    for (let r = 0; r < rows[c]; r++) {
      const a = (c + 0.5) / cols, b = (r + 0.5 + (rand(c * 31 + r) - 0.5) * 0.5) / rows[c];
      nodes[c].push({ cx: x + (vertical ? b : a) * w, cy: y + (vertical ? a : b) * h, c, r });
    }
  }
  const links: string[] = [];
  for (let c = 0; c < cols - 1; c++) for (const n of nodes[c]) {
    const fan = 1 + Math.floor(rand(c * 7 + n.r * 3) * 2);
    for (let k = 0; k < fan; k++) {
      const m = nodes[c + 1][Math.min(rows[c + 1] - 1, Math.max(0, Math.round((n.r / rows[c]) * rows[c + 1] + (rand(c * 13 + n.r * 5 + k) - 0.5) * 4)))];
      links.push(`M${n.cx.toFixed(1)} ${n.cy.toFixed(1)}L${m.cx.toFixed(1)} ${m.cy.toFixed(1)}`);
    }
  }
  const trace = nodes.map((col, c) => col[Math.floor(rows[c] * (0.35 + 0.3 * rand(c * 3 + 1)))]);
  const traceD = trace.map((n, i) => `${i ? "L" : "M"}${n.cx.toFixed(1)} ${n.cy.toFixed(1)}`).join("");
  const total = rows.reduce((a, b) => a + b, 0);
  return { total, el: <g className="workflow">
    <path className="workflow-links" d={links.join("")} />
    {nodes.flat().map(n => <circle key={`${n.c}-${n.r}`} className="workflow-node" cx={n.cx} cy={n.cy} r={2.4} />)}
    <path className="workflow-trace" d={traceD} pathLength={100} />
    {trace.map((n, i) => <circle key={i} className="workflow-hit" cx={n.cx} cy={n.cy} r={4} style={{ "--d": `${900 + i * 120}ms` } as React.CSSProperties} />)}
  </g> };
}

type AdventariumLabels = { channels: string; api: string; apiNote: string; workflows: string; workflowsNote: string; eval: string; trace: string; db: string; schematic: string };

export function AdventariumDiagram({ labels }: { labels: AdventariumLabels }) {
  const wideGraph = workflowGraph(420, 108, 340, 196, false);
  const wide: Layout = {
    view: [800, 410],
    boxes: [
      { id: "eval", x: 196, y: 40, w: 178, h: 48, label: labels.eval, accent: true },
      { id: "channels", x: 16, y: 166, w: 150, h: 48, label: labels.channels },
      { id: "api", x: 196, y: 160, w: 178, h: 60, label: labels.api, note: labels.apiNote },
      { id: "db", x: 196, y: 290, w: 178, h: 44, label: labels.db },
      { id: "trace", x: 400, y: 352, w: 384, h: 40, label: labels.trace, dashed: true },
    ],
    edges: [
      { d: h(166, 190, 196), flow: true },
      { d: h(374, 190, 400), flow: true },
      { d: v(285, 220, 290) },
      { d: "M374 64H387V120H400", dashed: true, flow: true },
      { d: v(592, 330, 352), dashed: true },
    ],
    extra: <g>
      <rect className="workflow-frame" x={400} y={40} width={384} height={290} rx={10} />
      <text className="box-label" x={416} y={68}>{labels.workflows}</text>
      <text className="box-note" x={416} y={86}>{labels.workflowsNote}</text>
      <text className="diagram-tag" x={768} y={68} textAnchor="end">{labels.schematic}</text>
      {wideGraph.el}
    </g>,
  };
  const narrowGraph = workflowGraph(26, 330, 308, 190, true);
  const narrow: Layout = {
    view: [360, 600],
    boxes: [
      { id: "channels", x: 105, y: 8, w: 150, h: 44, label: labels.channels },
      { id: "api", x: 16, y: 86, w: 164, h: 56, label: labels.api, note: labels.apiNote },
      { id: "db", x: 196, y: 92, w: 148, h: 44, label: labels.db },
      { id: "eval", x: 196, y: 172, w: 148, h: 44, label: labels.eval, accent: true },
      { id: "trace", x: 8, y: 552, w: 344, h: 40, label: labels.trace, dashed: true },
    ],
    edges: [
      { d: elbow(180, 52, 98, 86), flow: true },
      { d: h(180, 114, 196) },
      { d: v(98, 142, 250), flow: true },
      { d: v(270, 216, 250), dashed: true, flow: true },
      { d: v(180, 536, 552), dashed: true },
    ],
    extra: <g>
      <rect className="workflow-frame" x={8} y={250} width={344} height={286} rx={10} />
      <text className="box-label" x={22} y={276}>{labels.workflows}</text>
      <text className="box-note" x={22} y={294}>{labels.workflowsNote}</text>
      <text className="diagram-tag" x={338} y={276} textAnchor="end">{labels.schematic}</text>
      {narrowGraph.el}
    </g>,
  };
  return <div className="diagram-frame" data-inview>
    <Figure layout={wide} className="diagram-wide" />
    <Figure layout={narrow} className="diagram-narrow" />
  </div>;
}
