/* VietCouncil.org — language toggle + nav
   Translatable elements carry data-en and data-vi attributes.
   The active language's text is written into the element (innerHTML).
   Preference is stored in localStorage. Default language: Vietnamese. */

(function () {
  "use strict";

  var STORAGE_KEY = "vc-lang";

  function applyLang(lang) {
    if (lang !== "en" && lang !== "vi") lang = "vi";
    document.documentElement.setAttribute("lang", lang);

    var nodes = document.querySelectorAll("[data-en][data-vi]");
    for (var i = 0; i < nodes.length; i++) {
      var val = nodes[i].getAttribute("data-" + lang);
      if (val !== null) nodes[i].innerHTML = val;
    }

    var btns = document.querySelectorAll(".lang-btn");
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle("active", btns[j].getAttribute("data-lang") === lang);
      btns[j].setAttribute("aria-pressed", btns[j].getAttribute("data-lang") === lang ? "true" : "false");
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function getInitialLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === "en" || saved === "vi") return saved;
    // Fall back to browser language when no preference is stored.
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("vi") === 0 ? "vi" : "en";
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(getInitialLang());

    var btns = document.querySelectorAll(".lang-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        applyLang(this.getAttribute("data-lang"));
      });
    }

    // Mobile nav toggle
    var menuBtn = document.querySelector(".menu-btn");
    var nav = document.querySelector(".nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function () {
        nav.classList.toggle("open");
      });
      var links = nav.querySelectorAll("a");
      for (var k = 0; k < links.length; k++) {
        links[k].addEventListener("click", function () { nav.classList.remove("open"); });
      }
    }

    // Current-year in footer
    var yr = document.querySelector("[data-year]");
    if (yr) yr.textContent = new Date().getFullYear();
  });
})();
