(function () {
  const TYPE_LABELS = {
    "journal-article": "Journal Articles",
    "dissertation-thesis": "Thesis &amp; Dissertation",
    "conference-paper": "Conference Proceedings",
    "preprint": "Preprints",
    "other": "Other"
  };

  const TYPE_ORDER = [
    "journal-article",
    "dissertation-thesis",
    "conference-paper",
    "preprint",
    "other"
  ];

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function render(publications) {
    const root = document.getElementById("publications");
    if (!publications || !publications.length) {
      root.innerHTML = '<p class="pub-error">No publications found.</p>';
      return;
    }

    const byType = {};
    publications.forEach(function (pub) {
      const type = TYPE_LABELS[pub.type] ? pub.type : "other";
      (byType[type] = byType[type] || []).push(pub);
    });

    let html = "";
    TYPE_ORDER.forEach(function (type) {
      const entries = byType[type];
      if (!entries || !entries.length) return;
      entries.sort(function (a, b) { return (b.year || 0) - (a.year || 0); });

      html += '<div class="pub-group"><h3>' + TYPE_LABELS[type] + "</h3>";
      entries.forEach(function (pub) {
        const title = escapeHtml(pub.title);
        const titleHtml = pub.url
          ? '<a href="' + escapeHtml(pub.url) + '" target="_blank" rel="noopener">' + title + "</a>"
          : title;
        const meta = [pub.year, pub.venue].filter(Boolean).map(escapeHtml).join(" · ");
        html += '<div class="pub-entry">' +
          '<p class="pub-title">' + titleHtml + "</p>" +
          '<p class="pub-meta">' + meta + "</p>" +
          "</div>";
      });
      html += "</div>";
    });

    root.innerHTML = html;
  }

  fetch("/data/publications.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Failed to load publications");
      return res.json();
    })
    .then(render)
    .catch(function () {
      document.getElementById("publications").innerHTML =
        '<p class="pub-error">Couldn\'t load publications right now. See ' +
        '<a href="https://scholar.google.com/citations?user=ON5nvBkAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a> instead.</p>';
    });
})();
