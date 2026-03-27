/* ============================================================
   LEFAUVES — script.js
============================================================ */

/* ── Scroll: nav ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Nav toggle (mobile) ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Reveal on scroll ── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => revealObserver.observe(el));

/* ── Feed data
   Replace or extend with real Instagram post URLs + captions.
   To auto-update: integrate SnapWidget (see index.html comments).
──────────────────────────────────────────────────────────────── */
const feedPosts = [
  {
    caption: 'The mask we wear becomes the face we keep.',
    color1: '#1a0a0a', color2: '#3d0800',
    label: 'A Loss of Innocence',
    url: 'https://www.instagram.com/lefauves/'
  },
  {
    caption: 'Soul on wood — every layer a confession.',
    color1: '#0a0a1a', color2: '#001a3d',
    label: 'MI ME',
    url: 'https://www.instagram.com/lefauves/'
  },
  {
    caption: 'Pop dissolves. The soul remains.',
    color1: '#1a1a00', color2: '#3d3800',
    label: 'The Mickey Me Collection',
    url: 'https://www.instagram.com/lefauves/'
  },
  {
    caption: 'Alts Iz Farloyrn — all is lost, all is found.',
    color1: '#0a1a0a', color2: '#003d10',
    label: 'Alts Iz Farloyrn',
    url: 'https://www.instagram.com/lefauves/'
  },
  {
    caption: 'Identity fractures under the weight of the icon.',
    color1: '#1a001a', color2: '#2d003d',
    label: 'MI ME',
    url: 'https://www.instagram.com/lefauves/'
  },
  {
    caption: 'Duality is not a flaw — it is the architecture.',
    color1: '#1a0a00', color2: '#3d1a00',
    label: 'Solo Works',
    url: 'https://www.instagram.com/lefauves/'
  },
  {
    caption: 'Mickey smiles. The painter weeps.',
    color1: '#00101a', color2: '#00253d',
    label: 'The Mickey Me Collection',
    url: 'https://www.instagram.com/lefauves/'
  },
  {
    caption: 'The soul dives. It does not surface the same.',
    color1: '#1a1a1a', color2: '#2d0505',
    label: 'A Loss of Innocence',
    url: 'https://www.instagram.com/lefauves/'
  },
];

/* ── Build feed ── */
const feedTrack = document.getElementById('feedTrack');
feedPosts.forEach(post => {
  const item = document.createElement('a');
  item.className = 'feed-item';
  item.href = post.url;
  item.target = '_blank';
  item.rel = 'noopener noreferrer';
  item.innerHTML = `
    <div class="feed-placeholder-bg" style="--bg1:${post.color1}; --bg2:${post.color2};"></div>
    <div class="feed-placeholder">${post.label}</div>
    <div class="feed-item-overlay">
      <p class="feed-item-caption">${post.caption}</p>
    </div>
  `;
  feedTrack.appendChild(item);
});

/* ── Feed carousel ── */
let feedIndex = 0;
const feedPrev = document.getElementById('feedPrev');
const feedNext = document.getElementById('feedNext');
const itemWidth = 280 + 16; // width + gap

function updateFeedPosition() {
  feedTrack.style.transform = `translateX(-${feedIndex * itemWidth}px)`;
}
feedNext.addEventListener('click', () => {
  const max = feedPosts.length - Math.floor(feedTrack.parentElement.offsetWidth / itemWidth);
  if (feedIndex < max) { feedIndex++; updateFeedPosition(); }
});
feedPrev.addEventListener('click', () => {
  if (feedIndex > 0) { feedIndex--; updateFeedPosition(); }
});

/* Drag to scroll */
let isDragging = false, startX = 0, startIndex = 0;
feedTrack.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  startIndex = feedIndex;
  feedTrack.style.transition = 'none';
});
window.addEventListener('mouseup', e => {
  if (!isDragging) return;
  isDragging = false;
  feedTrack.style.transition = '';
  const delta = startX - e.clientX;
  const steps = Math.round(delta / itemWidth);
  feedIndex = Math.max(0, Math.min(startIndex + steps, feedPosts.length - 1));
  updateFeedPosition();
});
window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const delta = startX - e.clientX;
  feedTrack.style.transform = `translateX(-${startIndex * itemWidth + delta}px)`;
});

