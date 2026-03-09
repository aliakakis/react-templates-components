var e = Object.create,
  t = Object.defineProperty,
  n = Object.getOwnPropertyDescriptor,
  r = Object.getOwnPropertyNames,
  i = Object.getPrototypeOf,
  a = Object.prototype.hasOwnProperty,
  o = (e, i, o, s) => {
    if ((i && typeof i == `object`) || typeof i == `function`)
      for (var c = r(i), l = 0, u = c.length, d; l < u; l++)
        ((d = c[l]),
          !a.call(e, d) &&
            d !== o &&
            t(e, d, {
              get: ((e) => i[e]).bind(null, d),
              enumerable: !(s = n(i, d)) || s.enumerable,
            }));
    return e;
  },
  s = (n, r, a) => (
    (a = n == null ? {} : e(i(n))),
    o(
      r || !n || !n.__esModule
        ? t(a, `default`, { value: n, enumerable: !0 })
        : a,
      n
    )
  );
let c = require(`react`);
c = s(c);
let l = require(`react/jsx-runtime`);
function u({ children: e }) {
  return (0, l.jsx)(`div`, {
    style: {
      backgroundColor: `rgba(243, 244, 246, 0.5)`,
      padding: `8px`,
      borderRadius: `4px`,
      color: `black`,
    },
    children: e,
  });
}
function d(e, t) {
  let n = e.length === 0,
    r = e.length > 2,
    i = e.length < 2;
  return n || r || i
    ? (0, l.jsx)(u, {
        children: `You must include exactly one If component and one Else component`,
      })
    : t
      ? e[0]
      : e[1];
}
function f({
  children: e,
  condition: t = !0,
  tag: n = `div`,
  className: r = ``,
  useFragment: i = !1,
}) {
  let a = i ? c.Fragment : n,
    o = !i && { className: r },
    s = (0, c.useMemo)(() => c.Children.toArray(e), [e]);
  return (0, l.jsx)(a, { ...o, children: d(s, t) });
}
function p({
  children: e,
  show: t = !0,
  tag: n = `div`,
  className: r = ``,
  useFragment: i = !1,
}) {
  return (
    t &&
    (0, l.jsx)(i ? c.Fragment : n, { ...(!i && { className: r }), children: e })
  );
}
function m({
  children: e,
  show: t = !0,
  tag: n = `div`,
  className: r = ``,
  useFragment: i = !1,
}) {
  return (
    t &&
    (0, l.jsx)(i ? c.Fragment : n, { ...(!i && { className: r }), children: e })
  );
}
function h({
  children: e,
  tag: t = `div`,
  className: n = ``,
  useFragment: r = !1,
}) {
  return (0, l.jsx)(r ? c.Fragment : t, {
    ...(!r && { className: n }),
    children: e,
  });
}
function g({ children: e }) {
  return e;
}
function _(e, t, n) {
  let r = e.length === 0 && t.length === 0,
    i = e.length > 1 || t.length > 1,
    a = e.length > 0,
    o = t.length > 0;
  return r
    ? (0, l.jsxs)(u, {
        children: [
          `No items found for expressionValue: `,
          (0, l.jsx)(`strong`, { children: n }),
          ` in Cases component`,
        ],
      })
    : i
      ? (0, l.jsx)(u, {
          children: `You most probably have set the same expressionValue in your Case components`,
        })
      : a
        ? e
        : o
          ? t
          : (0, l.jsx)(u, {
              children: `There was an error please check your code`,
            });
}
function v(e, t) {
  return e.filter(
    (e) => (0, c.isValidElement)(e) && e.props.expressionValue === t
  );
}
function y({
  children: e,
  expression: t,
  tag: n = `div`,
  className: r = ``,
  useFragment: i = !1,
  defaultExpressionValue: a = `default`,
}) {
  let o = i ? c.Fragment : n,
    s = !i && { className: r },
    u = (0, c.useMemo)(() => c.Children.toArray(e), [e]),
    d = (0, c.useMemo)(() => v(u, t), [u, t]),
    f = (0, c.useMemo)(() => v(u, a), [u, a]);
  return (0, l.jsx)(o, { ...s, children: _(d, f, t) });
}
((exports.Case = g),
  (exports.Cases = y),
  (exports.Conditional = f),
  (exports.Else = m),
  (exports.If = p),
  (exports.Repeat = h));
