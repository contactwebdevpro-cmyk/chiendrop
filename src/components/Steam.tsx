/** Volutes de vapeur décoratives (CSS pur, masquées aux lecteurs d'écran). */
export default function Steam() {
  const puffs = [ [18, 0], [38, 1.3], [56, 2.4], [30, 3.4], [66, 4.2] ];
  return (
    <div className="steam" aria-hidden="true">
      {puffs.map(([x, d], i) => (<i key={i} style={{ "--x": x, "--d": d } as React.CSSProperties} />))}
    </div>
  );
}
