(function () {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  const el = {
    title: document.getElementById('f-title'),
    number: document.getElementById('f-number'),
    month: document.getElementById('f-month'),
    year: document.getElementById('f-year'),
    slug: document.getElementById('f-slug'),
    dropzone: document.getElementById('dropzone'),
    dzLabel: document.getElementById('dz-label'),
    fileInput: document.getElementById('file-input'),
    progressWrap: document.getElementById('progress-wrap'),
    progressBar: document.getElementById('progress-bar'),
    progressLabel: document.getElementById('progress-label'),
    previewStep: document.getElementById('preview-step'),
    thumbs: document.getElementById('thumbs'),
    packageStep: document.getElementById('package-step'),
    downloadZip: document.getElementById('download-zip'),
    snippet: document.getElementById('snippet'),
    copySnippet: document.getElementById('copy-snippet'),
    gitcmds: document.getElementById('gitcmds'),
  };

  let slugTouched = false;
  let pageFiles = []; // { filename, dataUrl }

  el.slug.addEventListener('input', () => (slugTouched = true));
  el.title.addEventListener('input', () => {
    if (!slugTouched) el.slug.value = slugify(el.title.value);
  });

  function slugify(s) {
    return s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Dropzone wiring
  el.dropzone.addEventListener('click', () => el.fileInput.click());
  el.fileInput.addEventListener('change', () => {
    if (el.fileInput.files[0]) handleFile(el.fileInput.files[0]);
  });
  ['dragenter', 'dragover'].forEach((evt) =>
    el.dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      el.dropzone.classList.add('drag');
    })
  );
  ['dragleave', 'drop'].forEach((evt) =>
    el.dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      el.dropzone.classList.remove('drag');
    })
  );
  el.dropzone.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  async function handleFile(file) {
    if (file.type !== 'application/pdf') {
      alert('Please choose a PDF file.');
      return;
    }
    el.dzLabel.textContent = file.name;
    el.progressWrap.hidden = false;
    el.thumbs.innerHTML = '';
    pageFiles = [];

    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    const total = pdf.numPages;
    const pad = String(total).length < 3 ? 3 : String(total).length;

    for (let i = 1; i <= total; i++) {
      el.progressLabel.textContent = `Rendering page ${i} of ${total}…`;
      el.progressBar.style.width = `${((i - 1) / total) * 100}%`;

      const page = await pdf.getPage(i);
      const baseViewport = page.getViewport({ scale: 1 });
      const targetWidth = 1400;
      const scale = targetWidth / baseViewport.width;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;

      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      const filename = `page-${String(i).padStart(pad, '0')}.jpg`;
      pageFiles.push({ filename, dataUrl });

      const thumb = document.createElement('img');
      thumb.src = dataUrl;
      el.thumbs.appendChild(thumb);
    }

    el.progressBar.style.width = '100%';
    el.progressLabel.textContent = `Done — ${total} pages rendered.`;
    el.previewStep.hidden = false;
    el.packageStep.hidden = false;
    buildOutputs();
  }

  function buildOutputs() {
    const slug = el.slug.value.trim() || 'untitled-issue';
    const title = el.title.value.trim() || 'Untitled issue';
    const number = parseInt(el.number.value, 10) || 1;
    const month = el.month.value.trim() || 'Month';
    const year = parseInt(el.year.value, 10) || new Date().getFullYear();

    const manifest = {
      slug,
      title,
      issueNumber: number,
      month,
      year,
      pagesPath: `magazines/${slug}`,
      cover: pageFiles[0].filename,
      pages: pageFiles.map((p) => p.filename),
    };

    el.snippet.textContent = JSON.stringify(manifest, null, 2) + ',';
    el.gitcmds.textContent =
      `mkdir -p magazines/${slug}\n` +
      `unzip ~/Downloads/${slug}.zip -d magazines/${slug}\n` +
      `# open data/issues.json, paste in the snippet above as a new array entry\n` +
      `git add magazines/${slug} data/issues.json\n` +
      `git commit -m "Add issue: ${title}"\n` +
      `git push`;
  }

  el.downloadZip.addEventListener('click', async () => {
    const slug = el.slug.value.trim() || 'untitled-issue';
    const zip = new JSZip();
    pageFiles.forEach((p) => {
      zip.file(p.filename, p.dataUrl.split(',')[1], { base64: true });
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${slug}.zip`;
    a.click();
  });

  el.copySnippet.addEventListener('click', () => {
    navigator.clipboard.writeText(el.snippet.textContent).then(() => {
      el.copySnippet.textContent = 'Copied ✓';
      setTimeout(() => (el.copySnippet.textContent = 'Copy snippet'), 1500);
    });
  });

  // Rebuild the snippet live if details change after processing
  [el.title, el.number, el.month, el.year, el.slug].forEach((input) =>
    input.addEventListener('input', () => {
      if (pageFiles.length) buildOutputs();
    })
  );
})();
