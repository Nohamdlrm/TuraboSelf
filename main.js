/* Turabo Self — site de présentation (langues, thème, animations, galerie) */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------ Traductions (EN) ------------------------------ */
  var EN = {
    "nav.about": "About us", "nav.how": "How it works", "nav.photos": "The canteen", "nav.faq": "FAQ", "nav.cta": "Open Turabo Self",
    "hero.pill": "The Campus Rosa Parks canteen", "hero.t1": "Lunch,", "hero.t2": "made simple.",
    "hero.lead": "Check the weekly menu, book your meal in one click and pay with your balance. Simple for students, teachers, staff and the kitchen team.",
    "hero.cta1": "Open Turabo Self", "hero.cta2": "Discover",
    "hero.c1": "Discord sign-in", "hero.c2": "Menu in advance", "hero.c3": "French &amp; English",
    "mc.tag": "Sample menu", "mc.day": "Today", "mc.a": "Green salad", "mc.b": "Roast chicken", "mc.c": "Apple tart", "mc.book": "Booked",
    "about.title": "Who are we?",
    "about.p1": "Turabo Self is the platform of the Campus Rosa Parks canteen. It was designed to make lunch simpler: everyone sees the menu in advance, everyone books their meal, and the kitchen team knows how many trays to prepare.",
    "about.p2": "No paper, no coins to dig out: you sign in with your campus Discord account, and the site recognises your role by itself.",
    "v1.t": "Simple", "v1.p": "One click to book. The menu is visible in advance, up to three weeks ahead.",
    "v2.t": "Transparent", "v2.p": "Price displayed, balance visible and an email confirmation for every booking.",
    "v3.t": "For everyone", "v3.p": "Students, teachers, staff and the kitchen team: a space for each of them.",
    "s1": "the price of a meal", "s2": "days of menu, Monday to Friday", "s3": "weeks of menu in advance", "s4": "languages: French and English",
    "roles.title": "A place for everyone", "roles.sub": "Your role on the campus Discord server decides what you see.",
    "r1.t": "Students", "r1.p": "Check the menu, book their meal and earn balance with the mini-games.",
    "r2.t": "Teachers", "r2.p": "Book their meal in a few clicks and keep track of their balance.",
    "r3.t": "Staff", "r3.p": "The same simplicity: weekly menu, booking, notifications.",
    "r4.t": "Kitchen team", "r4.p": "Plan the menus and manage the stock to prepare the right quantities.",
    "how.title": "How it works", "how.sub": "Four steps, and your meal is booked.",
    "st1.t": "Sign in", "st1.p": "With your campus Discord account. Your role is recognised automatically.",
    "st2.t": "Pick your day", "st2.p": "The weekly menu appears: starter, main and dessert.",
    "st3.t": "Book and pay", "st3.p": "One click, and €4.20 is taken from your balance.",
    "st4.t": "Get your confirmation", "st4.p": "A confirmation email and a notification in the app.",
    "g.title": "Win your lunch by playing", "g.p": "Students can win €4 of balance for every mini-game they complete, up to 3 wins a day.", "g.cta": "Try it", "g.a": "Quick quiz", "g.c": "Reflex",
    "ph.title": "The canteen in pictures", "ph.sub": "A peek at the dining room, the dishes and the team.",
    "ph.1": "The dining room", "ph.2": "The counter", "ph.3": "Dishes of the day", "ph.4": "The kitchen team", "ph.5": "The desserts", "ph.6": "Lunchtime atmosphere",
    "faq.title": "Frequently asked questions", "faq.sub": "Another question? Ask the campus administration.",
    "q1": "How do I sign in?", "a1": "With your campus Discord account: click “Continue with Discord”. Your role (student, teacher, staff) is recognised automatically. The first time, a short form asks for your name, first name and class or subject.",
    "q2": "I get the message “Request not accepted”", "a2": "It means your Discord account isn't on the campus server, or has no recognised role. Contact the campus administration.",
    "q3": "How much does a meal cost?", "a3": "A meal costs €4.20, paid with your Turabo Self balance.",
    "q4": "How is my balance topped up?", "a4": "Your balance is credited by the campus administration. Students can also earn some with the mini-games (€4 per win, at most 3 wins a day).",
    "q5": "Do I get a confirmation?", "a5": "Yes. If you entered your email address, you get a message for every booking. You also find your notifications in the app.",
    "q6": "Which languages does the site support?", "a6": "French and English. The FR | EN button changes the language at any time.",
    "fin.title": "Ready for lunch?", "fin.p": "Sign in with Discord and book your next meal.", "fin.cta": "Open Turabo Self",
    "foot.tag": "Lunch, made simple.", "foot.note": "Turabo Self by Campus Rosa Parks",
    "ph.hint": "Drop your photo in"
  };
  var TITLE = { fr: "Turabo Self — La cantine, simplement", en: "Turabo Self — Lunch, made simple" };

  /* --------------------------------- Langue --------------------------------- */
  var LKEY = "turabo-site-lang", lang = "fr";
  try { lang = localStorage.getItem(LKEY) || ""; } catch (e) {}
  if (lang !== "fr" && lang !== "en") lang = String(navigator.language || "fr").toLowerCase().indexOf("en") === 0 ? "en" : "fr";

  $$("[data-i18n]").forEach(function (el) { el.setAttribute("data-fr", el.innerHTML); });

  function fmtNum(el, v) {
    var dec = Number(el.getAttribute("data-dec") || 0), s = v.toFixed(dec);
    if (el.getAttribute("data-suffix")) return lang === "en" ? "€" + s : s.replace(".", ",") + " €";
    return s;
  }
  function setLang(l, silent) {
    lang = l;
    try { localStorage.setItem(LKEY, l); } catch (e) {}
    document.documentElement.lang = l;
    document.title = TITLE[l];
    $$("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      el.innerHTML = l === "en" && EN[k] !== undefined ? EN[k] : el.getAttribute("data-fr");
    });
    $$(".num").forEach(function (el) { el.textContent = fmtNum(el, Number(el.getAttribute("data-count"))); });
    var sw = $("#lang");
    sw.setAttribute("data-cur", l);
    $$("button", sw).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === l)); });
    $$(".ph-hint").forEach(function (el) { el.textContent = l === "en" ? EN["ph.hint"] : "Dépose ta photo dans"; });
  }
  $$("#lang button").forEach(function (b) { b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); }); });

  /* ---------------------------------- Thème ---------------------------------- */
  var TKEY = "turabo-site-theme";
  function paintTheme() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    $("#theme use").setAttribute("href", dark ? "#i-sun" : "#i-moon");
    $("#theme").setAttribute("aria-label", dark ? (lang === "en" ? "Switch to light mode" : "Passer en mode clair") : (lang === "en" ? "Switch to dark mode" : "Passer en mode sombre"));
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute("content", dark ? "#130E19" : "#F6F3F7");
  }
  $("#theme").addEventListener("click", function () {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    if (dark) document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", "dark");
    try { localStorage.setItem(TKEY, dark ? "light" : "dark"); } catch (e) {}
    paintTheme();
  });

  /* ------------------------------ Navigation ------------------------------ */
  var nav = $("#nav"), links = $("#nav-links"), burger = $("#burger");
  window.addEventListener("scroll", function () { nav.classList.toggle("scrolled", window.scrollY > 20); }, { passive: true });
  burger.addEventListener("click", function () {
    var open = !links.classList.contains("open");
    links.classList.toggle("open", open); burger.setAttribute("aria-expanded", String(open));
  });
  $$("a", links).forEach(function (a) { a.addEventListener("click", function () { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }); });

  // lien actif selon la section visible
  if ("IntersectionObserver" in window) {
    var secs = ["about", "how", "photos", "faq"].map(function (id) { return document.getElementById(id); });
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) $$("a", links).forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(function (s) { if (s) so.observe(s); });
  }

  /* --------------------- Apparition au défilement + compteurs --------------------- */
  function countUp(el) {
    var to = Number(el.getAttribute("data-count")), t0 = performance.now(), dur = 1300;
    if (reduce) { el.textContent = fmtNum(el, to); return; }
    (function step(now) {
      var p = Math.min(1, (now - t0) / dur);
      el.textContent = fmtNum(el, to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        $$(".num", e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    $$(".rv").forEach(function (el) { io.observe(el); });
  } else {
    $$(".rv").forEach(function (el) { el.classList.add("in"); });
  }

  /* -------------------- Colibri qui suit le curseur (comme l'appli) -------------------- */
  var hero = $("#hero");
  if (!reduce && hero) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
      hero.style.setProperty("--my", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
    }, { passive: true });
  }
  var bird = $("#bird");
  if (bird) bird.addEventListener("click", function () { bird.classList.remove("flap"); void bird.offsetWidth; bird.classList.add("flap"); });

  /* ------------------------------- Galerie photos ------------------------------- */
  var lb = $("#lightbox"), lbImg = $("#lb-img"), lbCap = $("#lb-cap");
  function openLb(fig) {
    var img = $("img", fig); if (!img) return;
    lbImg.src = img.src; lbImg.alt = ""; lbCap.textContent = $("figcaption", fig).textContent;
    lb.hidden = false; document.body.style.overflow = "hidden";
  }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }
  $("#lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  $$(".shot").forEach(function (fig) {
    var src = fig.getAttribute("data-src");
    var ph = document.createElement("div");
    ph.className = "ph";
    ph.innerHTML = '<svg class="ic"><use href="#i-camera"/></svg><span class="ph-hint">Dépose ta photo dans</span><code>' + src + "</code>";
    fig.appendChild(ph);
    var img = new Image();
    img.alt = "";
    img.onload = function () { fig.insertBefore(img, fig.firstChild); fig.classList.remove("empty"); };
    img.onerror = function () { fig.classList.add("empty"); };
    img.src = src;
    fig.addEventListener("click", function () { if (!fig.classList.contains("empty")) openLb(fig); });
  });

  setLang(lang);
  paintTheme();
})();
