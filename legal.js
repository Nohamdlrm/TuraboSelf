(function () {
  var b = document.getElementById("theme");
  function paint() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    b.querySelector("use").setAttribute("href", dark ? "#i-sun" : "#i-moon");
    b.setAttribute("aria-label", dark ? "Passer en mode clair" : "Passer en mode sombre");
  }
  b.addEventListener("click", function () {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    if (dark) document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", "dark");
    try { localStorage.setItem("turabo-site-theme", dark ? "light" : "dark"); } catch (e) {}
    paint();
  });
  paint();
})();
