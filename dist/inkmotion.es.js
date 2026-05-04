import { jsxs as I, jsx as M } from "react/jsx-runtime";
import { useRef as S, useCallback as B, useEffect as z } from "react";
const N = "'Instrument Serif', Georgia, serif", O = "'DM Mono', monospace", W = "#0E0C09", G = "#B0A090", j = "#E6100F";
function w(e, y, p = 0.08, i = 0.72) {
  return e.vel += (y - e.pos) * p, e.vel *= i, e.pos += e.vel, Math.abs(e.vel) + Math.abs(y - e.pos) < 0.05;
}
function R(e, y, p, i = 0.08, n = 0.72) {
  return e.vx += (y - e.x) * i, e.vx *= n, e.x += e.vx, e.vy += (p - e.y) * i, e.vy *= n, e.y += e.vy, Math.hypot(e.vx, e.vy) + Math.hypot(y - e.x, p - e.y) < 0.05;
}
function h(e, y, p) {
  cancelAnimationFrame(e.current);
  const i = () => {
    y() ? p == null || p() : e.current = requestAnimationFrame(i);
  };
  e.current = requestAnimationFrame(i);
}
function U(e) {
  e.forEach((y) => {
    y.style.cssText = "display:inline-block; white-space:pre; opacity:0;";
  });
}
function E(e, y) {
  function p({
    text: i = "Always cooking",
    fontSize: n = "clamp(48px, 9vw, 110px)",
    color: t = W,
    fontFamily: s = N,
    italic: o = !0,
    showLabel: a = !0,
    showReplay: r = !0,
    showBaseline: c = !0,
    animateInView: l = !1,
    onComplete: m,
    style: u,
    className: f
  }) {
    const x = i.split(""), d = S(null), v = S([]), b = S(null), g = S(() => {
    }), $ = B(() => {
      const _ = d.current;
      !_ || v.current.length === 0 || (g.current(), g.current = () => {
      }, cancelAnimationFrame(b.current), U(v.current), y(v.current, _, b, (k) => {
        g.current = k;
      }, m));
    }, [m]);
    return z(() => {
      if (!l) {
        const Y = setTimeout($, 16);
        return () => {
          clearTimeout(Y), cancelAnimationFrame(b.current), g.current();
        };
      }
      const _ = d.current;
      if (!_) return;
      const k = new IntersectionObserver(
        ([Y]) => {
          Y.isIntersecting && ($(), k.disconnect());
        },
        { threshold: 0.2 }
      );
      return k.observe(_), () => {
        k.disconnect(), cancelAnimationFrame(b.current), g.current();
      };
    }, [$, i, l]), /* @__PURE__ */ I(
      "div",
      {
        className: f,
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "40px 48px",
          fontFamily: O,
          ...u
        },
        children: [
          a && /* @__PURE__ */ M("span", { style: {
            fontFamily: O,
            fontSize: 10,
            fontWeight: 300,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: G,
            marginBottom: 20
          }, children: e }),
          /* @__PURE__ */ M(
            "span",
            {
              ref: (_) => {
                d.current = _;
              },
              style: {
                fontFamily: s,
                fontSize: n,
                fontWeight: 400,
                fontStyle: o ? "italic" : "normal",
                color: t,
                letterSpacing: "-0.025em",
                lineHeight: 1,
                display: "flex",
                flexWrap: "wrap"
              },
              children: x.map((_, k) => /* @__PURE__ */ M(
                "span",
                {
                  ref: (Y) => {
                    Y && (v.current[k] = Y);
                  },
                  style: { display: "inline-block", whiteSpace: "pre", opacity: 0 },
                  children: _
                },
                k
              ))
            }
          ),
          c && /* @__PURE__ */ M("div", { style: {
            width: "100%",
            height: 1,
            background: t,
            marginTop: 18,
            opacity: 0.18
          } }),
          r && /* @__PURE__ */ M(
            "button",
            {
              onClick: $,
              style: {
                marginTop: 28,
                padding: 0,
                background: "none",
                border: "none",
                fontFamily: O,
                fontSize: 11,
                fontWeight: 300,
                letterSpacing: "0.12em",
                color: j,
                cursor: "pointer",
                textTransform: "lowercase"
              },
              children: "↺ replay"
            }
          )
        ]
      }
    );
  }
  return p.displayName = e, p;
}
const J = E("drop-settle", (e, y, p, i, n) => {
  const t = e.map(() => ({ pos: -100, vel: 0, op: 0, opv: 0 }));
  let s = 0;
  h(p, () => {
    s++;
    let o = !0;
    return e.forEach((a, r) => {
      if (s < r * 3) {
        o = !1;
        return;
      }
      w(t[r], 0, 0.07, 0.68) || (o = !1), t[r].opv += (1 - t[r].op) * 0.09, t[r].opv *= 0.72, t[r].op += t[r].opv, a.style.transform = `translateY(${t[r].pos}px)`, a.style.opacity = String(t[r].op);
    }), o;
  }, n);
}), K = E("rise-overshoot", (e, y, p, i, n) => {
  const t = e.map(() => ({ pos: 80, vel: 0, op: 0, opv: 0 }));
  let s = 0;
  h(p, () => {
    s++;
    let o = !0;
    return e.forEach((a, r) => {
      if (s < r * 3) {
        o = !1;
        return;
      }
      w(t[r], 0, 0.11, 0.62) || (o = !1), t[r].opv += (1 - t[r].op) * 0.11, t[r].opv *= 0.68, t[r].op += t[r].opv, a.style.transform = `translateY(${t[r].pos}px)`, a.style.opacity = String(t[r].op);
    }), o;
  }, n);
}), Q = E("gravity-bounce", (e, y, p, i, n) => {
  const s = e.map((a, r) => ({ pos: -(60 + r * 12), vel: 0, settled: !1, op: 0, opv: 0 }));
  let o = 0;
  h(p, () => {
    o++;
    let a = !0;
    return e.forEach((r, c) => {
      if (o < c * 4) {
        a = !1;
        return;
      }
      const l = s[c];
      l.settled || (l.vel += 0.9, l.pos += l.vel, l.pos >= 0 ? (l.pos = 0, l.vel *= -0.42, Math.abs(l.vel) < 1 ? (l.vel = 0, l.settled = !0) : a = !1) : a = !1), l.opv += (1 - l.op) * 0.07, l.opv *= 0.78, l.op += l.opv, r.style.transform = `translateY(${l.pos}px)`, r.style.opacity = String(l.op);
    }), a;
  }, n);
}), D = E("explode-formation", (e, y, p, i, n) => {
  const t = e.map(() => ({
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 400,
    vx: 0,
    vy: 0,
    op: 0,
    opv: 0
  }));
  e.forEach((s, o) => {
    s.style.transform = `translate(${t[o].x}px, ${t[o].y}px)`, s.style.opacity = "0";
  }), h(p, () => e.every((s, o) => {
    const a = R(t[o], 0, 0, 0.06, 0.74);
    return t[o].opv += (1 - t[o].op) * 0.05, t[o].opv *= 0.8, t[o].op += t[o].opv, s.style.transform = `translate(${t[o].x}px, ${t[o].y}px)`, s.style.opacity = String(t[o].op), a;
  }), n);
}), tt = E("center-burst", (e, y, p, i, n) => {
  var l, m;
  const t = (m = (l = e[0]) == null ? void 0 : l.parentElement) == null ? void 0 : m.getBoundingClientRect(), s = t ? t.left + t.width / 2 : 0, o = e.map((u) => {
    const f = u.getBoundingClientRect();
    return f.left + f.width / 2 - s;
  }), a = e.map((u, f) => ({ pos: -o[f], vel: 0 })), r = e.map(() => ({ pos: (Math.random() - 0.5) * 40, vel: 0 })), c = e.map(() => ({ pos: 0, vel: 0 }));
  e.forEach((u, f) => {
    u.style.transform = `translate(${a[f].pos}px, ${r[f].pos}px)`, u.style.opacity = "0";
  }), h(p, () => e.every((u, f) => {
    const x = w(a[f], 0, 0.07, 0.7), d = w(r[f], 0, 0.09, 0.68);
    return w(c[f], 1, 0.08, 0.74), u.style.transform = `translate(${a[f].pos}px, ${r[f].pos}px)`, u.style.opacity = String(c[f].pos), x && d;
  }), n);
}), et = E("repulsion", (e, y, p, i) => {
  const n = e.map((r) => r.getBoundingClientRect()), t = e.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, op: 1, opv: 0 }));
  e.forEach((r) => {
    r.style.opacity = "1";
  });
  let s = -9999, o = -9999;
  const a = (r) => {
    s = r.clientX, o = r.clientY;
  };
  document.addEventListener("mousemove", a), i(() => {
    document.removeEventListener("mousemove", a), e.forEach((r) => {
      r.style.transform = "", r.style.opacity = "1";
    });
  }), h(p, () => (e.forEach((r, c) => {
    const l = n[c], m = l.left + l.width / 2 + t[c].x, u = l.top + l.height / 2 + t[c].y, f = m - s, x = u - o, d = Math.hypot(f, x), v = 90;
    if (d < v && d > 0) {
      const $ = (v - d) / v * 0.55;
      t[c].vx += f / d * $, t[c].vy += x / d * $;
    }
    t[c].vx += (0 - t[c].x) * 0.08, t[c].vx *= 0.8, t[c].x += t[c].vx, t[c].vy += (0 - t[c].y) * 0.08, t[c].vy *= 0.8, t[c].y += t[c].vy;
    const b = Math.hypot(t[c].x, t[c].y), g = Math.max(0.25, 1 - b / 80);
    t[c].opv += (g - t[c].op) * 0.1, t[c].opv *= 0.75, t[c].op += t[c].opv, r.style.transform = `translate(${t[c].x}px, ${t[c].y}px)`, r.style.opacity = String(t[c].op);
  }), !1));
}), st = E("magnetic-pull", (e, y, p, i) => {
  const n = e.map((c) => c.getBoundingClientRect()), t = e.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));
  e.forEach((c) => {
    c.style.opacity = "1";
  });
  let s = -9999, o = -9999;
  const a = (c) => {
    s = c.clientX, o = c.clientY;
  }, r = () => {
    s = -9999, o = -9999;
  };
  document.addEventListener("mousemove", a), document.addEventListener("mouseleave", r), i(() => {
    document.removeEventListener("mousemove", a), document.removeEventListener("mouseleave", r), e.forEach((c) => {
      c.style.transform = "";
    });
  }), h(p, () => (e.forEach((c, l) => {
    const m = n[l], u = m.left + m.width / 2 + t[l].x, f = m.top + m.height / 2 + t[l].y, x = s - u, d = o - f, v = Math.hypot(x, d), b = 110;
    if (v < b && v > 0) {
      const g = (b - v) / b * 0.3;
      t[l].vx += x / v * g, t[l].vy += d / v * g;
    }
    t[l].vx += (0 - t[l].x) * 0.06, t[l].vx *= 0.82, t[l].x += t[l].vx, t[l].vy += (0 - t[l].y) * 0.06, t[l].vy *= 0.82, t[l].y += t[l].vy, c.style.transform = `translate(${t[l].x}px, ${t[l].y}px)`;
  }), !1));
}), ot = E("spring-kerning", (e, y, p, i) => {
  const n = (e.length - 1) / 2, t = { pos: 0, vel: 0 };
  e.forEach((a) => {
    a.style.opacity = "1";
  });
  let s = 0;
  const o = (a) => {
    s = (a.clientX / window.innerWidth - 0.5) * 80;
  };
  document.addEventListener("mousemove", o), i(() => {
    document.removeEventListener("mousemove", o), e.forEach((a) => {
      a.style.transform = "";
    });
  }), h(p, () => (w(t, s, 0.06, 0.8), e.forEach((a, r) => {
    a.style.transform = `translateX(${(r - n) / Math.max(n, 1) * t.pos}px)`;
  }), !1));
}), nt = E("drag-release", (e, y, p, i) => {
  const n = e.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, held: !1 }));
  e.forEach((l) => {
    l.style.opacity = "1", l.style.cursor = "grab";
  });
  let t = -1, s = 0, o = 0;
  const a = (l) => {
    e.forEach((m, u) => {
      const f = m.getBoundingClientRect();
      l.clientX >= f.left && l.clientX <= f.right && l.clientY >= f.top && l.clientY <= f.bottom && (t = u, n[u].held = !0, s = l.clientX, o = l.clientY, m.style.cursor = "grabbing");
    });
  }, r = (l) => {
    if (t < 0) return;
    const m = n[t];
    m.vx = l.clientX - s, m.vy = l.clientY - o, m.x += m.vx, m.y += m.vy, s = l.clientX, o = l.clientY, e[t].style.transform = `translate(${m.x}px, ${m.y}px)`;
  }, c = () => {
    t >= 0 && (n[t].held = !1, e[t].style.cursor = "grab"), t = -1;
  };
  document.addEventListener("mousedown", a), document.addEventListener("mousemove", r), document.addEventListener("mouseup", c), i(() => {
    document.removeEventListener("mousedown", a), document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", c), e.forEach((l) => {
      l.style.transform = "", l.style.cursor = "";
    });
  }), h(p, () => (e.forEach((l, m) => {
    n[m].held || (R(n[m], 0, 0, 0.08, 0.7), l.style.transform = `translate(${n[m].x}px, ${n[m].y}px)`);
  }), !1));
}), rt = E("gravity-well", (e, y, p, i) => {
  const n = e.map((c) => c.getBoundingClientRect()), t = e.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));
  e.forEach((c) => {
    c.style.opacity = "1";
  });
  let s = -9999, o = -9999;
  const a = (c) => {
    s = c.clientX, o = c.clientY;
  }, r = () => {
    s = -9999, o = -9999;
  };
  document.addEventListener("mousemove", a), document.addEventListener("mouseleave", r), i(() => {
    document.removeEventListener("mousemove", a), document.removeEventListener("mouseleave", r), e.forEach((c) => {
      c.style.transform = "";
    });
  }), h(p, () => (e.forEach((c, l) => {
    const m = n[l], u = m.left + m.width / 2 + t[l].x, f = m.top + m.height / 2 + t[l].y, x = s - u, d = o - f, v = Math.hypot(x, d);
    if (v > 10 && v < 250) {
      const b = Math.min(120 / (v * v), 1.5);
      t[l].vx += x / v * b, t[l].vy += d / v * b;
    }
    t[l].vx += (0 - t[l].x) * 0.025, t[l].vx *= 0.9, t[l].x += t[l].vx, t[l].vy += (0 - t[l].y) * 0.025, t[l].vy *= 0.9, t[l].y += t[l].vy, c.style.transform = `translate(${t[l].x}px, ${t[l].y}px)`;
  }), !1));
}), at = E("thermal-noise", (e, y, p, i) => {
  const n = e.map(() => ({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    tx: 0,
    ty: 0,
    timer: Math.floor(Math.random() * 30)
  }));
  e.forEach((t) => {
    t.style.opacity = "1";
  }), i(() => {
    e.forEach((t) => {
      t.style.transform = "";
    });
  }), h(p, () => (e.forEach((t, s) => {
    const o = n[s];
    --o.timer <= 0 && (o.tx = (Math.random() - 0.5) * 10, o.ty = (Math.random() - 0.5) * 7, o.timer = 20 + Math.floor(Math.random() * 35)), R(o, o.tx, o.ty, 0.07, 0.76), t.style.transform = `translate(${o.x}px, ${o.y}px)`;
  }), !1));
}), lt = E("breathing", (e, y, p, i) => {
  const n = e.map(() => ({ pos: 1, vel: 0 }));
  e.forEach((s) => {
    s.style.opacity = "1", s.style.transformOrigin = "50% 80%";
  });
  let t = 0;
  i(() => {
    e.forEach((s) => {
      s.style.transform = "", s.style.transformOrigin = "";
    });
  }), h(p, () => (t++, e.forEach((s, o) => {
    const a = 1 + Math.sin(t * 0.04 + o * 0.45) * 0.18;
    w(n[o], a, 0.05, 0.84), s.style.transform = `scale(${n[o].pos})`;
  }), !1));
}), ct = E("orbital-drift", (e, y, p, i) => {
  const n = e.map((s, o) => ({ x: 0, y: 0, vx: 0, vy: 0, phase: o * 0.55 }));
  e.forEach((s) => {
    s.style.opacity = "1";
  });
  let t = 0;
  i(() => {
    e.forEach((s) => {
      s.style.transform = "";
    });
  }), h(p, () => (t++, e.forEach((s, o) => {
    const a = n[o], r = 3 + Math.sin(a.phase * 1.7) * 2, c = Math.cos(t * 0.022 + a.phase) * r, l = Math.sin(t * 0.022 + a.phase * 0.7) * r * 0.55;
    R(a, c, l, 0.04, 0.86), s.style.transform = `translate(${a.x}px, ${a.y}px)`;
  }), !1));
}), it = E("weight-wave", (e, y, p, i) => {
  const n = e.map(() => ({ pos: 400, vel: 0 }));
  e.forEach((s) => {
    s.style.opacity = "1";
  });
  let t = 0;
  i(() => {
    e.forEach((s) => {
      s.style.fontVariationSettings = "";
    });
  }), h(p, () => (t++, e.forEach((s, o) => {
    const a = 400 + Math.sin(t * 0.055 - o * 0.5) * 290;
    w(n[o], a, 0.05, 0.82), s.style.fontVariationSettings = `'wght' ${n[o].pos}`;
  }), !1));
}), pt = E("pendulum", (e, y, p, i, n) => {
  const t = e.map((s, o) => ({
    pos: (o % 2 === 0 ? 1 : -1) * (25 + Math.random() * 25),
    vel: 0
  }));
  e.forEach((s) => {
    s.style.opacity = "1", s.style.transformOrigin = "50% 0%";
  }), h(p, () => e.every((s, o) => {
    const a = w(t[o], 0, 0.025, 0.94);
    return s.style.transform = `rotateZ(${t[o].pos}deg)`, a;
  }), n);
}), yt = E("shockwave", (e, y, p, i) => {
  const n = e.map((r) => r.getBoundingClientRect()), t = e.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, op: 1, opv: 0 }));
  e.forEach((r) => {
    r.style.opacity = "1";
  });
  const s = (r, c) => {
    e.forEach((l, m) => {
      const u = n[m], f = u.left + u.width / 2 - r, x = u.top + u.height / 2 - c, d = Math.hypot(f, x);
      if (d < 220 && d > 0) {
        const v = (220 - d) / 220 * 9;
        t[m].vx += f / d * v, t[m].vy += x / d * v, t[m].op = Math.max(0.1, t[m].op - (220 - d) / 220 * 0.8), t[m].opv = 0;
      }
    });
  }, o = y.getBoundingClientRect();
  s(o.left + o.width / 2, o.top + o.height / 2);
  const a = (r) => s(r.clientX, r.clientY);
  document.addEventListener("click", a), i(() => {
    document.removeEventListener("click", a), e.forEach((r) => {
      r.style.transform = "", r.style.opacity = "1";
    });
  }), h(p, () => (e.forEach((r, c) => {
    R(t[c], 0, 0, 0.07, 0.74), t[c].opv += (1 - t[c].op) * 0.12, t[c].opv *= 0.7, t[c].op += t[c].opv, r.style.transform = `translate(${t[c].x}px, ${t[c].y}px)`, r.style.opacity = String(t[c].op);
  }), !1));
}), mt = E("wave-cascade", (e, y, p, i, n) => {
  const t = e.map(() => ({ pos: 0, vel: 0 }));
  t[0].vel = -14, e.forEach((s) => {
    s.style.opacity = "1";
  }), h(p, () => (e.forEach((s, o) => {
    o > 0 && (t[o].vel += t[o - 1].vel * 0.09), w(t[o], 0, 0.055, 0.76), s.style.transform = `translateY(${t[o].pos}px)`;
  }), t.every((s) => Math.abs(s.pos) + Math.abs(s.vel) < 0.05)), n);
}), ft = E("jelly-hover", (e, y, p, i) => {
  const n = e.map(() => ({ sx: 1, svx: 0, sy: 1, svy: 0 }));
  e.forEach((s) => {
    s.style.opacity = "1", s.style.transformOrigin = "50% 80%";
  });
  const t = (s) => {
    const o = e.indexOf(s.target);
    o < 0 || (n[o].svx = -0.06, n[o].svy = 0.06);
  };
  y.addEventListener("mouseover", t), i(() => {
    y.removeEventListener("mouseover", t), e.forEach((s) => {
      s.style.transform = "", s.style.transformOrigin = "";
    });
  }), h(p, () => (e.forEach((s, o) => {
    const a = n[o];
    a.svx += (1 - a.sx) * 0.14, a.svx *= 0.58, a.sx += a.svx, a.svy += (1 - a.sy) * 0.14, a.svy *= 0.58, a.sy += a.svy, s.style.transform = `scaleX(${a.sx}) scaleY(${a.sy})`;
  }), !1));
}), ut = E("scatter-return", (e, y, p, i) => {
  const n = e.map(() => (Math.random() - 0.5) * 420), t = e.map(() => (Math.random() - 0.5) * 220), s = e.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, op: 1, opv: 0 }));
  e.forEach((c) => {
    c.style.opacity = "1";
  });
  let o = !1;
  const a = () => {
    o = !0;
  }, r = () => {
    o = !1;
  };
  y.addEventListener("mouseenter", a), y.addEventListener("mouseleave", r), i(() => {
    y.removeEventListener("mouseenter", a), y.removeEventListener("mouseleave", r), e.forEach((c) => {
      c.style.transform = "", c.style.opacity = "1";
    });
  }), h(p, () => (e.forEach((c, l) => {
    const m = o ? n[l] : 0, u = o ? t[l] : 0, f = o ? 0.04 : 0.09, x = o ? 0.88 : 0.72;
    R(s[l], m, u, f, x);
    const d = o ? 0.2 : 1;
    s[l].opv += (d - s[l].op) * 0.06, s[l].opv *= 0.82, s[l].op += s[l].opv, c.style.transform = `translate(${s[l].x}px, ${s[l].y}px)`, c.style.opacity = String(s[l].op);
  }), !1));
}), dt = E("domino-fall", (e, y, p, i, n) => {
  e.forEach((s) => {
    s.style.opacity = "1", s.style.transformOrigin = "50% 100%";
  });
  const t = e.map(() => ({ angle: 0, vel: 0, active: !1, done: !1 }));
  t[0].active = !0, h(p, () => {
    let s = !0;
    return e.forEach((o, a) => {
      const r = t[a];
      if (!r.active || r.done) {
        r.done || (s = !1);
        return;
      }
      r.vel += (90 - r.angle) * 0.035, r.vel *= 0.94, r.angle += r.vel, r.angle > 50 && a + 1 < e.length && !t[a + 1].active && (t[a + 1].active = !0), r.angle >= 90 ? (r.angle = 90, r.vel = 0, r.done = !0) : s = !1, o.style.transform = `rotateZ(${r.angle}deg)`;
    }), s;
  }, n);
}), H = "'Space Grotesk', system-ui, sans-serif", C = "'DM Mono', monospace", P = "#E8EAF0", q = "#7C5CFF", F = "#2EE6A6", X = /* @__PURE__ */ new Set();
function L(e, y) {
  if (X.has(e) || typeof document > "u") return;
  const p = document.createElement("style");
  p.id = `inkmotion-kf-${e}`, p.textContent = `@keyframes inkmotion-${e} { ${y} }`, document.head.appendChild(p), X.add(e);
}
function T(e, y) {
  function p({
    text: i = "Always cooking something",
    fontSize: n = "clamp(28px, 5vw, 64px)",
    color: t = P,
    accentColor: s = q,
    fontFamily: o = H,
    showLabel: a = !0,
    showReplay: r = !0,
    animateInView: c = !1,
    onComplete: l,
    style: m,
    className: u
  }) {
    const f = i.split(""), x = S(null), d = S([]), v = S(() => {
    }), b = B(() => {
      const g = x.current;
      !g || d.current.length === 0 || (v.current(), v.current = () => {
      }, y(d.current, g, s, ($) => {
        v.current = $;
      }, l));
    }, [s, l]);
    return z(() => {
      if (!c) {
        const _ = setTimeout(b, 16);
        return () => {
          clearTimeout(_), v.current();
        };
      }
      const g = x.current;
      if (!g) return;
      const $ = new IntersectionObserver(
        ([_]) => {
          _.isIntersecting && (b(), $.disconnect());
        },
        { threshold: 0.2 }
      );
      return $.observe(g), () => {
        $.disconnect(), v.current();
      };
    }, [b, i, c]), /* @__PURE__ */ I(
      "div",
      {
        className: u,
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 48px",
          fontFamily: C,
          ...m
        },
        children: [
          a && /* @__PURE__ */ M("span", { style: {
            fontFamily: C,
            fontSize: 10,
            fontWeight: 300,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: `${s}99`,
            marginBottom: 24
          }, children: e }),
          /* @__PURE__ */ M(
            "span",
            {
              ref: (g) => {
                x.current = g;
              },
              style: {
                fontFamily: o,
                fontSize: n,
                fontWeight: 700,
                color: t,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"
              },
              children: f.map((g, $) => /* @__PURE__ */ M(
                "span",
                {
                  ref: (_) => {
                    _ && (d.current[$] = _);
                  },
                  style: { display: "inline-block", whiteSpace: "pre", opacity: 0 },
                  children: g
                },
                $
              ))
            }
          ),
          r && /* @__PURE__ */ M(
            "button",
            {
              onClick: b,
              style: {
                marginTop: 40,
                padding: "10px 24px",
                background: `${s}1F`,
                border: `1px solid ${s}4D`,
                borderRadius: 6,
                color: s,
                fontFamily: C,
                fontSize: 12,
                cursor: "pointer"
              },
              children: "↺ replay"
            }
          )
        ]
      }
    );
  }
  return p.displayName = e, p;
}
const vt = T("fade-up", (e, y, p, i, n) => {
  const t = [];
  e.forEach((s, o) => {
    s.style.cssText = "opacity:0; transform:translateY(28px); transition:none; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.transition = `opacity 0.55s ease ${o * 45}ms, transform 0.55s ease ${o * 45}ms`, s.style.opacity = "1", s.style.transform = "translateY(0)";
    }, 20));
  }), t.push(setTimeout(() => n == null ? void 0 : n(), (e.length - 1) * 45 + 600)), i(() => t.forEach(clearTimeout));
}), xt = T("blur-in", (e, y, p, i, n) => {
  const t = [];
  e.forEach((s, o) => {
    s.style.cssText = "opacity:0; filter:blur(12px); transition:none; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.transition = `opacity 0.6s ease ${o * 40}ms, filter 0.6s ease ${o * 40}ms`, s.style.opacity = "1", s.style.filter = "blur(0)";
    }, 20));
  }), t.push(setTimeout(() => n == null ? void 0 : n(), (e.length - 1) * 40 + 650)), i(() => t.forEach(clearTimeout));
}), gt = T("scale-bounce", (e, y, p, i, n) => {
  const t = "cubic-bezier(0.34, 1.56, 0.64, 1)", s = [];
  e.forEach((o, a) => {
    o.style.cssText = "opacity:0; transform:scale(0.3); transition:none; transform-origin:50% 80%; display:inline-block; white-space:pre;", s.push(setTimeout(() => {
      o.style.transition = `opacity 0.5s ease ${a * 50}ms, transform 0.6s ${t} ${a * 50}ms`, o.style.opacity = "1", o.style.transform = "scale(1)";
    }, 20));
  }), s.push(setTimeout(() => n == null ? void 0 : n(), (e.length - 1) * 50 + 650)), i(() => s.forEach(clearTimeout));
}), ht = T("slide-right", (e, y, p, i, n) => {
  const t = [];
  e.forEach((s, o) => {
    const a = (e.length - 1 - o) * 40;
    s.style.cssText = "opacity:0; transform:translateX(36px); transition:none; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.transition = `opacity 0.5s ease ${a}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${a}ms`, s.style.opacity = "1", s.style.transform = "translateX(0)";
    }, 20));
  }), t.push(setTimeout(() => n == null ? void 0 : n(), (e.length - 1) * 40 + 550)), i(() => t.forEach(clearTimeout));
}), Et = T("wave", (e, y, p, i, n) => {
  const t = [];
  e.forEach((o, a) => {
    const r = a * 55 + Math.sin(a * 0.9) * 120;
    o.style.cssText = "opacity:0; transform:translateY(32px); transition:none; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      o.style.transition = `opacity 0.5s ease ${r}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${r}ms`, o.style.opacity = "1", o.style.transform = "translateY(0)";
    }, 20));
  });
  const s = Math.max(...e.map((o, a) => a * 55 + Math.sin(a * 0.9) * 120));
  t.push(setTimeout(() => n == null ? void 0 : n(), s + 550)), i(() => t.forEach(clearTimeout));
}), Tt = T("flip-x", (e, y, p, i, n) => {
  y.style.perspective = "600px";
  const t = [];
  e.forEach((s, o) => {
    s.style.cssText = "opacity:0; transform:rotateX(90deg); transition:none; transform-origin:50% 100%; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.transition = `opacity 0.4s ease ${o * 50}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${o * 50}ms`, s.style.opacity = "1", s.style.transform = "rotateX(0)";
    }, 20));
  }), t.push(setTimeout(() => {
    y.style.perspective = "", n == null || n();
  }, (e.length - 1) * 50 + 550)), i(() => {
    t.forEach(clearTimeout), y.style.perspective = "";
  });
}), bt = T("flip-y", (e, y, p, i, n) => {
  y.style.perspective = "600px";
  const t = [];
  e.forEach((s, o) => {
    s.style.cssText = "opacity:0; transform:rotateY(90deg); transition:none; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.transition = `opacity 0.4s ease ${o * 55}ms, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${o * 55}ms`, s.style.opacity = "1", s.style.transform = "rotateY(0)";
    }, 20));
  }), t.push(setTimeout(() => {
    y.style.perspective = "", n == null || n();
  }, (e.length - 1) * 55 + 600)), i(() => {
    t.forEach(clearTimeout), y.style.perspective = "";
  });
}), $t = T("typewriter", (e, y, p, i, n) => {
  const t = [];
  e.forEach((s) => {
    s.style.cssText = "opacity:0; display:inline-block; white-space:pre;";
  }), e.forEach((s, o) => {
    t.push(setTimeout(() => {
      s.style.opacity = "1", o === e.length - 1 && (n == null || n());
    }, o * 80));
  }), i(() => t.forEach(clearTimeout));
}), A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$", _t = T("scramble", (e, y, p, i, n) => {
  const t = e.map((r) => r.textContent ?? ""), s = [], o = [];
  e.forEach((r) => {
    r.style.cssText = "display:inline-block; white-space:pre; opacity:1;";
  });
  let a = 0;
  e.forEach((r, c) => {
    if (r.textContent === " ") {
      a++;
      return;
    }
    let l = 0;
    const m = t[c], u = 8 + Math.floor(Math.random() * 6);
    s.push(setTimeout(() => {
      const f = setInterval(() => {
        l >= u ? (r.textContent = m, r.style.color = "", clearInterval(f), a++, a >= e.length && (n == null || n())) : (r.textContent = A[Math.floor(Math.random() * A.length)], r.style.color = p), l++;
      }, 50);
      o.push(f);
    }, c * 40));
  }), i(() => {
    s.forEach(clearTimeout), o.forEach(clearInterval), e.forEach((r, c) => {
      r.textContent = t[c], r.style.color = "";
    });
  });
}), wt = T("glitch", (e, y, p, i, n) => {
  L("glitch", `
    0%   { transform: translate(-4px, 2px) skewX(-5deg); opacity: 0.4; }
    20%  { transform: translate(4px, -2px) skewX(3deg);  opacity: 0.7; }
    40%  { transform: translate(-2px, 4px) skewX(-2deg); opacity: 0.5; }
    60%  { transform: translate(3px, -3px) skewX(4deg);  opacity: 0.8; }
    80%  { transform: translate(-1px, 1px);               opacity: 0.9; }
    100% { transform: translate(0, 0);                    opacity: 1;   }
  `);
  const t = [];
  e.forEach((s, o) => {
    s.style.cssText = "opacity:0; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.animation = "inkmotion-glitch 0.5s ease forwards", o === e.length - 1 && t.push(setTimeout(() => n == null ? void 0 : n(), 500));
    }, o * 40));
  }), i(() => {
    t.forEach(clearTimeout), e.forEach((s) => {
      s.style.animation = "";
    });
  });
}), Mt = T("color-sweep", (e, y, p, i, n) => {
  const t = [];
  e.forEach((s, o) => {
    s.style.cssText = `opacity:0; transform:translateY(20px); color:${p}; transition:none; display:inline-block; white-space:pre;`, t.push(setTimeout(() => {
      s.style.transition = "opacity 0.4s ease, transform 0.4s ease, color 0.6s ease 0.15s", s.style.opacity = "1", s.style.transform = "translateY(0)", t.push(setTimeout(() => {
        s.style.color = F;
      }, o * 40 + 200)), t.push(setTimeout(() => {
        s.style.color = "", o === e.length - 1 && (n == null || n());
      }, o * 40 + 600));
    }, o * 40 + 20));
  }), i(() => t.forEach(clearTimeout));
}), kt = T("center-out", (e, y, p, i, n) => {
  const t = (e.length - 1) / 2, s = [];
  e.forEach((a, r) => {
    const c = Math.abs(r - t) * 55;
    a.style.cssText = "opacity:0; transform:scale(0.5) translateY(20px); transition:none; display:inline-block; white-space:pre;", s.push(setTimeout(() => {
      a.style.transition = `opacity 0.5s ease ${c}ms, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${c}ms`, a.style.opacity = "1", a.style.transform = "scale(1) translateY(0)";
    }, 20));
  });
  const o = Math.max(...e.map((a, r) => Math.abs(r - t))) * 55;
  s.push(setTimeout(() => n == null ? void 0 : n(), o + 600)), i(() => s.forEach(clearTimeout));
}), St = T("fall-down", (e, y, p, i, n) => {
  const t = [];
  e.forEach((s, o) => {
    s.style.cssText = "opacity:0; transform:translateY(-60px); transition:none; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.transition = `opacity 0.3s ease ${o * 45}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${o * 45}ms`, s.style.opacity = "1", s.style.transform = "translateY(0)";
    }, 20));
  }), t.push(setTimeout(() => n == null ? void 0 : n(), (e.length - 1) * 45 + 550)), i(() => t.forEach(clearTimeout));
}), Yt = T("rtl", (e, y, p, i, n) => {
  const t = [];
  e.forEach((s, o) => {
    const a = (e.length - 1 - o) * 45;
    s.style.cssText = "opacity:0; transform:translateY(28px); transition:none; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.transition = `opacity 0.55s ease ${a}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${a}ms`, s.style.opacity = "1", s.style.transform = "translateY(0)";
    }, 20));
  }), t.push(setTimeout(() => n == null ? void 0 : n(), (e.length - 1) * 45 + 600)), i(() => t.forEach(clearTimeout));
}), Rt = T("neon-pulse", (e, y, p, i, n) => {
  L("neon", `
    0%   { opacity: 0; text-shadow: none; }
    30%  { opacity: 1; text-shadow: 0 0 8px ${p}, 0 0 20px ${p}, 0 0 40px ${p}; color: #fff; }
    60%  { text-shadow: 0 0 4px ${F}, 0 0 12px ${F}; color: #fff; }
    100% { opacity: 1; text-shadow: none; }
  `);
  const t = [];
  e.forEach((s, o) => {
    s.style.cssText = "opacity:0; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.animation = "inkmotion-neon 0.7s ease forwards", o === e.length - 1 && t.push(setTimeout(() => n == null ? void 0 : n(), 700));
    }, o * 55));
  }), i(() => {
    t.forEach(clearTimeout), e.forEach((s) => {
      s.style.animation = "";
    });
  });
}), Lt = T("elastic-snap", (e, y, p, i, n) => {
  L("elastic", `
    0%   { transform: scale(0);    opacity: 0; }
    55%  { transform: scale(1.35); opacity: 1; }
    75%  { transform: scale(0.88); }
    90%  { transform: scale(1.08); }
    100% { transform: scale(1);    opacity: 1; }
  `);
  const t = [];
  e.forEach((s, o) => {
    s.style.cssText = "opacity:0; transform-origin:50% 80%; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.animation = "inkmotion-elastic 0.7s ease forwards", o === e.length - 1 && t.push(setTimeout(() => n == null ? void 0 : n(), 700));
    }, o * 55));
  }), i(() => {
    t.forEach(clearTimeout), e.forEach((s) => {
      s.style.animation = "";
    });
  });
}), Ot = T("rotate-in", (e, y, p, i, n) => {
  const t = [];
  e.forEach((s, o) => {
    s.style.cssText = "opacity:0; transform:translateY(30px) rotate(-20deg); transition:none; transform-origin:50% 80%; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.transition = `opacity 0.5s ease ${o * 50}ms, transform 0.55s cubic-bezier(0.34,1.3,0.64,1) ${o * 50}ms`, s.style.opacity = "1", s.style.transform = "translateY(0) rotate(0)";
    }, 20));
  }), t.push(setTimeout(() => n == null ? void 0 : n(), (e.length - 1) * 50 + 600)), i(() => t.forEach(clearTimeout));
}), Ct = T("anticipate", (e, y, p, i, n) => {
  L("anticipate", `
    0%   { transform: translateY(0)   scale(1);    opacity: 0; }
    20%  { transform: translateY(8px) scale(0.95); opacity: 0.4; }
    100% { transform: translateY(0)   scale(1);    opacity: 1; }
  `);
  const t = [];
  e.forEach((s, o) => {
    s.style.cssText = "opacity:0; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.animation = "inkmotion-anticipate 0.7s cubic-bezier(0.36,-0.3,0.63,1.3) forwards", o === e.length - 1 && t.push(setTimeout(() => n == null ? void 0 : n(), 700));
    }, o * 50));
  }), i(() => {
    t.forEach(clearTimeout), e.forEach((s) => {
      s.style.animation = "";
    });
  });
}), Ft = T("stagger-fade", (e, y, p, i, n) => {
  const t = [];
  e.forEach((s, o) => {
    const a = o * 80;
    s.style.cssText = "opacity:0; transform:translateY(10px); transition:none; display:inline-block; white-space:pre;", t.push(setTimeout(() => {
      s.style.transition = `opacity 1s ease ${a}ms, transform 1s ease ${a}ms`, s.style.opacity = "1", s.style.transform = "translateY(0)";
    }, 20));
  }), t.push(setTimeout(() => n == null ? void 0 : n(), (e.length - 1) * 80 + 1050)), i(() => t.forEach(clearTimeout));
}), Xt = T("random-rain", (e, y, p, i, n) => {
  const t = [];
  e.forEach((s, o) => {
    const a = -(40 + Math.random() * 120), r = Math.random() * 600, c = 400 + Math.random() * 300;
    s.style.cssText = `opacity:0; transform:translateY(${a}px); transition:none; display:inline-block; white-space:pre;`, t.push(setTimeout(() => {
      s.style.transition = `opacity ${c}ms ease, transform ${c}ms cubic-bezier(0.34,1.4,0.64,1)`, s.style.opacity = "1", s.style.transform = "translateY(0)", o === e.length - 1 && t.push(setTimeout(() => n == null ? void 0 : n(), c));
    }, r));
  }), i(() => t.forEach(clearTimeout));
});
export {
  Ct as Anticipate,
  xt as BlurIn,
  lt as Breathing,
  tt as CenterBurst,
  kt as CenterOut,
  Mt as ColorSweep,
  dt as DominoFall,
  nt as DragRelease,
  J as DropSettle,
  Lt as ElasticSnap,
  D as ExplodeFormation,
  vt as FadeUp,
  St as FallDown,
  Tt as FlipX,
  bt as FlipY,
  wt as Glitch,
  Q as GravityBounce,
  rt as GravityWell,
  ft as JellyHover,
  st as MagneticPull,
  Rt as NeonPulse,
  ct as OrbitalDrift,
  pt as Pendulum,
  Xt as RandomRain,
  et as Repulsion,
  K as RiseOvershoot,
  Ot as RotateIn,
  Yt as Rtl,
  gt as ScaleBounce,
  ut as ScatterReturn,
  _t as Scramble,
  yt as Shockwave,
  ht as SlideRight,
  ot as SpringKerning,
  Ft as StaggerFade,
  at as ThermalNoise,
  $t as Typewriter,
  Et as Wave,
  mt as WaveCascade,
  it as WeightWave
};
