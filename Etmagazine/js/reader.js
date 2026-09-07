(function () {
  const params = new URLSearchParams(location.search);
  const slug = params.get('issue');

  const el = {
    title: document.getElementById('reader-title'),
    book: document.getElementById('book'),
    leafLeft: document.getElementById('leaf-left'),
    leafRight: document.getElementById('leaf-right'),
    imgLeft: document.getElementById('img-left'),
    imgRight: document.getElementById('img-right'),
    prev: document.getElementById('prev'),
    next: document.getElementById('next'),
    count: document.getElementById('count'),
    fullscreen: document.getElementById('fullscreen-toggle'),
  };

  let pages = [];
  let slots = [];
  let singleSlots = [];
  let isSingle = window.matchMedia('(max-width: 860px)').matches;
  let slotIndex = 0;
  let animating = false;

  if (!slug) {
    el.title.textContent = 'no issue specified';
    return;
  }

  fetch('data/issues.json')
    .then((r) => r.json())
    .then((issues) => {
      const issue = issues.find((i) => i.slug === slug);
      if (!issue) {
        el.title.textContent = 'issue not found';
        return;
      }
      el.title.textContent = `${issue.title} · No. ${String(issue.issueNumber).padStart(2, '0')}`;
      document.title = `${issue.title} — ${window.SITE.title}`;
      pages = issue.pages.map((p) => `${issue.pagesPath}/${p}`);
      buildSlots();
      render(true);
    })
    .catch((err) => {
      console.error(err);
      el.title.textContent = "couldn't load issue data";
    });

  function buildSlots() {
    slots = [{ left: null, right: 0 }];
    let i = 1;
    while (i < pages.length) {
      slots.push({ left: i, right: i + 1 < pages.length ? i + 1 : null });
      i += 2;
    }
    singleSlots = pages.map((_, idx) => ({ left: null, right: idx }));
  }

  function activeSlots() {
    return isSingle ? singleSlots : slots;
  }

  function render(instant) {
    const list = activeSlots();
    slotIndex = Math.max(0, Math.min(slotIndex, list.length - 1));
    const slot = list[slotIndex];

    el.book.classList.toggle('single-mode', isSingle);

    setImg(el.imgLeft, slot.left !== null ? pages[slot.left] : null);
    setImg(el.imgRight, slot.right !== null ? pages[slot.right] : null);

    el.prev.disabled = slotIndex === 0;
    el.next.disabled = slotIndex === list.length - 1;

    const shown = [slot.left, slot.right].filter((v) => v !== null);
    const lo = Math.min(...shown) + 1;
    const hi = Math.max(...shown) + 1;
    el.count.textContent = lo === hi ? `${lo} / ${pages.length}` : `${lo}–${hi} / ${pages.length}`;
  }

  function setImg(imgEl, src) {
    if (!src) {
      imgEl.removeAttribute('src');
      imgEl.style.visibility = 'hidden';
    } else {
      imgEl.src = src;
      imgEl.style.visibility = 'visible';
    }
  }

  function go(direction) {
    const list = activeSlots();
    const target = slotIndex + direction;
    if (animating || target < 0 || target > list.length - 1) return;
    animating = true;

    const flipClass = direction > 0 ? 'flip-next' : 'flip-prev';
    el.leafLeft.classList.add(flipClass);
    el.leafRight.classList.add(flipClass);

    setTimeout(() => {
      slotIndex = target;
      render(false);
    }, 350);

    setTimeout(() => {
      el.leafLeft.classList.remove(flipClass);
      el.leafRight.classList.remove(flipClass);
      animating = false;
    }, 700);
  }

  el.next.addEventListener('click', () => go(1));
  el.prev.addEventListener('click', () => go(-1));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });

  window.matchMedia('(max-width: 860px)').addEventListener('change', (e) => {
    const currentRight = activeSlots()[slotIndex].right;
    const currentLeft = activeSlots()[slotIndex].left;
    const anchor = currentRight !== null ? currentRight : currentLeft;
    isSingle = e.matches;
    const list = activeSlots();
    let found = list.findIndex((s) => s.left === anchor || s.right === anchor);
    slotIndex = found === -1 ? 0 : found;
    render(true);
  });

  el.fullscreen.addEventListener('click', (e) => {
    e.preventDefault();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  });
})();
