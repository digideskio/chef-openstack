var Holder = Holder || {};
! function (t, e) {
  function n(t, e) {
    var n = "complete",
      a = "readystatechange",
      r = !1,
      i = r,
      o = !0,
      l = t.document,
      s = l.documentElement,
      d = l.addEventListener ? "addEventListener" : "attachEvent",
      u = l.addEventListener ? "removeEventListener" : "detachEvent",
      c = l.addEventListener ? "" : "on",
      g = function (o) {
        (o.type != a || l.readyState == n) && (("load" == o.type ? t : l)[u](c + o.type, g, r), !i && (i = !0) && e.call(t, null))
      }, h = function () {
        try {
          s.doScroll("left")
        } catch (t) {
          return setTimeout(h, 50), void 0
        }
        g("poll")
      };
    if (l.readyState == n) e.call(t, "lazy");
    else {
      if (l.createEventObject && s.doScroll) {
        try {
          o = !t.frameElement
        } catch (f) {}
        o && h()
      }
      l[d](c + "DOMContentLoaded", g, r), l[d](c + a, g, r), t[d](c + "load", g, r)
    }
  }

  function a(t) {
    t = t.match(/^(\W)?(.*)/);
    var e = document["getElement" + (t[1] ? "#" == t[1] ? "ById" : "sByClassName" : "sByTagName")](t[2]),
      n = [];
    return null !== e && (n = e.length ? e : 0 === e.length ? e : [e]), n
  }

  function r(t, e) {
    var n = {};
    for (var a in t) n[a] = t[a];
    for (var r in e) n[r] = e[r];
    return n
  }

  function i(t, e, n) {
    e = parseInt(e, 10), t = parseInt(t, 10);
    var a = Math.max(e, t),
      r = Math.min(e, t),
      i = 1 / 12,
      o = Math.min(.75 * r, .75 * a * i);
    return {
      height: Math.round(Math.max(n.size, o))
    }
  }

  function o(t, e, n, a, r) {
    var o = i(e.width, e.height, n),
      l = o.height,
      s = e.width * a,
      d = e.height * a,
      u = n.font ? n.font : "sans-serif";
    g.width = s, g.height = d, t.textAlign = "center", t.textBaseline = "middle", t.fillStyle = n.background, t.fillRect(0, 0, s, d), t.fillStyle = n.foreground, t.font = "bold " + l + "px " + u;
    var c = n.text ? n.text : Math.floor(e.width) + "x" + Math.floor(e.height);
    r && (c = n.literalText);
    var h = t.measureText(c).width;
    return h / s >= .75 && (l = Math.floor(.75 * l * (s / h))), t.font = "bold " + l * a + "px " + u, t.fillText(c, s / 2, d / 2, s), g.toDataURL("image/png")
  }

  function l(t, e, n, a) {
    var i = n.dimensions,
      l = n.theme,
      d = n.text ? decodeURIComponent(n.text) : n.text,
      u = i.width + "x" + i.height;
    l = d ? r(l, {
      text: d
    }) : l, l = n.font ? r(l, {
      font: n.font
    }) : l, e.setAttribute("data-src", a), l.literalText = u, n.originalTheme = n.theme, n.theme = l, "image" == t ? (e.setAttribute("alt", d ? d : l.text ? l.text + " [" + u + "]" : u), (c || !n.auto) && (e.style.width = i.width + "px", e.style.height = i.height + "px"), c ? e.style.backgroundColor = l.background : e.setAttribute("src", o(h, i, l, x))) : "background" == t ? c || (e.style.backgroundImage = "url(" + o(h, i, l, x) + ")", e.style.backgroundSize = i.width + "px " + i.height + "px") : "fluid" == t && (e.setAttribute("alt", d ? d : l.text ? l.text + " [" + u + "]" : u), e.style.height = "%" == i.height.slice(-1) ? i.height : i.height + "px", e.style.width = "%" == i.width.slice(-1) ? i.width : i.width + "px", ("inline" == e.style.display || "" === e.style.display) && (e.style.display = "block"), c ? e.style.backgroundColor = l.background : (e.holderData = n, p.push(e), s(e)))
  }

  function s(t) {
    var e;
    e = null == t.nodeType ? p : [t];
    for (var n in e) {
      var a = e[n];
      if (a.holderData) {
        var r = a.holderData;
        a.setAttribute("src", o(h, {
          height: a.clientHeight,
          width: a.clientWidth
        }, r.theme, x, !! r.literal))
      }
    }
  }

  function d(e, n) {
    var a = {
      theme: y.themes.gray
    }, r = !1;
    for (sl = e.length, j = 0; sl > j; j++) {
      var i = e[j];
      t.flags.dimensions.match(i) ? (r = !0, a.dimensions = t.flags.dimensions.output(i)) : t.flags.fluid.match(i) ? (r = !0, a.dimensions = t.flags.fluid.output(i), a.fluid = !0) : t.flags.literal.match(i) ? a.literal = !0 : t.flags.colors.match(i) ? a.theme = t.flags.colors.output(i) : n.themes[i] ? a.theme = n.themes[i] : t.flags.font.match(i) ? a.font = t.flags.font.output(i) : t.flags.auto.match(i) ? a.auto = !0 : t.flags.text.match(i) && (a.text = t.flags.text.output(i))
    }
    return r ? a : !1
  }
  var u = !1,
    c = !1,
    g = document.createElement("canvas");
  if (g.getContext)
    if (g.toDataURL("image/png").indexOf("data:image/png") < 0) c = !0;
    else var h = g.getContext("2d");
    else c = !0;
  var f = 1,
    m = 1;
  c || (f = window.devicePixelRatio || 1, m = h.webkitBackingStorePixelRatio || h.mozBackingStorePixelRatio || h.msBackingStorePixelRatio || h.oBackingStorePixelRatio || h.backingStorePixelRatio || 1);
  var x = f / m;
  document.getElementsByClassName || (document.getElementsByClassName = function (t) {
    var e, n, a, r = document,
      i = [];
    if (r.querySelectorAll) return r.querySelectorAll("." + t);
    if (r.evaluate)
      for (n = ".//*[contains(concat(' ', @class, ' '), ' " + t + " ')]", e = r.evaluate(n, r, null, 0, null); a = e.iterateNext();) i.push(a);
    else
      for (e = r.getElementsByTagName("*"), n = new RegExp("(^|\\s)" + t + "(\\s|$)"), a = 0; a < e.length; a++) n.test(e[a].className) && i.push(e[a]);
    return i
  }), window.getComputedStyle || (window.getComputedStyle = function (t) {
    return this.el = t, this.getPropertyValue = function (e) {
      var n = /(\-([a-z]){1})/g;
      return "float" == e && (e = "styleFloat"), n.test(e) && (e = e.replace(n, function () {
        return arguments[2].toUpperCase()
      })), t.currentStyle[e] ? t.currentStyle[e] : null
    }, this
  }), Object.prototype.hasOwnProperty || (Object.prototype.hasOwnProperty = function (t) {
    var e = this.__proto__ || this.constructor.prototype;
    return t in this && (!(t in e) || e[t] !== this[t])
  });
  var p = [],
    y = {
      domain: "holder.js",
      images: "img",
      bgnodes: ".holderjs",
      themes: {
        gray: {
          background: "#eee",
          foreground: "#aaa",
          size: 12
        },
        social: {
          background: "#3a5a97",
          foreground: "#fff",
          size: 12
        },
        industrial: {
          background: "#434A52",
          foreground: "#C2F200",
          size: 12
        }
      },
      stylesheet: ""
    };
  t.flags = {
    dimensions: {
      regex: /^(\d+)x(\d+)$/,
      output: function (t) {
        var e = this.regex.exec(t);
        return {
          width: +e[1],
          height: +e[2]
        }
      }
    },
    fluid: {
      regex: /^([0-9%]+)x([0-9%]+)$/,
      output: function (t) {
        var e = this.regex.exec(t);
        return {
          width: e[1],
          height: e[2]
        }
      }
    },
    colors: {
      regex: /#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,
      output: function (t) {
        var e = this.regex.exec(t);
        return {
          size: y.themes.gray.size,
          foreground: "#" + e[2],
          background: "#" + e[1]
        }
      }
    },
    text: {
      regex: /text\:(.*)/,
      output: function (t) {
        return this.regex.exec(t)[1]
      }
    },
    font: {
      regex: /font\:(.*)/,
      output: function (t) {
        return this.regex.exec(t)[1]
      }
    },
    auto: {
      regex: /^auto$/
    },
    literal: {
      regex: /^literal$/
    }
  };
  for (var v in t.flags) t.flags.hasOwnProperty(v) && (t.flags[v].match = function (t) {
    return t.match(this.regex)
  });
  t.add_theme = function (e, n) {
    return null != e && null != n && (y.themes[e] = n), t
  }, t.add_image = function (e, n) {
    var r = a(n);
    if (r.length)
      for (var i = 0, o = r.length; o > i; i++) {
        var l = document.createElement("img");
        l.setAttribute("data-src", e), r[i].appendChild(l)
      }
    return t
  }, t.run = function (e) {
    var n = r(y, e),
      i = [],
      o = [],
      s = [];
    for ("string" == typeof n.images ? o = a(n.images) : window.NodeList && n.images instanceof window.NodeList ? o = n.images : window.Node && n.images instanceof window.Node && (o = [n.images]), "string" == typeof n.bgnodes ? s = a(n.bgnodes) : window.NodeList && n.elements instanceof window.NodeList ? s = n.bgnodes : window.Node && n.bgnodes instanceof window.Node && (s = [n.bgnodes]), u = !0, f = 0, h = o.length; h > f; f++) i.push(o[f]);
    var c = document.getElementById("holderjs-style");
    c || (c = document.createElement("style"), c.setAttribute("id", "holderjs-style"), c.type = "text/css", document.getElementsByTagName("head")[0].appendChild(c)), n.nocss || (c.styleSheet ? c.styleSheet.cssText += n.stylesheet : c.appendChild(document.createTextNode(n.stylesheet)));
    for (var g = new RegExp(n.domain + '/(.*?)"?\\)'), h = s.length, f = 0; h > f; f++) {
      var m = window.getComputedStyle(s[f], null).getPropertyValue("background-image"),
        x = m.match(g),
        p = s[f].getAttribute("data-background-src");
      if (x) {
        var v = d(x[1].split("/"), n);
        v && l("background", s[f], v, m)
      } else if (null != p) {
        var v = d(p.substr(p.lastIndexOf(n.domain) + n.domain.length + 1).split("/"), n);
        v && l("background", s[f], v, m)
      }
    }
    for (h = i.length, f = 0; h > f; f++) {
      var w, b;
      b = w = m = null;
      try {
        b = i[f].getAttribute("src"), attr_datasrc = i[f].getAttribute("data-src")
      } catch (E) {}
      if (null == attr_datasrc && b && b.indexOf(n.domain) >= 0 ? m = b : attr_datasrc && attr_datasrc.indexOf(n.domain) >= 0 && (m = attr_datasrc), m) {
        var v = d(m.substr(m.lastIndexOf(n.domain) + n.domain.length + 1).split("/"), n);
        v && (v.fluid ? l("fluid", i[f], v, m) : l("image", i[f], v, m))
      }
    }
    return t
  }, n(e, function () {
    window.addEventListener ? (window.addEventListener("resize", s, !1), window.addEventListener("orientationchange", s, !1)) : window.attachEvent("onresize", s), u || t.run()
  }), "function" == typeof define && define.amd && define([], function () {
    return t
  })
}(Holder, window);