function smoothPath(points, smooth) {
  function r2p(p1, p2) {
    const x = p2[0] - p1[0];
    const y = p2[1] - p1[1];
    return [Math.sqrt(x * x + y * y), Math.atan2(y, x)];
  }

  function bcps(p, pp, np) {
    let r = r2p(pp, np);
    r[0] *= smooth;
    return [p[0] + Math.cos(r[1]) * r[0], p[1] + Math.sin(r[1]) * r[0]];
  }

  function bcpe(p, pp, np) {
    let r = r2p(pp, np);
    r[0] *= smooth;
    r[1] += Math.PI;
    return [p[0] + Math.cos(r[1]) * r[0], p[1] + Math.sin(r[1]) * r[0]];
  }

  function cstr(p, pp, p_2, np) {
    const cps = bcps(pp, p_2, p);
    const cpe = bcpe(p, pp, np);
    return `${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${p[0]},${p[1]}`;
  }

  return points.reduce((acc, p, i, a) => {
    st =
      i === 0
        ? `M${p[0]},${p[1]}`
        : i === 1
          ? ` C${cstr(p, a[0], a[0], a[2])}`
          : i === a.length - 1
            ? ` C${cstr(p, a[i - 1], a[i - 2], p)}`
            : ` C${cstr(p, a[i - 1], a[i - 2], a[i + 1])}`;
    return acc + st;
  }, "");
}
