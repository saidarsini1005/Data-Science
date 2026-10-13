(function () {
  "use strict";

  const $ = function (selector) { return document.querySelector(selector); };
  const overlay = $("#notesOverlay");
  const nativeReader = $("#nativeNotesReader");
  const pdfReader = $("#pdfNotesReader");
  const book = $("#notesBook");
  const spread = $("#notesSpread");
  const scrollPages = $("#notesPagesScroll");
  const thumbnails = $("#notesThumbnails");
  const printPages = $("#notePrintPages");
  let activeModule = null;
  let pages = [];
  let currentSpreadIndex = 0;
  let currentScrollPage = 0;
  let zoom = 1;
  let readerMode = "book";
  let readerSource = "native";
  let flipTimer = null;
  let scrollObserver = null;

  function pageMarkup(page, className) {
    const paragraphs = page.content.split(/\n\n/).map(function (paragraph) {
      const formula = paragraph.indexOf("Key relation: ") === 0;
      const text = formula ? paragraph.slice("Key relation: ".length) : paragraph;
      return '<p' + (formula ? ' class="note-formula"' : "") + '>' + esc(text) + '</p>';
    }).join("");
    return '<article class="note-sheet ' + (className || "") + '" data-page-number="' + page.pageNumber + '">' +
      '<header class="note-page-heading"><span>MBU // DATA SCIENCE LAB</span><span>MODULE ' + esc(activeModule.number) + '</span></header>' +
      '<h4>' + esc(page.title) + '</h4>' +
      '<div class="note-copy">' + paragraphs + '</div>' +
      '<section class="note-code"><h5>PYTHON // WORKED EXAMPLE</h5><pre><code>' + esc(page.codeSnippet) + '</code></pre>' +
      '<p class="note-output"><strong>Output preview</strong><br>' + esc(page.outputPreview) + '</p></section>' +
      '<aside class="note-hawkins"><strong>HAWKINS FIELD TIP</strong><p>' + esc(page.hawkinsTip) + '</p></aside>' +
      '<footer class="note-page-footer"><span>CLASSIFIED FIELD NOTES</span><span>' + page.pageNumber + '</span></footer>' +
      '</article>';
  }

  function renderBook() {
    const leftIndex = currentSpreadIndex * 2;
    const left = pages[leftIndex];
    const right = pages[leftIndex + 1];
    spread.innerHTML = pageMarkup(left, "book-page book-page-left") +
      (right ? pageMarkup(right, "book-page book-page-right") : '<div class="note-sheet book-page book-page-right book-page-blank" aria-hidden="true"><span>END OF FILE</span></div>');
    const lastPageNumber = right ? right.pageNumber : left.pageNumber;
    $("#bookPageCount").textContent = "Page " + left.pageNumber + "-" + lastPageNumber + " of " + pages.length;
    $("#spreadCount").textContent = "Spread " + (currentSpreadIndex + 1) + " of " + Math.ceil(pages.length / 2);
    const previous = overlay.querySelector('[data-page-step="-1"]');
    const next = overlay.querySelector('[data-page-step="1"]');
    previous.disabled = currentSpreadIndex === 0;
    next.disabled = (currentSpreadIndex + 1) * 2 >= pages.length;
  }

  function updateActiveThumbnail(pageNumber) {
    currentScrollPage = Math.max(0, Math.min(pages.length - 1, pageNumber - 1));
    thumbnails.querySelectorAll("[data-thumbnail-page]").forEach(function (button) {
      const active = Number(button.getAttribute("data-thumbnail-page")) === currentScrollPage + 1;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "page" : "false");
    });
  }

  function renderScroll() {
    scrollPages.innerHTML = pages.map(function (page) {
      return pageMarkup(page, "scroll-note-page");
    }).join("");
    thumbnails.innerHTML = pages.map(function (page) {
      return '<button class="notes-thumbnail" type="button" data-thumbnail-page="' + page.pageNumber + '">' +
        '<span class="thumbnail-number">' + String(page.pageNumber).padStart(2, "0") + '</span>' +
        '<span>' + esc(page.title) + '</span></button>';
    }).join("");
    scrollPages.style.setProperty("--notes-zoom", String(zoom));
    $("#zoomLevel").textContent = Math.round(zoom * 100) + "%";
    if (scrollObserver) scrollObserver.disconnect();
    if ("IntersectionObserver" in window) {
      scrollObserver = new IntersectionObserver(function (entries) {
        const visible = entries.filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
        if (visible) updateActiveThumbnail(Number(visible.target.getAttribute("data-page-number")));
      }, { root: scrollPages, threshold: [0.2, 0.5, 0.75] });
      scrollPages.querySelectorAll(".scroll-note-page").forEach(function (page) { scrollObserver.observe(page); });
    }
    updateActiveThumbnail(1);
  }

  function renderPrintPages() {
    printPages.innerHTML = pages.map(function (page) {
      return pageMarkup(page, "print-note-page");
    }).join("");
  }

  function setMode(mode) {
    readerMode = mode;
    $("#bookView").hidden = mode !== "book";
    $("#scrollView").hidden = mode !== "scroll";
    overlay.querySelectorAll("[data-reader-mode]").forEach(function (button) {
      const selected = button.getAttribute("data-reader-mode") === mode;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function setSource(source) {
    readerSource = source;
    nativeReader.hidden = source !== "native";
    pdfReader.hidden = source !== "pdf";
    overlay.querySelectorAll("[data-reader-source]").forEach(function (button) {
      const selected = button.getAttribute("data-reader-source") === source;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    if (source === "pdf" && activeModule) {
      const path = "assets/docs/module-" + activeModule.number + ".pdf";
      $("#notesPdfFrame").src = path;
      $("#pdfPathHint").textContent = "Offline PDF path: " + path + ". Place the module PDF at this path to view it here. Native notes are available from the Native Notes control.";
    }
  }

  function moveSpread(amount) {
    const totalSpreads = Math.ceil(pages.length / 2);
    const target = Math.max(0, Math.min(totalSpreads - 1, currentSpreadIndex + amount));
    if (target === currentSpreadIndex || book.classList.contains("is-turning")) return;
    book.dataset.direction = amount > 0 ? "next" : "previous";
    book.classList.add("is-turning");
    window.clearTimeout(flipTimer);
    flipTimer = window.setTimeout(function () {
      currentSpreadIndex = target;
      renderBook();
      book.classList.remove("is-turning");
    }, 360);
  }

  function openNotes(moduleNumber, trigger) {
    activeModule = ACADEMIC_MODULES.find(function (module) { return module.number === moduleNumber; });
    pages = NOTES_DATA[moduleNumber] || [];
    if (!activeModule || pages.length < 15) {
      $("#notesReaderError").hidden = false;
      $("#notesReaderError").textContent = "Notes are not available for this module yet.";
      return;
    }
    $("#notesReaderError").hidden = true;
    $("#notesTitle").textContent = "Module " + activeModule.number + " — " + activeModule.title;
    $("#notesSubtitle").textContent = activeModule.description + " · " + pages.length + " illustrated field-note pages";
    window.clearTimeout(flipTimer);
    currentSpreadIndex = 0;
    currentScrollPage = 0;
    zoom = 1;
    readerMode = "book";
    readerSource = "native";
    book.classList.remove("is-turning");
    delete book.dataset.direction;
    renderBook();
    renderScroll();
    renderPrintPages();
    setMode("book");
    setSource("native");
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    overlay.dataset.returnFocus = trigger ? "module" : "";
    $("#closeNotesReader").focus();
  }

  function closeNotes() {
    window.clearTimeout(flipTimer);
    book.classList.remove("is-turning");
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (scrollObserver) scrollObserver.disconnect();
    if (overlay.dataset.returnFocus) {
      const trigger = document.querySelector('[data-open-notes="' + activeModule.number + '"]');
      if (trigger) trigger.focus();
    }
  }

  $("#modulesGrid").addEventListener("click", function (event) {
    const button = event.target.closest("[data-open-notes]");
    if (button) openNotes(button.getAttribute("data-open-notes"), button);
  });

  overlay.querySelectorAll("[data-reader-mode]").forEach(function (button) {
    button.addEventListener("click", function () { setMode(button.getAttribute("data-reader-mode")); });
  });
  overlay.querySelectorAll("[data-reader-source]").forEach(function (button) {
    button.addEventListener("click", function () { setSource(button.getAttribute("data-reader-source")); });
  });
  overlay.querySelectorAll("[data-page-step]").forEach(function (button) {
    button.addEventListener("click", function () { moveSpread(Number(button.getAttribute("data-page-step"))); });
  });
  thumbnails.addEventListener("click", function (event) {
    const button = event.target.closest("[data-thumbnail-page]");
    if (!button) return;
    const pageNumber = Number(button.getAttribute("data-thumbnail-page"));
    const page = scrollPages.querySelector('[data-page-number="' + pageNumber + '"]');
    if (page) {
      updateActiveThumbnail(pageNumber);
      page.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  overlay.querySelectorAll("[data-zoom]").forEach(function (button) {
    button.addEventListener("click", function () {
      zoom = Math.max(0.7, Math.min(1.3, zoom + Number(button.getAttribute("data-zoom"))));
      scrollPages.style.setProperty("--notes-zoom", String(zoom));
      $("#zoomLevel").textContent = Math.round(zoom * 100) + "%";
    });
  });
  $("#downloadNotesPdf").addEventListener("click", function () {
    document.body.classList.add("printing-notes");
    window.print();
  });
  $("#closeNotesReader").addEventListener("click", closeNotes);
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) closeNotes();
  });
  document.addEventListener("keydown", function (event) {
    if (!overlay.classList.contains("open")) return;
    if (event.key === "Escape") {
      closeNotes();
      return;
    }
    if (event.key === "Tab") {
      const focusable = Array.from(overlay.querySelectorAll("button:not(:disabled), iframe"))
        .filter(function (element) { return element.getClientRects().length > 0; });
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (readerSource !== "native" || ["INPUT", "TEXTAREA", "SELECT"].indexOf(document.activeElement.tagName) !== -1) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (readerMode === "book") moveSpread(1);
      else if (currentScrollPage < pages.length - 1) {
        const nextPage = currentScrollPage + 2;
        const target = scrollPages.querySelector('[data-page-number="' + nextPage + '"]');
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (readerMode === "book") moveSpread(-1);
      else if (currentScrollPage > 0) {
        const previous = scrollPages.querySelector('[data-page-number="' + currentScrollPage + '"]');
        if (previous) previous.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
  window.addEventListener("afterprint", function () {
    document.body.classList.remove("printing-notes");
  });
}());
