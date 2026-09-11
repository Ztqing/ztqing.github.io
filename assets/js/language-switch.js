(function () {
  "use strict";

  var loading = false;

  function currentSection() {
    var anchors = document.querySelectorAll(".page__content .anchor[id]");
    var masthead = document.querySelector(".masthead");
    var threshold = window.pageYOffset + (masthead ? masthead.offsetHeight : 0) + 24;
    var section = "";

    for (var index = 0; index < anchors.length; index += 1) {
      var top = anchors[index].getBoundingClientRect().top + window.pageYOffset;
      if (top > threshold) break;
      section = "#" + anchors[index].id;
    }

    return section || window.location.hash;
  }

  function scrollToSection(hash) {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    var target = document.querySelector(hash);
    if (target) target.scrollIntoView();
  }

  function updateDocument(source) {
    var next = source.querySelector("#main");
    var nextMasthead = source.querySelector(".masthead");
    var main = document.querySelector("#main");
    var masthead = document.querySelector(".masthead");

    if (!next || !nextMasthead || !main || !masthead) throw new Error("Incomplete language page");
    masthead.replaceWith(nextMasthead);
    main.replaceWith(next);
    document.documentElement.lang = source.documentElement.lang;
    document.title = source.title;

    var sourceDescription = source.querySelector('meta[name="description"]');
    var description = document.querySelector('meta[name="description"]');
    if (sourceDescription && description) description.setAttribute("content", sourceDescription.content);

    if (window.initMasthead) window.initMasthead();
  }

  function loadLanguage(url, addHistory) {
    if (loading) return;
    loading = true;
    var requestedUrl = new URL(url, window.location.href);
    var hash = requestedUrl.hash || currentSection();
    if (hash) requestedUrl.hash = hash;
    else requestedUrl.hash = "";

    if (requestedUrl.pathname === window.location.pathname) {
      loading = false;
      scrollToSection(requestedUrl.hash);
      return;
    }

    fetch(requestedUrl.href, { headers: { "X-Requested-With": "SPA" } })
      .then(function (response) {
        if (!response.ok) throw new Error("Language page unavailable");
        return response.text();
      })
      .then(function (html) {
        var source = new DOMParser().parseFromString(html, "text/html");
        updateDocument(source);
        if (addHistory) window.history.pushState({ language: true }, "", requestedUrl.href);
        scrollToSection(hash);
      })
      .catch(function () {
        window.location.href = requestedUrl.href;
      })
      .finally(function () {
        loading = false;
      });
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[data-language-switch]");
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    loadLanguage(link.href, true);
  });

  window.addEventListener("popstate", function () {
    loadLanguage(window.location.href, false);
  });
}());