/* ── Gallery data ── */
const artworks = [
  { title: 'Did Dare',              series: 'solo',             year: '2021', color1: '#1a0000', color2: '#4d0000' },
  { title: 'Future in the Past',    series: 'mi-me',            year: '2021', color1: '#000d1a', color2: '#001a4d' },
  { title: 'Lost N Found',          series: 'alts',             year: '2020', color1: '#001a00', color2: '#00400a' },
  { title: 'Mind Abyss',            series: 'mi-me',            year: '2022', color1: '#0d001a', color2: '#1a004d' },
  { title: 'Mountain Live',         series: 'solo',             year: '2021', color1: '#1a1000', color2: '#4d3000' },
  { title: 'No Bat Can Bite',       series: 'loss-of-innocence',year: '2020', color1: '#1a0a00', color2: '#5c1a00' },
  { title: 'Soul Found Spirit',     series: 'alts',             year: '2020', color1: '#001010', color2: '#003333' },
  { title: 'Soul on Wood',          series: 'solo',             year: '2022', color1: '#100010', color2: '#330033' },
  { title: 'Bob Paint',             series: 'mickey-me',        year: '2019', color1: '#001000', color2: '#003d10' },
  { title: 'We Wait',               series: 'loss-of-innocence',year: '2020', color1: '#1a1a00', color2: '#4d4d00' },
  { title: 'Elmo\'s Luer',          series: 'mickey-me',        year: '2019', color1: '#1a0000', color2: '#660000' },
  { title: 'James Warhol',          series: 'mickey-me',        year: '2018', color1: '#000d1a', color2: '#00204d' },
  { title: 'Psychosis',             series: 'mi-me',            year: '2021', color1: '#0d0d00', color2: '#3d3d00' },
  { title: 'Art is Not a Thing',    series: 'solo',             year: '2022', color1: '#00101a', color2: '#002633' },
  { title: 'The Punto',             series: 'alts',             year: '2017', color1: '#1a0010', color2: '#4d0033' },
  { title: 'Tiger in a House',      series: 'loss-of-innocence',year: '2018', color1: '#0a1a00', color2: '#1a4d00' },
  { title: 'Foundacoin of Paper',   series: 'solo',             year: '2022', color1: '#1a1000', color2: '#663300' },
  { title: 'Wait on Flow',          series: 'mi-me',            year: '2021', color1: '#00001a', color2: '#0000660' },
];

/* Build gallery */
const galleryGrid = document.getElementById('galleryGrid');
const ITEMS_PER_PAGE = 9;
let visibleCount = ITEMS_PER_PAGE;

function buildGallery(filter, count) {
  const filtered = filter === 'all' ? artworks : artworks.filter(a => a.series === filter);
  galleryGrid.innerHTML = '';
  const toShow = filtered.slice(0, count);
  toShow.forEach(art => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.series = art.series;
    item.innerHTML = `
      <div class="gallery-item-inner">
        <div class="gallery-bg" style="background: linear-gradient(135deg, ${art.color1}, ${art.color2});"></div>
        <div class="gallery-overlay">
          <div class="gallery-info">
            <div class="gallery-title">${art.title}</div>
            <div class="gallery-meta">${seriesLabel(art.series)} · ${art.year}</div>
          </div>
        </div>
      </div>
    `;
    galleryGrid.appendChild(item);
  });

  const loadMoreBtn = document.getElementById('loadMore');
  if (filtered.length <= count) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = '';
  }
}

function seriesLabel(key) {
  const map = {
    'loss-of-innocence': 'A Loss of Innocence',
    'mickey-me':         'The Mickey Me Collection',
    'mi-me':             'MI ME',
    'alts':              'Alts Iz Farloyrn',
    'solo':              'Solo Works',
  };
  return map[key] || key;
}

/* Filter buttons */
let activeFilter = 'all';
document.getElementById('galleryFilters').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  visibleCount = ITEMS_PER_PAGE;
  buildGallery(activeFilter, visibleCount);
});

/* Load more */
document.getElementById('loadMore').addEventListener('click', () => {
  visibleCount += ITEMS_PER_PAGE;
  buildGallery(activeFilter, visibleCount);
});

buildGallery('all', visibleCount);

/* ── Contact form ── */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const formData = new FormData(contactForm);
  const action = contactForm.action;

  // If using Formspree
  if (action.includes('formspree.io') && !action.includes('YOUR_FORM_ID')) {
    try {
      const res = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.textContent = 'Message sent ✓';
        contactForm.reset();
        setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 4000);
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = 'Error — try again';
      btn.disabled = false;
      setTimeout(() => { btn.textContent = original; }, 3000);
    }
  } else {
    // Fallback: open mailto
    const name    = formData.get('name') || '';
    const email   = formData.get('email') || '';
    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterest: ${formData.get('interest') || ''}\n\n${formData.get('message') || ''}`
    );
    window.location.href = `mailto:soul@lefauves.com?subject=${subject}&body=${body}`;
    btn.textContent = original;
    btn.disabled = false;
  }
});
