/* index.js — dashboard: profile, search, experiment cards, add-experiment modal */
(function () {
  "use strict";

  const $ = function (s) { return document.querySelector(s); };
  const grid = $("#grid"), empty = $("#empty"), meta = $("#searchMeta"), input = $("#searchInput");

  /* ---------- Shell ---------- */
  loadStudentProfile();
  $("#primaryNavigation").innerHTML = renderNavbar("dashboard");
  setupThemeToggle();
  setupPageTransitions();
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Profile ---------- */
  function paintProfile() {
    $("#pName").textContent = STUDENT.name;
    $("#pRoll").textContent = STUDENT.roll;
    $("#pSec").textContent = STUDENT.sec;
    $("#pSem").textContent = STUDENT.sem;
    $("#pBranch").textContent = STUDENT.branch;
    $("#pFaculty").textContent = STUDENT.faculty;
    $("#pDegree").textContent = STUDENT.degree;
    $("#heroTags").innerHTML =
      '<span class="tag">Data Science</span><span class="tag">Laboratory</span><span class="tag">Subject Code: ' + esc(STUDENT.subjectCode) + "</span>";
  }
  paintProfile();

  /* ---------- Flashcards ---------- */
  const flashcards = [
    {
      title: "The Upside Down Dimensions",
      prompt: "The lab sensors captured hundreds of signals. How can we map the hidden world into fewer dimensions?",
      concept: "Dimensionality Reduction",
      detail: "PCA finds directions of maximum variance; t-SNE preserves local neighborhoods for a 2D or 3D visualization.",
      code: "PCA(n_components=2)"
    },
    {
      title: "Mind Flayer's Hive Mind",
      prompt: "One decision-maker is easy to fool. What if many different models vote together?",
      concept: "Ensemble Learning",
      detail: "Random Forest trains many decorrelated decision trees on bootstrapped samples, then combines their predictions.",
      code: "RandomForestClassifier(n_estimators=100)"
    },
    {
      title: "Radio Waves to Hawkins Lab",
      prompt: "Static distorts every transmission. How do we clean and align the signal before decoding it?",
      concept: "Signal Processing & Feature Scaling",
      detail: "Filter or transform signal measurements, then scale features so differences in units do not dominate a model.",
      code: "X_scaled = scaler.fit_transform(X)"
    },
    {
      title: "Will's Morse Code",
      prompt: "A message arrives as a wall of text. How can a model break it into patterns it can understand?",
      concept: "Text Preprocessing & NLP Tokenization",
      detail: "Normalize text and split it into tokens; token IDs can then be used as features by downstream NLP models.",
      code: "tokens = text.lower().split()"
    }
  ];
  const flashcard = $("#flashcard"), flashcardInner = $("#flashcardInner");
  let flashcardIndex = 0;
  function paintFlashcard() {
    const card = flashcards[flashcardIndex];
    flashcardInner.innerHTML =
      '<span class="flashcard-face flashcard-front"><span class="flashcard-mark">HAWKINS LAB // CLASSIFIED</span><span class="flashcard-eyebrow">MYSTERY ' + String(flashcardIndex + 1).padStart(2, "0") + '</span><strong>' + esc(card.title) + '</strong><span class="flashcard-prompt">' + esc(card.prompt) + '</span><span class="flashcard-turn">TURN TO REVEAL <span aria-hidden="true">&#8635;</span></span></span>' +
      '<span class="flashcard-face flashcard-back"><span class="flashcard-mark">FIELD NOTES // DATA SCIENCE</span><span class="flashcard-eyebrow">DECODED CONCEPT</span><strong>' + esc(card.concept) + '</strong><span class="flashcard-prompt">' + esc(card.detail) + '</span><code>' + esc(card.code) + '</code><span class="flashcard-turn">HAWKINS LAB // END TRANSMISSION</span></span>';
    $("#flashcardCount").textContent = String(flashcardIndex + 1).padStart(2, "0") + " / " + String(flashcards.length).padStart(2, "0");
    flashcard.classList.remove("is-flipped");
    flashcard.setAttribute("aria-pressed", "false");
    $("#flipFlashcard").setAttribute("aria-pressed", "false");
  }
  function toggleFlashcard() {
    const flipped = flashcard.classList.toggle("is-flipped");
    flashcard.setAttribute("aria-pressed", String(flipped));
    $("#flipFlashcard").setAttribute("aria-pressed", String(flipped));
  }
  flashcard.addEventListener("click", toggleFlashcard);
  $("#flipFlashcard").addEventListener("click", toggleFlashcard);
  $("#previousFlashcard").addEventListener("click", function () {
    flashcardIndex = (flashcardIndex + flashcards.length - 1) % flashcards.length;
    paintFlashcard();
  });
  $("#nextFlashcard").addEventListener("click", function () {
    flashcardIndex = (flashcardIndex + 1) % flashcards.length;
    paintFlashcard();
  });
  paintFlashcard();

  /* ---------- Career paths ---------- */
  $("#careersGrid").innerHTML = CAREERS_DATA.map(function (career, i) {
    return '<article class="career-card" style="animation-delay:' + Math.min(i * 45, 360) + 'ms">' +
      '<div class="career-kicker">CAREER PATH ' + String(i + 1).padStart(2, "0") + '</div>' +
      '<h3>' + esc(career.title) + '</h3>' +
      '<div class="career-tools" aria-label="Required tools for ' + esc(career.title) + '">' +
      career.tools.map(function (tool) { return '<span class="tool-badge">' + esc(tool) + '</span>'; }).join("") +
      '</div></article>';
  }).join("");

  /* ---------- Academic modules ---------- */
  $("#modulesGrid").innerHTML = ACADEMIC_MODULES.map(function (module) {
    const experimentLinks = module.experimentIds.map(function (id) {
      const experiment = findExperiment(id);
      if (!experiment) return "";
      return '<a class="module-exp-link" href="experiment.html?id=' + esc(id) + '">Exp ' + esc(padId(id)) + '<span aria-hidden="true">&#8599;</span></a>';
    }).join("");
    return '<article class="module-card">' +
      '<div class="module-badge">Module ' + esc(module.number) + '</div>' +
      '<h3>' + esc(module.title) + '</h3>' +
      '<p class="module-description">' + esc(module.description) + '</p>' +
      '<div class="module-topics" aria-label="Topics covered">' + module.topics.map(function (topic) {
        return '<span class="module-topic">' + esc(topic) + '</span>';
      }).join("") + '</div>' +
      '<div class="module-experiments" aria-label="Experiments in module">' + experimentLinks + '</div>' +
      '</article>';
  }).join("");

  /* ---------- Resources ---------- */
  const RESOURCES = [
    ["Python Documentation", "docs.python.org", "https://docs.python.org/3/"],
    ["NumPy User Guide", "numpy.org", "https://numpy.org/doc/stable/user/"],
    ["Pandas Documentation", "pandas.pydata.org", "https://pandas.pydata.org/docs/"],
    ["Matplotlib Gallery", "matplotlib.org", "https://matplotlib.org/stable/gallery/"],
    ["Seaborn Tutorial", "seaborn.pydata.org", "https://seaborn.pydata.org/tutorial.html"],
    ["scikit-learn User Guide", "scikit-learn.org", "https://scikit-learn.org/stable/user_guide.html"],
    ["Jupyter Notebook", "jupyter.org", "https://jupyter.org/documentation"]
  ];
  $("#resourcesList").innerHTML = RESOURCES.map(function (r) {
    return '<a class="res-card" href="' + r[2] + '" target="_blank" rel="noopener noreferrer"><strong>' + esc(r[0]) + "</strong><span>" + esc(r[1]) + " &#8599;</span></a>";
  }).join("");

  /* ---------- Search ---------- */
  function haystack(exp) {
    const subs = exp.subExperiments.map(function (s) { return s.id + " " + s.name + " " + (s.tools || []).join(" "); }).join(" ");
    return (exp.id + " experiment " + expNumber(exp) + " " + exp.name + " " + exp.description + " " +
            (exp.keywords || []).join(" ") + " " + subs).toLowerCase();
  }
  function matches(exp, query) {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return true;
    const h = haystack(exp);
    return tokens.every(function (t) {
      if (/^\d+$/.test(t)) return parseInt(t, 10) === parseInt(exp.id, 10) || new RegExp("\\b" + t + "\\b").test(exp.name.toLowerCase());
      return h.indexOf(t) !== -1;
    });
  }

  let activeModule = "all";
  const moduleFilters = $("#moduleFilters");
  moduleFilters.innerHTML = '<button class="module-filter is-active" type="button" data-module-filter="all" aria-pressed="true">All experiments</button>' +
    ACADEMIC_MODULES.map(function (module) {
      return '<button class="module-filter" type="button" data-module-filter="' + esc(module.number) + '" aria-pressed="false">Module ' + esc(module.number) + '</button>';
    }).join("");
  moduleFilters.addEventListener("click", function (event) {
    const button = event.target.closest("[data-module-filter]");
    if (!button) return;
    activeModule = button.getAttribute("data-module-filter");
    moduleFilters.querySelectorAll("[data-module-filter]").forEach(function (filter) {
      const selected = filter === button;
      filter.classList.toggle("is-active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    render();
  });

  /* ---------- Cards ---------- */
  function cardHTML(exp, i, animClass) {
    const n = expNumber(exp);
    const pills = exp.subExperiments.map(function (s) {
      return '<a class="pill" href="subexperiment.html?exp=' + exp.id + "&sub=" + s.id + '" title="' + esc(s.name) + '" aria-label="Sub-experiment ' + esc(subLabel(s)) + ": " + esc(s.name) + '">' + esc(s.letter) + "</a>";
    }).join("");
    return '<article class="exp-card ' + animClass + (exp.custom ? " is-custom" : "") + '" style="animation-delay:' + Math.min(i * 70, 560) + 'ms" data-id="' + exp.id + '">' +
      (exp.custom ? '<span class="badge-custom" style="right:56px">CUSTOM</span><button class="icon-del" type="button" data-del="' + exp.id + '" aria-label="Remove experiment ' + esc(exp.id) + '" title="Remove experiment">&#10005;</button>' : "") +
      '<div class="exp-num">EXPERIMENT ' + esc(padId(exp.id)) + "</div>" +
      '<h3 class="exp-title">' + esc(exp.name) + "</h3>" +
      '<p class="exp-desc">' + esc(exp.description) + "</p>" +
      '<div class="sub-label">Sub experiments</div><div class="sub-pills">' + pills + "</div>" +
      '<div class="card-actions">' +
        '<a class="btn btn-primary btn-sm" href="experiment.html?id=' + exp.id + '">View Experiment</a>' +
      "</div></article>";
  }

  let firstRender = true;
  function render() {
    const all = getAllExperiments();
    const q = input.value.trim();
    const module = ACADEMIC_MODULES.find(function (item) { return item.number === activeModule; });
    const list = all.filter(function (e) {
      const inModule = !module || module.experimentIds.indexOf(padId(e.id)) !== -1;
      return inModule && matches(e, q);
    });
    const anim = firstRender ? "" : "filtering";
    grid.innerHTML = list.map(function (e, i) { return cardHTML(e, i, anim); }).join("");
    firstRender = false;
    empty.hidden = list.length > 0;
    grid.hidden = list.length === 0;
    meta.textContent = "Showing " + list.length + " of " + all.length + " experiments" +
      (module ? " in Module " + module.number : "") + (q ? " matching “" + q + "”" : " available");
  }
  input.addEventListener("input", render);
  input.addEventListener("keydown", function (e) { if (e.key === "Escape") { input.value = ""; render(); } });
  render();

  /* remove custom experiments */
  grid.addEventListener("click", function (e) {
    const b = e.target.closest("[data-del]");
    if (!b) return;
    const id = b.getAttribute("data-del");
    if (!window.confirm("Remove experiment " + id + " from this browser?")) return;
    saveCustomExperiments(loadCustomExperiments().filter(function (x) { return x.id !== id; }));
    render();
    toast("Experiment removed");
  });

  /* ---------- Modals ---------- */
  let lastFocus = null;
  function openModal(overlay, focusEl) {
    lastFocus = document.activeElement;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(function () { focusEl.focus(); }, 60);
  }
  function closeModal(overlay) {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.querySelectorAll(".modal-overlay").forEach(function (ov) {
    ov.addEventListener("click", function (e) { if (e.target === ov || e.target.closest("[data-close]")) closeModal(ov); });
    ov.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {  // keep focus inside the dialog
        const f = ov.querySelectorAll("button, input, textarea, a[href]");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") document.querySelectorAll(".modal-overlay.open").forEach(closeModal);
  });

  /* ----- Add experiment ----- */
  const addOverlay = $("#addOverlay"), addForm = $("#addForm");
  $("#addBtn").addEventListener("click", function () {
    addForm.reset();
    addForm.querySelectorAll(".err").forEach(function (x) { x.textContent = ""; });
    const used = getAllExperiments().map(function (e) { return parseInt(e.id, 10); });
    $("#fNumber").value = Math.max.apply(null, used) + 1;
    openModal(addOverlay, $("#fName"));
  });
  function setErr(id, msg) { $(id).textContent = msg || ""; return !!msg; }
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const num = parseInt($("#fNumber").value, 10);
    const name = $("#fName").value.trim();
    const desc = $("#fDesc").value.trim();
    const yt = $("#fYt").value.trim(), gh = $("#fGh").value.trim();
    const subNames = $("#fSubs").value.split(/[\n,]+/).map(function (s) { return s.trim(); }).filter(Boolean);
    const exists = getAllExperiments().some(function (x) { return parseInt(x.id, 10) === num; });
    let bad = false;
    bad = setErr("#eNumber", !num || num < 1 || num > 99 ? "Enter a number between 1 and 99." : exists ? "Experiment " + padId(num) + " already exists." : "") || bad;
    bad = setErr("#eName", name.length < 3 ? "Enter the experiment name." : "") || bad;
    bad = setErr("#eDesc", desc.length < 10 ? "Enter a short description (at least 10 characters)." : "") || bad;
    bad = setErr("#eYt", yt && !/^https?:\/\//i.test(yt) ? "URL must start with http:// or https://" : "") || bad;
    bad = setErr("#eGh", gh && !/^https?:\/\//i.test(gh) ? "URL must start with http:// or https://" : "") || bad;
    bad = setErr("#eSubs", subNames.length > 26 ? "At most 26 sub-experiments are supported." : "") || bad;
    if (bad) return;

    const exp = buildCustomExperiment({ number: num, name: name, description: desc, youtube: yt, github: gh, subNames: subNames });
    const list = loadCustomExperiments();
    list.push(exp);
    if (!saveCustomExperiments(list)) { toast("Could not save: browser storage is unavailable"); return; }
    input.value = "";
    closeModal(addOverlay);
    render();
    toast("Experiment " + exp.id + " added");
    const card = grid.querySelector('[data-id="' + exp.id + '"]');
    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  /* ----- Edit profile ----- */
  const profOverlay = $("#profileOverlay"), profForm = $("#profileForm");
  $("#editProfileBtn").addEventListener("click", function () {
    $("#sName").value = STUDENT.name; $("#sRoll").value = STUDENT.roll;
    $("#sSec").value = STUDENT.sec; $("#sSem").value = STUDENT.sem;
    $("#sBranch").value = STUDENT.branch; $("#sFaculty").value = STUDENT.faculty;
    $("#sDegree").value = STUDENT.degree;
    openModal(profOverlay, $("#sName"));
  });
  profForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const v = {
      name: $("#sName").value.trim() || STUDENT.name, roll: $("#sRoll").value.trim() || STUDENT.roll,
      sec: $("#sSec").value.trim() || STUDENT.sec, sem: $("#sSem").value.trim() || STUDENT.sem,
      branch: $("#sBranch").value.trim() || STUDENT.branch, faculty: $("#sFaculty").value.trim() || STUDENT.faculty,
      degree: $("#sDegree").value.trim() || STUDENT.degree
    };
    Object.assign(STUDENT, v);
    saveStudentProfile();
    paintProfile();
    $("#primaryNavigation").innerHTML = renderNavbar("dashboard");
    closeModal(profOverlay);
    toast("Profile updated");
  });

  /* ---------- Active navigation state on scroll ---------- */
  const keyFor = { dashboard: "dashboard", careers: "careers-overview", modules: "modules-section", experiments: "experiments", resources: "resources" };
  function setActive(key) {
    document.querySelectorAll("#primaryNavigation .nav-link").forEach(function (a) {
      const on = a.getAttribute("data-key") === key;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }
  function onScroll() {
    let cur = "dashboard";
    Object.keys(keyFor).forEach(function (id) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 160) cur = keyFor[id];
    });
    if (cur === "dashboard" && location.hash === "#profile") cur = "profile";
    setActive(cur);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("hashchange", onScroll);
  document.getElementById("primaryNavigation").addEventListener("click", function (e) {
    const a = e.target.closest("a.nav-link");
    if (a && a.getAttribute("href") === "index.html#profile") {
      e.preventDefault();
      document.getElementById("profile").scrollIntoView({ behavior: "smooth", block: "center" });
      setActive("profile");
    }
  });
  onScroll();
})();
