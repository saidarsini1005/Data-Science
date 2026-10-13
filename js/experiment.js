/* experiment.js — experiment overview page (experiment.html?id=06) */
(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const exp = findExperiment(params.get("id"));
  const content = document.getElementById("content");

  loadStudentProfile();
  document.getElementById("primaryNavigation").innerHTML = renderNavbar("experiments");
  setupThemeToggle();
  setupPageTransitions();

  function notFound() {
    document.title = "Experiment not found | Data Science Laboratory";
    document.getElementById("crumbs").innerHTML = '<a href="index.html">Dashboard</a><span class="sep">/</span><strong>Not found</strong>';
    content.innerHTML = '<div class="empty"><div class="big" aria-hidden="true">&#9888;</div><h3>Experiment not found</h3><p>The experiment you opened does not exist in this portal.</p><p style="margin-top:16px"><a class="btn btn-primary" href="index.html">Back to dashboard</a></p></div>';
  }

  function section(num, title, body, id, delay) {
    return '<section class="panel"' + (id ? ' id="' + id + '"' : "") + ' style="animation-delay:' + delay + 'ms" aria-labelledby="h-' + num + '">' +
      '<h2 id="h-' + num + '"><span class="num">' + num + "</span>" + esc(title) + "</h2>" + body + "</section>";
  }

  function render() {
    const n = expNumber(exp);
    document.title = "Experiment " + padId(exp.id) + " | Data Science Laboratory";
    document.getElementById("crumbs").innerHTML = '<a href="index.html">Dashboard</a><span class="sep">/</span><strong>Experiment ' + esc(padId(exp.id)) + "</strong>";

    const d = exp.dataset || {};
    const features = String(d.features || "").split(/,\s*/).filter(function (f) { return f && f !== "-"; });
    const dataBody =
      '<div class="kv-grid">' +
        '<div class="kv"><span>Dataset name</span><strong>' + esc(d.name) + "</strong></div>" +
        '<div class="kv"><span>Number of records</span><strong>' + esc(d.records) + "</strong></div>" +
        '<div class="kv" style="grid-column:1/-1"><span>Dataset source</span><strong>' + esc(d.source) + "</strong></div>" +
        '<div class="kv" style="grid-column:1/-1"><span>Data types</span><strong>' + esc(d.types) + "</strong></div>" +
      "</div>" +
      (features.length ? '<h3 class="sub-label" style="margin-top:20px">Features</h3><div class="chips">' + features.map(function (f) { return '<span class="chip">' + esc(f) + "</span>"; }).join("") + "</div>" : "") +
      (d.note ? '<p style="margin-top:16px">' + esc(d.note) + "</p>" : "");

    const subCards = exp.subExperiments.map(function (s) {
      return '<a class="sub-card" href="subexperiment.html?exp=' + exp.id + "&sub=" + s.id + '">' +
        '<span class="sid">' + esc(s.id) + "</span><h4>" + esc(s.name) + "</h4><p>" + esc((s.aim || "").slice(0, 110)) + (s.aim && s.aim.length > 110 ? "&hellip;" : "") + '</p><span class="go">Open sub-experiment &rarr;</span></a>';
    }).join("");
    const runnerChoices = exp.subExperiments.map(function (s) {
      return { label: subLabel(s) + " - " + s.name };
    });

    const arch = (exp.architecture || []).map(function (a, i, arr) {
      const t = typeof a === "string" ? { title: a } : a;
      return '<div class="arch-node" style="animation-delay:' + (i * 140) + 'ms">' + esc(t.title) + (t.note ? "<small>" + esc(t.note) + "</small>" : "") + "</div>" +
             (i < arr.length - 1 ? '<div class="arch-arrow" aria-hidden="true"></div>' : "");
    }).join("");

    content.innerHTML =
      '<header class="page-hero">' +
        '<div class="kicker">EXPERIMENT ' + esc(padId(exp.id)) + "</div>" +
        "<h1>" + esc(exp.name) + "</h1>" +
        '<div class="resource-row" aria-label="Experiment resources">' +
          '<a class="res-link" href="' + esc(safeUrl(exp.youtube)) + '" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">&#9654;</span> YouTube Tutorial</a>' +
          '<a class="res-link" href="' + esc(safeUrl(exp.github)) + '" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">&#8984;</span> GitHub Repository</a>' +
        "</div>" +
      "</header>" +
      section(1, "Experiment Overview", "<p>" + esc(exp.overview) + "</p>", "overview", 60) +
      '<div class="two-col">' +
        section(2, "Aim", "<p>" + esc(exp.aim) + "</p>", "aim", 120) +
        section(3, "Problem Statement", "<p>" + esc(exp.problemStatement) + "</p>", "problem", 180) +
      "</div>" +
      section(4, "Dataset", dataBody, "dataset", 240) +
      section(5, "Methodology", '<ol class="method-list">' + (exp.methodology || []).map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ol>", "methodology", 300) +
      section(6, "Sub Experiments", '<div class="sub-grid">' + subCards + "</div>", "sub-experiments", 360) +
      section(7, "Interactive Python Workspace", pythonRunnerMarkup(exp.subExperiments[0].code || "", runnerChoices), "python-workspace", 400) +
      '<div class="two-col">' +
        section(8, "Analysis", "<p>" + esc(exp.analysis) + "</p>", "analysis", 460) +
        section(9, "Results", "<p>" + esc(exp.results) + "</p>", "results", 520) +
      "</div>" +
      section(10, "Architecture", '<div class="arch" role="img" aria-label="Flow diagram: ' + esc((exp.architecture || []).map(function (a) { return typeof a === "string" ? a : a.title; }).join(" to ")) + '">' + arch + "</div>", "architecture", 600) +
      '<div class="pager"><a class="btn btn-ghost" href="index.html">&larr; Back to Dashboard</a>' +
        '<a class="btn btn-primary" href="subexperiment.html?exp=' + exp.id + "&sub=" + exp.subExperiments[0].id + '">Start with ' + esc(exp.subExperiments[0].id) + " &rarr;</a></div>";

    const runner = mountPythonRunner(content.querySelector(".python-runner"), exp.subExperiments[0].code || "");
    const runnerSelect = content.querySelector(".runner-select");
    if (runnerSelect && runner) {
      runnerSelect.addEventListener("change", function () {
        const selected = exp.subExperiments[parseInt(runnerSelect.value, 10)];
        runner.setCode(selected ? selected.code || "" : "");
      });
    }

    if (location.hash) {
      const t = document.getElementById(location.hash.slice(1));
      if (t) setTimeout(function () { t.scrollIntoView({ behavior: "smooth", block: "start" }); }, 150);
    }
  }

  /* active nav: Experiments vs Sub Experiments section */
  function onScroll() {
    const s = document.getElementById("sub-experiments");
    const inSub = s && s.getBoundingClientRect().top <= 140 && s.getBoundingClientRect().bottom > 140;
    document.querySelectorAll("#primaryNavigation .nav-link").forEach(function (a) {
      const on = a.getAttribute("data-key") === (inSub ? "subexperiments" : "experiments");
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  if (!exp) { notFound(); return; }
  setTimeout(function () { render(); window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); }, 260);
})();
