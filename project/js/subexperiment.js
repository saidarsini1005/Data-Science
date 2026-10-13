/* subexperiment.js — sub-experiment page (subexperiment.html?experiment=06&sub=6A) */
(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const exp = findExperiment(params.get("exp") || params.get("experiment") || params.get("id"));
  const content = document.getElementById("content");

  loadStudentProfile();
  document.getElementById("primaryNavigation").innerHTML = renderNavbar("experiments");
  setupThemeToggle();
  setupPageTransitions();

  function notFound(msg) {
    document.title = "Not found | Data Science Laboratory";
    document.getElementById("crumbs").innerHTML = '<a href="index.html">Dashboard</a><span class="sep">/</span><strong>Not found</strong>';
    content.innerHTML = '<div class="empty"><div class="big" aria-hidden="true">&#9888;</div><h3>' + esc(msg) + '</h3><p style="margin-top:16px"><a class="btn btn-primary" href="index.html">Back to dashboard</a></p></div>';
  }

  function indexOfSub(id) {
    const key = String(id || "").toUpperCase();
    const i = exp.subExperiments.findIndex(function (s) { return s.id.toUpperCase() === key || s.letter === key; });
    return i < 0 ? 0 : i;
  }
  let current = 0;

  function urlFor(i) { return "subexperiment.html?exp=" + exp.id + "&sub=" + exp.subExperiments[i].id; }

  function panel(num, title, body, delay) {
    return '<section class="panel" style="animation-delay:' + delay + 'ms" aria-labelledby="s-' + num + '"><h2 id="s-' + num + '"><span class="num">' + num + "</span>" + esc(title) + "</h2>" + body + "</section>";
  }

  function render(i, animate) {
    current = i;
    const s = exp.subExperiments[i];
    const label = subLabel(s);
    const total = exp.subExperiments.length;
    document.title = "Experiment " + label + " | Data Science Laboratory";
    document.getElementById("crumbs").innerHTML =
      '<a href="index.html">Dashboard</a><span class="sep">/</span><a href="experiment.html?id=' + exp.id + '">Experiment ' + esc(padId(exp.id)) + '</a><span class="sep">/</span><strong>' + esc(label) + "</strong>";

    const tabs = exp.subExperiments.map(function (x, k) {
      return '<a class="tab' + (k === i ? " active" : "") + '" href="' + urlFor(k) + '" data-i="' + k + '" data-spa title="' + esc(x.name) + '" aria-label="Sub-experiment ' + esc(subLabel(x)) + ": " + esc(x.name) + '"' + (k === i ? ' aria-current="page"' : "") + ">" + esc(x.letter) + "</a>";
    }).join("");

    const steps = (s.procedure || []).map(function (p, k) {
      return '<li class="step" style="list-style:none"><span class="n">' + String(k + 1).padStart(2, "0") + '</span><span class="arrow" aria-hidden="true">&rarr;</span><span class="t">' + esc(p) + "</span></li>";
    }).join("");

    const fileName = s.file || ("exp" + expNumber(exp) + s.letter.toLowerCase() + ".py");

    content.innerHTML =
      '<div class="' + (animate ? "fade-swap" : "") + '">' +
      '<header class="page-hero">' +
        '<div class="kicker">EXPERIMENT ' + esc(label) + "</div>" +
        "<h1>" + esc(s.name) + "</h1>" +
        '<div class="resource-row" aria-label="Sub-experiment resources">' +
          '<a class="res-link" href="' + esc(safeUrl(s.youtube)) + '" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">&#9654;</span> YouTube Tutorial</a>' +
          '<a class="res-link" href="' + esc(safeUrl(s.github)) + '" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">&#8984;</span> GitHub Repository</a>' +
        "</div>" +
      "</header>" +

      '<nav class="pager" aria-label="Sub-experiment navigation">' +
        '<a class="btn btn-ghost" id="prevBtn" href="' + (i > 0 ? urlFor(i - 1) : "#") + '" data-spa data-dir="-1"' + (i === 0 ? ' aria-disabled="true" disabled' : "") + ">&larr; Previous</a>" +
        '<span class="mid">Experiment ' + esc(label) + " <small>(" + (i + 1) + " of " + total + ")</small></span>" +
        '<a class="btn btn-primary" id="nextBtn" href="' + (i < total - 1 ? urlFor(i + 1) : "#") + '" data-spa data-dir="1"' + (i === total - 1 ? ' aria-disabled="true" disabled' : "") + ">Next &rarr;</a>" +
      "</nav>" +
      '<div class="sub-tabs" role="navigation" aria-label="All sub-experiments"><span class="label">Sub-experiments</span>' + tabs +
        '<a class="btn btn-ghost btn-sm" style="margin-left:auto" href="experiment.html?id=' + exp.id + '">&uarr; Experiment overview</a></div>' +

      panel(1, "Experiment Aim", "<p>" + esc(s.aim) + "</p>", 40) +
      panel(2, "Problem Statement", "<p>" + esc(s.problem) + "</p>", 80) +
      panel(3, "Required Tools", '<div class="chips">' + (s.tools || []).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>", 120) +
      panel(4, "Concept Explanation", "<p>" + esc(s.explanation) + "</p>", 160) +
      panel(5, "Step-by-Step Procedure", '<ol class="steps" style="padding:0">' + steps + "</ol>", 200) +
      panel(6, "Code & Interactive Compiler",
        '<div class="code-bar"><span class="code-file">' + esc(fileName) + '</span>' +
        '<button class="copy-btn" id="copyBtn" type="button" aria-label="Copy code to clipboard">Copy Code</button></div>' +
        pythonRunnerMarkup(s.code || ""), 240) +
      panel(7, "Expected Input", "<p>" + esc(s.input) + "</p>", 280) +
      panel(8, "Result", '<div class="output-head">Output</div><pre class="output" tabindex="0" aria-label="Program output">' + esc(s.result) + "</pre>", 320) +
      panel(9, "Analysis", "<p>" + esc(s.analysis) + "</p>", 360) +
      panel(10, "Conclusion", "<p>" + esc(s.conclusion) + "</p>", 400) +
      '<nav class="pager" aria-label="Bottom navigation"><a class="btn btn-ghost" href="experiment.html?id=' + exp.id + '">&larr; Back to Experiment ' + esc(padId(exp.id)) + "</a>" +
        '<a class="btn btn-ghost" href="index.html">Home</a></div>' +
      "</div>";

    mountPythonRunner(content.querySelector(".python-runner"), s.code || "");
    wireCopy(s.code || "");
    if (animate) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- Copy code ---------- */
  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  }
  function wireCopy(code) {
    const btn = document.getElementById("copyBtn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      function done(ok) {
        btn.textContent = ok ? "✓ Code copied" : "Copy failed";
        btn.classList.toggle("done", ok);
        if (ok) toast("✓ Code copied");
        clearTimeout(btn._t);
        btn._t = setTimeout(function () { btn.textContent = "Copy Code"; btn.classList.remove("done"); }, 2000);
      }
      const currentCode = document.querySelector(".code-editor").value || code;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(currentCode).then(function () { done(true); }, function () { done(fallbackCopy(currentCode)); });
      } else {
        done(fallbackCopy(currentCode));
      }
    });
  }

  /* ---------- Dynamic navigation without reloading ---------- */
  function go(i, push) {
    if (i < 0 || i >= exp.subExperiments.length || i === current) return;
    if (push) {
      try { history.pushState({ i: i }, "", urlFor(i)); }
      catch (e) { window.location.href = urlFor(i); return; }   // file:// pages cannot change the query string in place
    }
    render(i, true);
  }

  content.addEventListener("click", function (e) {
    const a = e.target.closest("a[data-spa]");
    if (!a) return;
    e.preventDefault();
    if (a.hasAttribute("disabled")) return;
    const dir = a.getAttribute("data-dir");
    go(dir ? current + parseInt(dir, 10) : parseInt(a.getAttribute("data-i"), 10), true);
  });
  window.addEventListener("popstate", function () {
    const p = new URLSearchParams(window.location.search);
    render(indexOfSub(p.get("sub")), true);
  });
  document.addEventListener("keydown", function (e) {
    if (e.target.closest && e.target.closest("input, textarea, pre")) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowLeft") go(current - 1, true);
    if (e.key === "ArrowRight") go(current + 1, true);
  });

  if (!exp) { notFound("Experiment not found"); return; }
  if (!exp.subExperiments.length) { notFound("This experiment has no sub-experiments"); return; }
  setTimeout(function () { render(indexOfSub(params.get("sub")), false); }, 260);
})();
