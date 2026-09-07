(function () {
  document.getElementById('site-title').textContent = window.SITE.title;
  document.getElementById('site-tagline').textContent = window.SITE.tagline;
  document.title = window.SITE.title + ' — ' + window.SITE.tagline;

  fetch('data/issues.json')
    .then((r) => {
      if (!r.ok) throw new Error('issues.json not found');
      return r.json();
    })
    .then(renderIssues)
    .catch((err) => {
      console.error(err);
      document.getElementById('empty').hidden = false;
      document.getElementById('empty').textContent =
        "Couldn't load data/issues.json. If you're viewing this file directly (file://), " +
        'serve it over http instead — see README.md.';
    });

  const MONTHS = ['january','february','march','april','may','june','july',
    'august','september','october','november','december'];

  function renderIssues(issues) {
    const container = document.getElementById('editions');
    const empty = document.getElementById('empty');

    if (!issues.length) {
      empty.hidden = false;
      return;
    }

    issues.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      const am = MONTHS.indexOf(a.month.toLowerCase());
      const bm = MONTHS.indexOf(b.month.toLowerCase());
      if (bm !== am) return bm - am;
      return b.issueNumber - a.issueNumber;
    });

    const byYear = new Map();
    issues.forEach((issue) => {
      if (!byYear.has(issue.year)) byYear.set(issue.year, []);
      byYear.get(issue.year).push(issue);
    });

    byYear.forEach((yearIssues, year) => {
      const group = document.createElement('div');
      group.className = 'year-group';

      const label = document.createElement('span');
      label.className = 'year-label mono';
      label.textContent = year;
      group.appendChild(label);

      yearIssues.forEach((issue) => {
        const a = document.createElement('a');
        a.className = 'edition';
        a.href = `reader.html?issue=${encodeURIComponent(issue.slug)}`;
        a.innerHTML = `
          <div class="stamp">
            <img src="${issue.pagesPath}/${issue.cover}" alt="" loading="lazy">
          </div>
          <div class="info">
            <span class="date mono">${issue.month.toUpperCase()} ${issue.year}</span>
            <h3>${issue.title}</h3>
          </div>
          <div class="stub">
            <span class="num">ISSUE<b>${String(issue.issueNumber).padStart(2, '0')}</b></span>
            <span class="arrow">READ →</span>
          </div>`;
        group.appendChild(a);
      });

      container.appendChild(group);
    });
  }
})();
