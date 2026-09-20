/* Turabo Self — site de présentation
   Langues, thème, formulaire de démo, mini-jeux jouables, galerie, animations. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touch = window.matchMedia && window.matchMedia("(hover: none)").matches;

  /* Adresse qui reçoit les demandes de démo (coupée en deux pour éviter les robots à spam) */
  var TO = ["ce.0067535a", "campus-rosaparks.fr"].join("@");

  /* Formulaire de démo : mettre true si le formulaire ouvre un jour (et mettre à jour la politique de confidentialité). */
  var DEMO_OPEN = false;

  /* PHOTOS DU SELF — intégrées directement dans le code, aucun fichier ni dossier.
     Chaque photo est un texte "data:image/jpeg;base64,...." (6 au maximum, dans l'ordre de la galerie).
     Envoie tes photos à Claude : il les compresse et les place ici. */
  var PHOTOS = [];

  /* ------------------------------ Textes ------------------------------ */
  // FR : textes utilisés seulement par le JavaScript (le reste du français est dans la page HTML)
  var FRJ = {
    "mc.book": "Réserver", "mc.done": "Réservé", "ph.hint": "Photo à venir",
    "demo.sending": "Envoi…",
    "demo.err.fill": "Merci de remplir tous les champs.",
    "demo.err.email": "L'adresse e-mail n'est pas valide.",
    "demo.err.link": "Indiquez le lien de votre serveur Discord ou de votre site web.",
    "demo.err.send": "L'envoi n'a pas fonctionné. Réessayez, ou écrivez-nous directement :",
    "g.win": "Bravo ! Dans l'application, l'élève gagnerait du solde.",
    "g.again": "Rejouer", "g.moves": "Coups : ", "g.wait": "Attendez le vert…", "g.go": "Cliquez !",
    "g.early": "Trop tôt ! Recommencez.", "g.slow": "Trop lent : ", "g.fast": "Réflexe : ", "g.ms": " ms",
    "g.correct": "Bonne réponse !", "g.wrong": "Raté ! La bonne réponse : "
  };
  var EN = {
    "nav.work": "How we work", "how.more": "How we work",
    "demo.closed.t": "Not open to the public yet", "demo.closed.p": "Turabo Self isn't open to the public: the demo form is closed. A public release is planned for later, maybe in about 3 years, with no commitment. In the meantime, find us on Discord.", "demo.closed.cta": "Join the Discord",
    "nav.about": "About us", "nav.how": "How it works", "nav.photos": "The canteen", "nav.faq": "FAQ", "nav.cta": "Request a demo",
    "hero.pill": "The connected canteen for your school", "hero.t1": "Lunch,", "hero.t2": "made simple.",
    "hero.lead": "Weekly menu, one-click booking, payment by balance: Turabo Self makes the canteen simple for students, teachers, staff and the kitchen team.",
    "hero.cta1": "Request a demo", "hero.cta2": "Discover",
    "hero.c1": "Discord sign-in", "hero.c2": "Menu in advance", "hero.c3": "French &amp; English",
    "mc.tag": "Sample menu", "mc.day": "Today", "mc.book": "Book", "mc.done": "Booked", "ph.hint": "Photo coming soon",
    "about.title": "Who are we?",
    "about.p1": "Turabo Self is a canteen platform designed for schools. The idea: everyone sees the menu in advance, everyone books their meal, and the kitchen team knows how many trays to prepare.",
    "about.p2": "No paper, no coins to dig out: you sign in with your Discord account, and the platform recognises everyone's role by itself.",
    "v1.t": "Simple", "v1.p": "One click to book. The menu is visible in advance, up to three weeks ahead.",
    "v2.t": "Transparent", "v2.p": "Price displayed, balance visible and an email confirmation for every booking.",
    "v3.t": "For everyone", "v3.p": "Students, teachers, staff and the kitchen team: a space for each of them.",
    "s1": "click to book a meal", "s2": "days of menu, Monday to Friday", "s3": "weeks of menu in advance", "s4": "languages: French and English",
    "roles.title": "A place for everyone", "roles.sub": "The role given on the school's Discord server decides what each person sees.",
    "r1.t": "Students", "r1.p": "Check the menu, book their meal and earn balance with the mini-games.",
    "r2.t": "Teachers", "r2.p": "Book their meal in a few clicks and keep track of their balance.",
    "r3.t": "Staff", "r3.p": "The same simplicity: weekly menu, booking, notifications.",
    "r4.t": "Kitchen team", "r4.p": "Plan the menus and manage the stock to prepare the right quantities.",
    "how.title": "How it works", "how.sub": "Four steps, and the meal is booked.",
    "st1.t": "Sign-in", "st1.p": "With the school's Discord account. The role is recognised automatically.",
    "st2.t": "Pick the day", "st2.p": "The weekly menu appears: starter, main and dessert.",
    "st3.t": "Book and pay", "st3.p": "One click, and the price of the meal is taken from the balance.",
    "st4.t": "Confirmation", "st4.p": "A confirmation email and a notification in the app.",
    "g.title": "Win your lunch by playing", "g.p": "Students earn balance for every mini-game they complete, up to a few wins a day. Try it: it's playable right here, right now.", "g.cta": "Try it", "g.a": "Quick quiz", "g.c": "Reflex",
    "ph.title": "The canteen in pictures", "ph.sub": "A peek at the dining room, the dishes and the team.",
    "ph.1": "The dining room", "ph.2": "The counter", "ph.3": "Dishes of the day", "ph.4": "The kitchen team", "ph.5": "The desserts", "ph.6": "Lunchtime atmosphere",
    "faq.title": "Frequently asked questions", "faq.sub": "Another question? Find us on Discord or write to us by email.",
    "q1": "How do users sign in?", "a1": "With their Discord account: they click “Continue with Discord” and their role (student, teacher, staff) is recognised automatically from the school's Discord server. The first time, a short form asks for name, first name and class or subject.",
    "q2": "What does “Request not accepted” mean?", "a2": "The Discord account isn't on the school's server, or has no recognised role. The school's administration can fix that.",
    "q3": "How does payment work?", "a3": "Everyone has a balance. Booking a meal takes the meal price from that balance. The balance is managed by the administration, and students can also earn some with the mini-games.",
    "q4": "How do I get Turabo Self for my school?", "a4": "Turabo Self isn't open to the public: it is only used on the Campus Rosa Parks Discord server, and the demo form is closed. A public release is planned for later, maybe in about 3 years, with no commitment.",
    "q5": "Does everyone get a confirmation?", "a5": "Yes. If an email address was provided, a message is sent for every booking. Notifications are also available in the app.",
    "q6": "Which languages does the site support?", "a6": "French and English. The FR | EN button changes the language at any time.",
    "fin.title": "Ready to simplify your canteen?", "fin.p": "Turabo Self isn't open to the public yet. Find us on Discord.", "fin.cta": "Request a demo",
    "foot.tag": "Lunch, made simple.", "foot.note": "Turabo Self",
    "demo.title": "Request a demo", "demo.sub": "Tell us who you are: we'll answer by email.",
    "demo.first": "First name", "demo.last": "Last name", "demo.email": "Email address",
    "demo.why": "Why do you want Turabo Self?", "demo.link": "Link to your Discord server or website",
    "demo.send": "Send my request", "demo.sending": "Sending…",
    "demo.privacy": "Your data is only used to answer your request. <a href=\"confidentialite.html\" target=\"_blank\" rel=\"noopener\">Privacy policy (in French)</a>",
    "demo.ok.t": "Request sent!", "demo.ok.p": "Thank you! We'll get back to you by email very soon.", "demo.close": "Close",
    "demo.err.fill": "Please fill in every field.", "demo.err.email": "That email address isn't valid.",
    "demo.err.link": "Please give the link to your Discord server or website.",
    "demo.err.send": "Sending didn't work. Try again, or write to us directly:",
    "gm.title": "Try a mini-game", "gm.note": "This is a demo: in the app, every win adds balance to the student's account.",
    "g.win": "Well done! In the app, the student would earn balance.",
    "g.again": "Play again", "g.moves": "Moves: ", "g.wait": "Wait for green…", "g.go": "Click!",
    "g.early": "Too early! Try again.", "g.slow": "Too slow: ", "g.fast": "Reflex: ", "g.ms": " ms",
    "g.correct": "Correct!", "g.wrong": "Missed! The right answer: "
  };
  var TITLE = { fr: "Turabo Self — La cantine, simplement", en: "Turabo Self — Lunch, made simple" };
  var PH = {
    fr: { "d-why": "En quelques mots : votre établissement, votre besoin…", "d-link": "https://discord.gg/… ou https://votre-site.fr", "d-email": "prenom.nom@etablissement.fr" },
    en: { "d-why": "In a few words: your school, your need…", "d-link": "https://discord.gg/… or https://your-site.com", "d-email": "first.last@school.org" }
  };
  var QUIZ = {
    fr: [
      ["Combien de temps faut-il pour cuire un œuf dur ?", ["9-10 min", "1 min", "30 min", "2 heures"], 0],
      ["Quelle vitamine apporte principalement le soleil ?", ["Vitamine C", "Vitamine D", "Vitamine B12", "Vitamine K"], 1],
      ["Quel aliment n'est PAS une source de protéines ?", ["Lentilles", "Poulet", "Pomme", "Œuf"], 2],
      ["La capitale de l'Italie est ?", ["Milan", "Rome", "Venise", "Naples"], 1],
      ["Quel fruit est riche en potassium ?", ["Banane", "Fraise", "Citron", "Myrtille"], 0]
    ],
    en: [
      ["How long does it take to hard-boil an egg?", ["9-10 min", "1 min", "30 min", "2 hours"], 0],
      ["Which vitamin does the sun mainly provide?", ["Vitamin C", "Vitamin D", "Vitamin B12", "Vitamin K"], 1],
      ["Which food is NOT a source of protein?", ["Lentils", "Chicken", "Apple", "Egg"], 2],
      ["What is the capital of Italy?", ["Milan", "Rome", "Venice", "Naples"], 1],
      ["Which fruit is rich in potassium?", ["Banana", "Strawberry", "Lemon", "Blueberry"], 0]
    ]
  };
  var MENUS = {
    fr: [["Salade verte", "Poulet rôti", "Tarte aux pommes"], ["Soupe de légumes", "Lasagnes", "Yaourt aux fruits"], ["Carottes râpées", "Poisson pané", "Compote maison"]],
    en: [["Green salad", "Roast chicken", "Apple tart"], ["Vegetable soup", "Lasagne", "Fruit yoghurt"], ["Grated carrots", "Fish fingers", "Homemade compote"]]
  };

  /* --------------------------------- Langue --------------------------------- */
  var LKEY = "turabo-site-lang", lang = "fr";
  try { lang = localStorage.getItem(LKEY) || ""; } catch (e) {}
  if (lang !== "fr" && lang !== "en") lang = String(navigator.language || "fr").toLowerCase().indexOf("en") === 0 ? "en" : "fr";
  function T(k) { return lang === "en" ? (EN[k] !== undefined ? EN[k] : FRJ[k]) : (FRJ[k] !== undefined ? FRJ[k] : k); }

  $$("[data-i18n]").forEach(function (el) { el.setAttribute("data-fr", el.innerHTML); });

  function fmtNum(el, v) { return v.toFixed(Number(el.getAttribute("data-dec") || 0)); }

  // Coupe les titres mot par mot (pour l'animation d'apparition)
  function splitTitles() {
    $$(".h2").forEach(function (h) {
      var text = h.textContent.trim(), words = text.split(/\s+/);
      h.setAttribute("aria-label", text);
      h.innerHTML = words.map(function (w, i) { return '<span class="w" aria-hidden="true" style="--i:' + i + '"><span>' + w + "</span></span>"; }).join(" ");
    });
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem(LKEY, l); } catch (e) {}
    document.documentElement.lang = l;
    document.title = TITLE[l];
    $$("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      el.innerHTML = l === "en" && EN[k] !== undefined ? EN[k] : el.getAttribute("data-fr");
    });
    splitTitles();
    $$(".num").forEach(function (el) { el.textContent = fmtNum(el, Number(el.getAttribute("data-count"))); });
    var sw = $("#lang");
    sw.setAttribute("data-cur", l);
    $$("button", sw).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === l)); });
    $$(".ph-hint").forEach(function (el) { el.textContent = T("ph.hint"); });
    Object.keys(PH[l]).forEach(function (id) { var el = document.getElementById(id); if (el) el.placeholder = PH[l][id]; });
    showMenu(mi, true);
    paintTheme();
    if (gameName && !$("#gm").hidden) startGame(gameName);
  }
  $$("#lang button").forEach(function (b) { b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); }); });

  /* ---------------------------------- Thème ---------------------------------- */
  var TKEY = "turabo-site-theme";
  function paintTheme() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    $("#theme use").setAttribute("href", dark ? "#i-sun" : "#i-moon");
    $("#theme").setAttribute("aria-label", dark ? (lang === "en" ? "Switch to light mode" : "Passer en mode clair") : (lang === "en" ? "Switch to dark mode" : "Passer en mode sombre"));
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute("content", dark ? "#161A1F" : "#E9EDF0");
  }
  $("#theme").addEventListener("click", function () {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    if (dark) document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", "dark");
    try { localStorage.setItem(TKEY, dark ? "light" : "dark"); } catch (e) {}
    paintTheme();
  });

  /* ------------------------------ Navigation ------------------------------ */
  var nav = $("#nav"), links = $("#nav-links"), burger = $("#burger"), progress = $("#progress");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ")";
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  burger.addEventListener("click", function () {
    var open = !links.classList.contains("open");
    links.classList.toggle("open", open); burger.setAttribute("aria-expanded", String(open));
  });
  $$("a", links).forEach(function (a) { a.addEventListener("click", function () { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }); });

  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) $$("a", links).forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["about", "how", "photos", "faq"].forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
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
    var so2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("draw"); so2.unobserve(e.target); } });
    }, { threshold: 0.3 });
    $$(".steps").forEach(function (el) { so2.observe(el); });
  } else {
    $$(".rv").forEach(function (el) { el.classList.add("in"); });
    $$(".steps").forEach(function (el) { el.classList.add("draw"); });
  }

  /* ------------- Colibri qui suit le curseur + traînée de plumes ------------- */
  var hero = $("#hero"), lastTrail = 0;
  function petal(x, y, color, size, dur, dist, gravity) {
    var p = document.createElement("i");
    p.className = "petal";
    p.style.left = x + "px"; p.style.top = y + "px"; p.style.background = color;
    if (size) { p.style.width = size * 0.65 + "px"; p.style.height = size + "px"; }
    document.body.appendChild(p);
    var a = Math.random() * Math.PI * 2, d = dist * (0.5 + Math.random() * 0.8);
    var an = p.animate([
      { transform: "translate(-50%,-50%) scale(.3) rotate(0deg)", opacity: 1 },
      { transform: "translate(calc(-50% + " + Math.cos(a) * d + "px), calc(-50% + " + (Math.sin(a) * d + gravity) + "px)) scale(1) rotate(" + (Math.random() * 540 - 270) + "deg)", opacity: 0 }
    ], { duration: dur * (0.7 + Math.random() * 0.6), easing: "cubic-bezier(.15,.8,.3,1)" });
    an.onfinish = function () { p.remove(); };
  }
  var COLORS = ["#E4213B", "#FF7A59", "#FF9E8A", "#FFC9C2", "#B3132B"];
  function burst(x, y, n) { if (reduce) return; for (var i = 0; i < n; i++) petal(x, y, COLORS[i % COLORS.length], 0, 1100, 130, 60); }

  if (!reduce && hero) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
      hero.style.setProperty("--my", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
    }, { passive: true });
  }
  var bird = $("#bird");
  if (bird) bird.addEventListener("click", function (e) {
    bird.classList.remove("flap"); void bird.offsetWidth; bird.classList.add("flap");
    burst(e.clientX, e.clientY, 14);
  });

  /* -------------- Carte « exemple de menu » : les plats changent tout seuls -------------- */
  var mi = 0, mcTimers = [];
  var mcRows = $$("#mc-rows .mc-row"), mcBtn = $("#mc-btn"), mcBtnT = $("#mc-btn-t");
  function showMenu(i, instant) {
    var m = MENUS[lang][i % MENUS[lang].length];
    ["mc-a", "mc-b", "mc-c"].forEach(function (id, k) { $("#" + id).textContent = m[k]; });
    mcBtn.classList.remove("done", "press");
    mcBtnT.textContent = T("mc.book");
    if (instant) return;
    mcRows.forEach(function (r, k) { r.classList.remove("in"); void r.offsetWidth; r.style.animationDelay = k * 0.09 + "s"; r.classList.add("in"); });
  }
  function cycle() {
    mcTimers.forEach(clearTimeout); mcTimers = [];
    mcTimers.push(setTimeout(function () { mcBtn.classList.add("press"); }, 1700));
    mcTimers.push(setTimeout(function () { mcBtn.classList.remove("press"); mcBtn.classList.add("done"); mcBtnT.textContent = T("mc.done"); }, 1900));
    mcTimers.push(setTimeout(function () { mcRows.forEach(function (r) { r.classList.remove("in"); r.classList.add("out"); }); }, 4200));
    mcTimers.push(setTimeout(function () {
      mcRows.forEach(function (r) { r.classList.remove("out"); });
      mi = (mi + 1) % MENUS[lang].length; showMenu(mi); cycle();
    }, 4650));
  }
  if (!reduce) setTimeout(cycle, 2600);

  /* ------------------------------- Fenêtres (modales) ------------------------------- */
  var openModal = null;
  function open(id) {
    var m = document.getElementById(id);
    if (openModal) close();
    m.hidden = false; openModal = m; document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { m.classList.add("show"); });
    var f = $("input, textarea, button.tab, .tabs button", m); if (f && id === "demo") setTimeout(function () { $("#d-prenom").focus(); }, 250);
  }
  function close() {
    if (!openModal) return;
    var m = openModal; m.classList.remove("show");
    setTimeout(function () { m.hidden = true; }, 220);
    openModal = null; document.body.style.overflow = "";
    G.token++;
  }
  $$(".modal").forEach(function (m) {
    m.addEventListener("click", function (e) { if (e.target === m || e.target.closest("[data-close]")) close(); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { if (openModal) close(); else if (!lb.hidden) closeLb(); } });

  /* ------------------------------ Formulaire de démo ------------------------------ */
  function openDemo() {
    $("#demo-closed").hidden = DEMO_OPEN;
    $("#demo-form-view").hidden = !DEMO_OPEN; $("#demo-done").hidden = true; $("#d-err").hidden = true;
    open("demo");
  }
  $$("[data-demo]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); openDemo(); }); });
  if (location.hash === "#demo") openDemo();

  function showErr(msg, extraHtml) {
    var el = $("#d-err"); el.hidden = false; el.innerHTML = ""; el.appendChild(document.createTextNode(msg));
    if (extraHtml) { el.appendChild(document.createTextNode(" ")); el.appendChild(extraHtml); }
    el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake");
  }

  $("#demo-form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var d = {
      prenom: $("#d-prenom").value.trim(), nom: $("#d-nom").value.trim(), email: $("#d-email").value.trim(),
      why: $("#d-why").value.trim(), link: $("#d-link").value.trim()
    };
    if (!DEMO_OPEN) return;
    if ($("#d-hp").value) return;   // champ piège : seuls les robots le remplissent
    if (!d.prenom || !d.nom || !d.email || !d.why) return showErr(T("demo.err.fill"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return showErr(T("demo.err.email"));
    if (!d.link || !/(discord\.(gg|com)|https?:\/\/|www\.|\.[a-z]{2,})/i.test(d.link)) return showErr(T("demo.err.link"));

    var btn = $("#d-send"), lbl = $("span", btn), old = lbl.innerHTML;
    btn.disabled = true; lbl.textContent = T("demo.sending"); $("#d-err").hidden = true;

    var ctl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 15000);
    fetch("https://formsubmit.co/ajax/" + TO, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: "Demande de démo Turabo Self — " + d.prenom + " " + d.nom,
        _template: "table", _captcha: "false",
        "Prénom": d.prenom, "Nom": d.nom, "email": d.email,
        "Pourquoi Turabo Self": d.why, "Lien Discord / site": d.link, "Langue du site": lang.toUpperCase()
      }),
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || !(res.j.success === true || res.j.success === "true")) throw new Error("send");
        $("#demo-form-view").hidden = true; $("#demo-done").hidden = false; $("#demo-form").reset();
        var r = $("#demo-done .check").getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 26);
      })
      .catch(function () {
        var a = document.createElement("a");
        a.href = "mailto:" + TO + "?subject=" + encodeURIComponent("Demande de démo Turabo Self") + "&body=" + encodeURIComponent(
          d.prenom + " " + d.nom + "\n" + d.email + "\n\n" + d.why + "\n\n" + d.link);
        a.textContent = TO;
        showErr(T("demo.err.send"), a);
      })
      .then(function () { clearTimeout(timer); btn.disabled = false; lbl.innerHTML = old; });
  });

  /* -------------------------------- Mini-jeux jouables -------------------------------- */
  var G = { token: 0 }, gameName = null, lastQ = -1;
  var stage = $("#gm-stage");
  $$("[data-game]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.closest("#gm-tabs")) return startGame(b.getAttribute("data-game"));
      open("gm"); startGame(b.getAttribute("data-game"));
    });
  });
  function startGame(name) {
    gameName = name; G.token++;
    $$("#gm-tabs button").forEach(function (b) { var on = b.getAttribute("data-game") === name; b.classList.toggle("on", on); b.setAttribute("aria-selected", String(on)); });
    stage.innerHTML = "";
    ({ quiz: gQuiz, memory: gMemory, reflex: gReflex })[name](G.token);
  }
  function win(tk, extra) {
    if (tk !== G.token) return;
    var box = document.createElement("div"); box.className = "win";
    box.innerHTML = '<b></b><button class="btn btn-primary btn-sm" type="button"></button>';
    $("b", box).textContent = (extra ? extra + " " : "") + T("g.win");
    var again = $("button", box); again.textContent = T("g.again");
    again.addEventListener("click", function () { startGame(gameName); });
    stage.appendChild(box);
    var r = stage.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 30, 30);
  }

  function gQuiz(tk) {
    var bank = QUIZ[lang], i;
    do { i = Math.floor(Math.random() * bank.length); } while (i === lastQ && bank.length > 1);
    lastQ = i;
    var q = bank[i];
    stage.innerHTML = '<p class="g-q"></p><div class="g-opts"></div><p class="g-msg" id="g-msg"></p>';
    $(".g-q", stage).textContent = q[0];
    q[1].forEach(function (opt, k) {
      var b = document.createElement("button"); b.type = "button"; b.className = "g-opt"; b.textContent = opt;
      b.addEventListener("click", function () {
        if (tk !== G.token) return;
        $$(".g-opt", stage).forEach(function (x) { x.disabled = true; });
        $$(".g-opt", stage)[q[2]].classList.add("right");
        if (k === q[2]) { $("#g-msg").textContent = T("g.correct"); win(tk); }
        else {
          b.classList.add("wrong");
          $("#g-msg").textContent = T("g.wrong") + q[1][q[2]];
          var again = document.createElement("button"); again.type = "button"; again.className = "btn btn-ghost btn-sm"; again.textContent = T("g.again");
          again.addEventListener("click", function () { startGame("quiz"); }); stage.appendChild(again);
        }
      });
      $(".g-opts", stage).appendChild(b);
    });
  }

  function gMemory(tk) {
    var base = ["🍎", "🥐", "🍕"], cards = base.concat(base).map(function (e, i) { return { id: i, e: e, open: false, done: false }; })
      .sort(function () { return Math.random() - 0.5; });
    var sel = [], moves = 0, lock = false;
    stage.innerHTML = '<p class="g-msg" id="g-moves"></p><div class="mem"></div>';
    var grid = $(".mem", stage);
    cards.forEach(function (c) {
      var b = document.createElement("button"); b.type = "button"; b.className = "mem-card"; b.setAttribute("aria-label", "card");
      b.innerHTML = '<span class="mf back"><img src="logo.png" alt="" width="34" height="34"/></span><span class="mf front">' + c.e + "</span>";
      b.addEventListener("click", function () { flip(c, b); });
      grid.appendChild(b); c.el = b;
    });
    function paint() {
      $("#g-moves").textContent = T("g.moves") + moves;
      cards.forEach(function (c) { c.el.classList.toggle("open", c.open || c.done); c.el.classList.toggle("matched", c.done); });
    }
    paint();
    function flip(c) {
      if (tk !== G.token || lock || c.open || c.done || sel.length === 2) return;
      c.open = true; sel.push(c); paint();
      if (sel.length === 2) {
        moves++; lock = true; var a = sel[0], b = sel[1];
        setTimeout(function () {
          if (tk !== G.token) return;
          if (a.e === b.e) { a.done = b.done = true; a.open = b.open = false; }
          else { a.open = b.open = false; }
          sel = []; lock = false; paint();
          if (cards.every(function (x) { return x.done; })) setTimeout(function () { win(tk); }, 500);
        }, a.e === b.e ? 450 : 800);
        paint();
      }
    }
  }

  function gReflex(tk) {
    var phase = "wait", t0 = 0;
    stage.innerHTML = '<button class="reflex wait" type="button"></button><p class="g-msg" id="g-msg"></p>';
    var btn = $(".reflex", stage);
    function set(cls, text) { btn.className = "reflex " + cls; btn.textContent = text; }
    set("wait", T("g.wait"));
    var timer = setTimeout(function () { if (tk !== G.token) return; phase = "go"; t0 = performance.now(); set("go", T("g.go")); }, 1200 + Math.random() * 2200);
    btn.addEventListener("click", function () {
      if (tk !== G.token) return;
      if (phase === "wait") {
        clearTimeout(timer); phase = "over"; set("early", T("g.early"));
        var again = document.createElement("button"); again.type = "button"; again.className = "btn btn-ghost btn-sm"; again.textContent = T("g.again");
        again.addEventListener("click", function () { startGame("reflex"); }); stage.appendChild(again);
      } else if (phase === "go") {
        var ms = Math.round(performance.now() - t0); phase = "over";
        if (ms < 600) { set("done", T("g.fast") + ms + T("g.ms")); win(tk); }
        else {
          set("early", T("g.slow") + ms + T("g.ms"));
          var a2 = document.createElement("button"); a2.type = "button"; a2.className = "btn btn-ghost btn-sm"; a2.textContent = T("g.again");
          a2.addEventListener("click", function () { startGame("reflex"); }); stage.appendChild(a2);
        }
      }
    });
  }

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

  $$(".shot").forEach(function (fig, i) {
    var ph = document.createElement("div");
    ph.className = "ph";
    ph.innerHTML = '<svg class="ic"><use href="#i-camera"/></svg><span class="ph-hint"></span>';
    fig.appendChild(ph);
    // 1) photo intégrée dans le code, 2) sinon un fichier self-N.jpg posé à côté de index.html
    var sources = [PHOTOS[i], "self-" + (i + 1) + ".jpg"].filter(Boolean);
    (function tryNext(k) {
      if (k >= sources.length) { fig.classList.add("empty"); return; }
      var img = new Image(); img.alt = "";
      img.onload = function () { fig.insertBefore(img, fig.firstChild); fig.classList.remove("empty"); };
      img.onerror = function () { tryNext(k + 1); };
      img.src = sources[k];
    })(0);
    fig.addEventListener("click", function () { if (!fig.classList.contains("empty")) openLb(fig); });
  });

  splitTitles();
  setLang(lang);
})();
