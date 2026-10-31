import { useEffect } from "react";
import { I18N_SEL, KO } from "@/data/i18n";

function initCraftLab() {
  const pages = [...document.querySelectorAll(".page")];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups = [];
  const on = (target, type, handler, options) => {
    target.addEventListener(type, handler, options);
    cleanups.push(() => target.removeEventListener(type, handler, options));
  };

  let lang = "en";
  function T(str) {
    return (lang === "ko" && KO[str]) || str;
  }

  const i18nEls = [...document.querySelectorAll(I18N_SEL)].filter((el) => KO[el.innerHTML.trim()]);
  i18nEls.forEach((el) => {
    el.dataset.en = el.innerHTML.trim();
  });
  const phEls = [...document.querySelectorAll("[placeholder]")];
  phEls.forEach((el) => {
    el.dataset.en = el.placeholder;
  });

  function setLang(next) {
    lang = next === "ko" ? "ko" : "en";
    document.documentElement.lang = lang;
    i18nEls.forEach((el) => {
      el.innerHTML = lang === "ko" ? KO[el.dataset.en] : el.dataset.en;
    });
    phEls.forEach((el) => {
      el.placeholder = T(el.dataset.en);
    });
    const note = document.querySelector(".form-note");
    if (note) note.textContent = "";
    document.querySelectorAll(".lang").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    try {
      localStorage.setItem("craftlab-lang", lang);
    } catch (e) {}
  }

  document.querySelectorAll(".lang").forEach((b) => on(b, "click", () => setLang(b.dataset.lang)));
  let savedLang = null;
  try {
    savedLang = localStorage.getItem("craftlab-lang");
  } catch (e) {}
  if (savedLang === "ko") setLang("ko");

  document.querySelectorAll("[data-split]").forEach((el) => {
    const t = el.textContent;
    el.setAttribute("aria-label", t);
    el.textContent = "";
    [...t].forEach((c, i) => {
      const s = document.createElement("span");
      s.className = "ch";
      s.style.setProperty("--i", i);
      s.setAttribute("aria-hidden", "true");
      s.innerHTML = '<span class="sz"></span><span class="gl"></span>';
      s.firstChild.textContent = c;
      s.lastChild.textContent = c;
      el.appendChild(s);
    });
  });

  let scrambleRaf = 0;
  let scrambleTimer = 0;
  if (!reduce) {
    const DURATION = 1.2;
    const CHARS = ".:";
    const SWAP = 70;
    const RADIUS = 100;
    const groups = [...document.querySelectorAll(".tagline, .headline")];
    const cells = groups.flatMap((g) => [...g.querySelectorAll(".ch")]);
    const blank = (ch) => /\s/.test(ch);
    const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)];
    const items = cells.map((c) => ({
      cell: c,
      gl: c.lastChild,
      ch: c.firstChild.textContent,
      until: 0,
      line: c.parentElement,
      idx: [...c.parentElement.children].indexOf(c),
      len: c.parentElement.children.length,
    }));
    let lastSwap = 0;
    const frame = (now) => {
      scrambleRaf = 0;
      const swap = now - lastSwap >= SWAP;
      if (swap) lastSwap = now;
      let busy = false;
      items.forEach((it) => {
        if (!it.until || blank(it.ch)) return;
        if (now >= it.until) {
          it.until = 0;
          it.gl.textContent = it.ch;
          return;
        }
        busy = true;
        if (swap || it.gl.textContent === it.ch) it.gl.textContent = pick();
      });
      if (busy) scrambleRaf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!scrambleRaf) scrambleRaf = requestAnimationFrame(frame);
    };
    const scrambleFor = (it, ms) => {
      if (blank(it.ch)) return;
      it.until = Math.max(it.until, performance.now() + ms);
      if (it.gl.textContent === it.ch) it.gl.textContent = pick();
    };

    items.forEach((it) =>
      scrambleFor(it, 250 + 1000 * (0.15 + DURATION * (0.75 * (it.idx / it.len) + 0.25 * Math.random())))
    );
    const go = () => wake();
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(go, go);

    const headEl = document.querySelector(".headline");
    scrambleTimer = setInterval(() => {
      if (document.hidden) return;
      const b = headEl.getBoundingClientRect();
      if (b.bottom < 0 || b.top > innerHeight) return;
      items.forEach((it) =>
        scrambleFor(it, 1000 * (0.15 + DURATION * (0.75 * (it.idx / it.len) + 0.25 * Math.random())))
      );
      wake();
    }, 10000);

    let moveRaf = 0;
    let px = 0;
    let py = 0;
    let over = null;
    const near = () => {
      moveRaf = 0;
      if (!over) return;
      const sc = parseFloat(getComputedStyle(document.getElementById("hero")).getPropertyValue("--s")) || 1;
      const r = Math.max(RADIUS * 0.6 * sc, parseFloat(getComputedStyle(over).fontSize) * sc * 1.1);
      items.forEach((it) => {
        if (!over.contains(it.cell)) return;
        const b = it.cell.getBoundingClientRect();
        const d = Math.hypot(px - (b.left + b.width / 2), py - (b.top + b.height / 2));
        if (d < r) scrambleFor(it, DURATION * 1000 * (1 - d / r));
      });
      wake();
    };
    groups.forEach((g) =>
      on(g, "pointermove", (e) => {
        if (e.pointerType === "touch") return;
        px = e.clientX;
        py = e.clientY;
        over = g;
        if (!moveRaf) moveRaf = requestAnimationFrame(near);
      })
    );
    cleanups.push(() => cancelAnimationFrame(moveRaf));
  }

  function fit() {
    const s = document.documentElement.clientWidth / 1440;
    pages.forEach((p) => {
      p.style.setProperty("--s", s);
      p.style.setProperty("--h", parseFloat(p.dataset.h));
    });
    document.documentElement.style.setProperty("--vs", (innerHeight / s).toFixed(2));
    document.documentElement.style.setProperty("--F", Math.min(210, (innerHeight / s) * 0.23).toFixed(2));
  }
  fit();

  let stops = [];
  let animating = false;
  let lastWheel = 0;
  let snapRaf = 0;
  let lockedAt = 0;
  function buildStops() {
    const vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    const out = [];
    pages.forEach((p) => {
      out.push(p.offsetTop);
      if (p.id !== "hero" && p.offsetHeight > vh + 40) out.push(p.offsetTop + p.offsetHeight - vh);
    });
    out.push(max);
    stops = [...new Set(out.map((y) => Math.round(Math.min(Math.max(y, 0), max))))].sort((a, b) => a - b);
  }
  function goTo(y) {
    cancelAnimationFrame(snapRaf);
    if (reduce) {
      scrollTo(0, y);
      return;
    }
    const from = scrollY;
    const d = y - from;
    const dur = Math.min(1100, 650 + Math.abs(d) * 0.25);
    const t0 = performance.now();
    animating = true;
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      scrollTo(0, from + d * ease(t));
      if (t < 1) snapRaf = requestAnimationFrame(step);
      else animating = false;
    };
    snapRaf = requestAnimationFrame(step);
  }

  const workPage = document.getElementById("work");
  const workTrack = workPage.querySelector(".track");
  function slideTrack(x) {
    const from = workTrack.scrollLeft;
    const d = x - from;
    const dur = 1000;
    const t0 = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    animating = true;
    workTrack.style.scrollBehavior = "auto";
    const step = (now) => {
      const t = reduce ? 1 : Math.min(1, (now - t0) / dur);
      workTrack.scrollLeft = from + d * ease(t);
      if (t < 1) requestAnimationFrame(step);
      else {
        animating = false;
        workTrack.style.scrollBehavior = "";
      }
    };
    requestAnimationFrame(step);
  }
  function move(dir) {
    const y = scrollY;
    if (Math.abs(y - workPage.offsetTop) < 6) {
      const max = workTrack.scrollWidth - workTrack.clientWidth;
      if (dir > 0 && workTrack.scrollLeft < max - 4) {
        slideTrack(max);
        return;
      }
      if (dir < 0 && workTrack.scrollLeft > 4) {
        slideTrack(0);
        return;
      }
    }
    const next = dir > 0 ? stops.find((s) => s > y + 4) : [...stops].reverse().find((s) => s < y - 4);
    if (next !== undefined) goTo(next);
  }

  on(
    window,
    "wheel",
    (e) => {
      if (e.ctrlKey) return;
      const tr = e.target.closest && e.target.closest(".track");
      if (tr && Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      const now = performance.now();
      const quiet = now - lastWheel > 180;
      lastWheel = now;
      if (animating || (!quiet && now - lockedAt < 900)) return;
      if (Math.abs(e.deltaY) < 4) return;
      lockedAt = now;
      move(Math.sign(e.deltaY));
    },
    { passive: false }
  );

  on(window, "keydown", (e) => {
    if (e.target.closest("input,textarea,button,.track")) return;
    const k = e.key;
    if (["ArrowDown", "PageDown", " "].includes(k) && !e.shiftKey) {
      e.preventDefault();
      move(1);
    } else if (["ArrowUp", "PageUp"].includes(k) || (k === " " && e.shiftKey)) {
      e.preventDefault();
      move(-1);
    } else if (k === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (k === "End") {
      e.preventDefault();
      goTo(stops[stops.length - 1]);
    }
  });

  on(document, "click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const t = document.querySelector(a.getAttribute("href"));
    if (!t) return;
    e.preventDefault();
    goTo(t.offsetTop);
  });
  buildStops();

  const dots = document.querySelector(".dots");
  pages.forEach((p) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", p.getAttribute("aria-label"));
    b.onclick = () => goTo(p.offsetTop);
    dots.appendChild(b);
  });

  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        e.target.classList.toggle("in", e.isIntersecting);
        if (e.isIntersecting && e.target.id === "hero") e.target.classList.add("seen");
        if (e.isIntersecting) [...dots.children].forEach((b, i) => b.setAttribute("aria-current", pages[i] === e.target));
      }),
    { threshold: 0.35 }
  );
  pages.forEach((p) => io.observe(p));

  const about = document.getElementById("about");
  const root = document.documentElement;
  const joinEl = document.getElementById("join");
  let ticking = false;
  function tick() {
    ticking = false;
    if (reduce) return;
    const h = innerHeight;
    pages.forEach((p) => {
      const r = p.getBoundingClientRect();
      if (r.bottom < -h || r.top > 2 * h) return;
      p.style.setProperty("--p", Math.max(-1, Math.min(1, r.top / h)).toFixed(4));
    });
    const t = Math.max(0, Math.min(1, scrollY / (about.offsetTop || 1)));
    root.style.setProperty("--t", t.toFixed(4));
    const maxY = root.scrollHeight - innerHeight;
    joinEl.classList.toggle("snapped", scrollY >= Math.min(joinEl.offsetTop, maxY) - 8);
  }

  const onResize = () => {
    fit();
    buildStops();
    tick();
  };
  on(window, "resize", onResize);
  on(
    window,
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    },
    { passive: true }
  );
  tick();

  const axes = [...document.querySelectorAll(".ax")];
  let axTimer;
  const openAx = (el) => {
    if (el.classList.contains("open")) return;
    axes.forEach((a) => {
      const onAxis = a === el;
      a.classList.toggle("open", onAxis);
      a.setAttribute("aria-expanded", onAxis);
      a.querySelector(".r-row").setAttribute("aria-hidden", onAxis);
    });
  };
  axes.forEach((a) => {
    on(a, "mouseenter", () => {
      clearTimeout(axTimer);
      axTimer = setTimeout(() => openAx(a), 90);
    });
    on(a, "mouseleave", () => clearTimeout(axTimer));
    on(a, "click", () => openAx(a));
    on(a, "focus", () => openAx(a));
    on(a, "keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openAx(a);
      }
    });
  });

  const track = document.querySelector(".track");
  const row = track.querySelector(".track__row");
  const tiles = [...row.querySelectorAll(".tile")];
  const MAX = 22;
  const DEPTH = 70;
  let tiltPending = false;
  const updateTilt = () => {
    tiltPending = false;
    const mid = track.scrollLeft + track.clientWidth / 2;
    const half = track.clientWidth / 2;
    row.style.setProperty("--po", mid + "px");
    tiles.forEach((tile) => {
      const c = tile.offsetLeft + tile.offsetWidth / 2;
      const d = Math.max(-1.4, Math.min(1.4, (c - mid) / half));
      tile.style.setProperty("--ry", (reduce ? 0 : -d * MAX).toFixed(2) + "deg");
      tile.style.setProperty("--tz", (reduce ? 0 : -Math.abs(d) * DEPTH).toFixed(1) + "px");
      tile.style.setProperty("--sh", Math.min(1, Math.abs(d)).toFixed(3));
      tile.style.setProperty("--sd", d > 0 ? "270deg" : "90deg");
    });
  };
  const queueTilt = () => {
    if (!tiltPending) {
      tiltPending = true;
      requestAnimationFrame(updateTilt);
    }
  };
  on(track, "scroll", queueTilt, { passive: true });
  on(window, "resize", queueTilt);
  updateTilt();

  let down = false;
  let sx = 0;
  let sl = 0;
  let dragScale = 1;
  on(track, "pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    down = true;
    sx = e.clientX;
    sl = track.scrollLeft;
    dragScale = parseFloat(getComputedStyle(document.getElementById("work")).getPropertyValue("--s")) || 1;
    track.classList.add("drag");
    track.setPointerCapture(e.pointerId);
  });
  on(track, "pointermove", (e) => {
    if (down) track.scrollLeft = sl - (e.clientX - sx) / dragScale;
  });
  const endDrag = () => {
    down = false;
    track.classList.remove("drag");
  };
  on(track, "pointerup", endDrag);
  on(track, "pointercancel", endDrag);
  on(track, "keydown", (e) => {
    if (e.key === "ArrowRight") {
      track.scrollLeft += 344;
      e.preventDefault();
    }
    if (e.key === "ArrowLeft") {
      track.scrollLeft -= 344;
      e.preventDefault();
    }
  });

  const form = document.querySelector(".form");
  const note = form.querySelector(".form-note");
  on(form, "submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const name = d.get("name").trim();
    const email = d.get("email").trim();
    if (!name || !email || !form.email.checkValidity()) {
      note.textContent = T("Add your name and a valid email to send.");
      return;
    }
    note.textContent = T("Opening your email app…");
    location.href =
      "mailto:hello@craftlab.kr?subject=" +
      encodeURIComponent("Join CRAFT Lab — " + name) +
      "&body=" +
      encodeURIComponent((d.get("message") || "") + "\n\n" + name + " <" + email + ">");
  });

  const notice = document.querySelector(".notice");
  document.querySelectorAll("img").forEach((img) => {
    const miss = () => {
      img.classList.add("is-missing");
      if (notice) notice.classList.add("show");
      const logo = img.closest(".logo");
      if (logo) logo.classList.add("fallback");
    };
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) miss();
    else on(img, "error", miss);
  });

  return () => {
    cleanups.forEach((fn) => fn());
    io.disconnect();
    cancelAnimationFrame(scrambleRaf);
    cancelAnimationFrame(snapRaf);
    clearInterval(scrambleTimer);
    clearTimeout(axTimer);
    if (dots) dots.replaceChildren();
    pages.forEach((p) => p.classList.remove("in", "seen"));
    if (joinEl) joinEl.classList.remove("snapped");
    document.documentElement.style.removeProperty("--t");
    document.documentElement.style.removeProperty("--vs");
    document.documentElement.style.removeProperty("--F");
  };
}

export default function useCraftLab() {
  useEffect(() => initCraftLab(), []);
}
