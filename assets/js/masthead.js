(function () {
  "use strict";

  var nav = document.getElementById("site-nav");

  if (!nav) {
    return;
  }

  var button = nav.querySelector(".masthead__menu-toggle");
  var visibleLinks = nav.querySelector(".visible-links");
  var hiddenLinks = nav.querySelector(".hidden-links");
  var languageLinks = nav.querySelectorAll("[data-language-switch]");
  var navItems = Array.prototype.slice.call(nav.querySelectorAll("[data-nav-order]"));
  var compactLayout = window.matchMedia("(max-width: 899px)");

  navItems.sort(function (first, second) {
    return Number(first.getAttribute("data-nav-order")) - Number(second.getAttribute("data-nav-order"));
  });

  function setMenuState(open) {
    hiddenLinks.classList.toggle("hidden", !open);
    button.classList.toggle("close", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", button.getAttribute(open ? "data-close-label" : "data-open-label"));
  }

  function updateNavigationLayout() {
    setMenuState(false);

    if (compactLayout.matches) {
      navItems.forEach(function (item) {
        if (!item.classList.contains("masthead__menu-home-item")) {
          hiddenLinks.appendChild(item);
        }
      });

      button.classList.remove("hidden");
      button.setAttribute("count", String(hiddenLinks.children.length));
      return;
    }

    navItems.forEach(function (item) {
      visibleLinks.appendChild(item);
    });

    button.classList.add("hidden");
    button.setAttribute("count", "0");
  }

  function currentSection() {
    var masthead = document.querySelector(".masthead");
    var mastheadHeight = masthead ? masthead.offsetHeight : 0;
    var threshold = window.pageYOffset + mastheadHeight + 24;
    var anchors = document.querySelectorAll(".page__content .anchor[id]");
    var section = "";

    for (var index = 0; index < anchors.length; index += 1) {
      var anchorTop = anchors[index].getBoundingClientRect().top + window.pageYOffset;

      if (anchorTop > threshold) {
        break;
      }

      section = "#" + anchors[index].id;
    }

    return section || window.location.hash;
  }

  button.addEventListener("click", function () {
    setMenuState(!hiddenLinks.classList.contains("hidden"));
  });

  hiddenLinks.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  });

  document.addEventListener("click", function (event) {
    if (!nav.contains(event.target)) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !hiddenLinks.classList.contains("hidden")) {
      setMenuState(false);
      button.focus();
    }
  });

  for (var index = 0; index < languageLinks.length; index += 1) {
    languageLinks[index].addEventListener("click", function () {
      var target = this.getAttribute("href").split("#")[0];
      this.setAttribute("href", target + currentSection());
    });
  }

  window.addEventListener("resize", updateNavigationLayout);
  updateNavigationLayout();
}());
