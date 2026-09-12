/* ============================================================
   Himanshu Dev — Portfolio
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMBER = '918755017490';
  var EMAIL = 'drajputhimanshu704@gmail.com';

  /* ---------- Year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Scroll progress ---------- */
  var bar = document.getElementById('progress');
  var nav = document.getElementById('nav');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var st = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('stuck', st > 24);
    if (toTop) toTop.classList.toggle('show', st > 520);
    spy(st);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Scroll spy ---------- */
  var sections = [].slice.call(document.querySelectorAll('section[id]'));
  var links = [].slice.call(document.querySelectorAll('.nav-links a'));

  function spy(st) {
    var cur = '';
    for (var i = 0; i < sections.length; i++) {
      if (st >= sections[i].offsetTop - 140) cur = sections[i].id;
    }
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  }

  /* ---------- Typing effect ---------- */
  var typed = document.getElementById('typed');
  if (typed) {
    var roles = [
      'Python & Django Developer',
      'WordPress Developer',
      'REST API Builder',
      'Full-Stack Web Developer',
      '3+ Years · 20+ Live Websites'
    ];
    var cursor = typed.querySelector('.cursor');
    var ri = 0, ci = 0, deleting = false;

    function tick() {
      var word = roles[ri];
      ci = deleting ? ci - 1 : ci + 1;
      var txt = word.substring(0, ci);
      typed.textContent = txt;
      if (cursor) typed.appendChild(cursor);

      var delay = deleting ? 38 : 74;
      if (!deleting && ci === word.length) { delay = 1700; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 320; }
      setTimeout(tick, delay);
    }
    setTimeout(tick, 500);
  }

  /* ---------- Marquee ---------- */
  var marquee = document.getElementById('marquee');
  if (marquee) {
    var stack = ['Python', 'Django', 'Django REST Framework', 'REST APIs', 'MySQL', 'SQL', 'OOP',
      'WordPress', 'PHP', 'Custom Themes', 'Plugin Development', 'Elementor', 'WooCommerce',
      'HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'Responsive Design',
      'Git & GitHub', 'Postman', 'SEO', 'Core Web Vitals', 'Agile', 'Pandas'];
    var html = stack.map(function (s) { return '<span class="marquee-item">' + s + '</span>'; }).join('');
    marquee.innerHTML = html + html; // duplicate for seamless loop
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = [].slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Animated counters ---------- */
  var counters = [].slice.call(document.querySelectorAll('[data-count]'));
  function runCounters() {
    counters.forEach(function (el) {
      if (el.dataset.done) return;
      var rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight - 60) return;
      el.dataset.done = '1';
      var target = parseInt(el.dataset.count, 10);
      var suffix = el.dataset.suffix || '';
      var n = 0;
      var step = Math.max(1, Math.round(target / 28));
      var t = setInterval(function () {
        n += step;
        if (n >= target) { n = target; clearInterval(t); }
        el.textContent = n + suffix;
      }, 38);
    });
  }
  window.addEventListener('scroll', runCounters, { passive: true });

  /* ---------- Skill bars ---------- */
  var bars = [].slice.call(document.querySelectorAll('.bar i'));
  function fillBars() {
    bars.forEach(function (b) {
      var rect = b.getBoundingClientRect();
      if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
        b.style.width = (b.dataset.w || 70) + '%';
      }
    });
  }
  window.addEventListener('scroll', fillBars, { passive: true });

  /* ---------- Skill tabs ---------- */
  var tabs = [].slice.call(document.querySelectorAll('.skill-tab'));
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      [].slice.call(document.querySelectorAll('.skill-panel')).forEach(function (p) {
        p.classList.remove('active');
      });
      var panel = document.getElementById('panel-' + tab.dataset.panel);
      if (panel) {
        panel.classList.add('active');
        // re-run bar fill for newly visible panel
        setTimeout(fillBars, 60);
      }
    });
  });

  /* ---------- Client work data ---------- */
  var WORK = [
    { n: 'Pariva Health', u: 'https://www.parivahealth.com/', c: 'healthcare', d: 'Healthcare platform — custom WordPress theme, custom post types, contact forms and technical SEO for page speed and search visibility.' },
    { n: 'Anil Baghi Hospital', u: 'https://www.anilbaghihospital.com/', c: 'healthcare', d: 'Hospital website with department and doctor listings, appointment enquiry forms and responsive layout.' },
    { n: 'PainFlame', u: 'https://www.painflame.com/', c: 'healthcare', d: 'Ayurvedic & physiotherapy brand site — service pages for physiotherapy, chiropractic and laser therapy with enquiry flow.' },
    { n: "Mom's Belief", u: 'https://www.momsbelief.com/', c: 'healthcare', d: 'Parenting & mental-health platform — front-end and back-end work on programs, clinical services and a SEO-optimised content hub.' },
    { n: 'Corporate Valuations', u: 'https://www.corporatevaluations.in/', c: 'finance', d: 'Financial advisory firm site — service architecture, insights section and lead-capture integration.' },
    { n: 'Eisen Investments', u: 'https://www.eiseninvestments.com/', c: 'finance', d: 'Investment firm website with a clean corporate layout and responsive, cross-browser build.' },
    { n: 'Webority Technologies', u: 'https://www.webority.com/', c: 'technology', d: 'Company website — custom theme, services and portfolio modules, performance and SEO optimisation.' },
    { n: 'Cloudverse.ai', u: 'https://www.cloudverse.ai/', c: 'technology', d: 'AI/cloud product site — modern layout, animation work and optimised asset delivery.' },
    { n: 'Treacle Tech', u: 'https://www.treacletech.com/', c: 'technology', d: 'Technology services website with custom sections, responsive design and on-page SEO.' },
    { n: 'Abaca Tech', u: 'https://www.abacatech.com/', c: 'technology', d: 'IT services site — custom WordPress build with service and case-study templates.' },
    { n: 'Intuicent Innovations', u: 'https://www.intuicentinnovations.com/', c: 'technology', d: 'Innovation and consulting website with custom theme development and content structure.' },
    { n: 'Cyson', u: 'https://www.cyson.in/', c: 'technology', d: 'Technology brand website — responsive build, custom sections and speed optimisation.' },
    { n: 'Outsourzr', u: 'https://www.outsourzr.com/', c: 'technology', d: 'Outsourcing services platform with service pages, enquiry forms and SEO setup.' },
    { n: 'OfficeDel', u: 'https://officedel.com/', c: 'technology', d: 'Office solutions website — catalogue-style layout with responsive design.' },
    { n: 'Galapegasus', u: 'https://www.galapegasus.com/', c: 'technology', d: 'Corporate website with custom WordPress theme and cross-device optimisation.' },
    { n: 'Hindu College Perfumery', u: 'https://www.hinducollegeperfumery.org/', c: 'education', d: 'Institutional website — course and department pages, admissions enquiry and accessible structure.' },
    { n: 'AstroGuru Saurabh', u: 'https://www.astrogurusauraabh.com/', c: 'lifestyle', d: 'Astrology & consultation portal — built the full front-end, services showcase, testimonials and a consultation booking flow.' },
    { n: 'DiWhyNot', u: 'https://www.diwhynot.in/', c: 'lifestyle', d: 'Lifestyle brand website with custom design, responsive layout and content management setup.' },
    { n: 'PNF Events', u: 'https://www.pnfevents.in/', c: 'lifestyle', d: 'Event management website — gallery, services and enquiry forms with a mobile-first build.' },
    { n: 'House Affair', u: 'https://www.houseaffair.in/', c: 'lifestyle', d: 'Interior & home brand site — visual-led layout, image optimisation and responsive design.' }
  ];

  var CAT_LABEL = {
    healthcare: 'Healthcare', finance: 'Finance', technology: 'Technology',
    lifestyle: 'Lifestyle', education: 'Education'
  };

  var grid = document.getElementById('workGrid');
  if (grid) {
    grid.innerHTML = WORK.map(function (w) {
      var host = w.u.replace(/^https?:\/\//, '').replace(/\/$/, '');
      return '' +
        '<a class="work-card" data-cat="' + w.c + '" href="' + w.u + '" target="_blank" rel="noopener" title="Open ' + host + '">' +
          '<div class="work-top">' +
            '<span class="work-cat">' + CAT_LABEL[w.c] + '</span>' +
            '<svg class="work-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>' +
          '</div>' +
          '<div class="work-name">' + w.n + '</div>' +
          '<div class="work-desc">' + w.d + '</div>' +
        '</a>';
    }).join('');

    // counts
    var counts = { all: WORK.length };
    WORK.forEach(function (w) { counts[w.c] = (counts[w.c] || 0) + 1; });
    Object.keys(counts).forEach(function (k) {
      var el = document.getElementById('c' + k.charAt(0).toUpperCase() + k.slice(1));
      if (el) el.textContent = counts[k];
    });

    // filters
    var filterBtns = [].slice.call(document.querySelectorAll('.filter'));
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.dataset.f;
        [].slice.call(grid.children).forEach(function (card) {
          card.classList.toggle('hidden', f !== 'all' && card.dataset.cat !== f);
        });
      });
    });
  }

  /* ---------- Card spotlight ---------- */
  [].slice.call(document.querySelectorAll('.tilt')).forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  /* ---------- Contact form → WhatsApp ---------- */
  var form = document.getElementById('waForm');

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function validate() {
    var ok = true;
    [['f-name', 'name'], ['f-company', 'company'], ['f-msg', 'message']].forEach(function (pair) {
      var el = document.getElementById(pair[0]);
      var field = el.closest('.field');
      if (!el.value.trim()) { field.classList.add('invalid'); ok = false; }
      else { field.classList.remove('invalid'); }
    });
    return ok;
  }

  function buildMessage() {
    var lines = [
      'Hi Himanshu, I found your portfolio and would like to connect.',
      '',
      'Name: ' + val('f-name'),
      'Company: ' + val('f-company')
    ];
    if (val('f-role')) lines.push('Role: ' + val('f-role'));
    var type = document.getElementById('f-type');
    if (type && type.value) lines.push('Type: ' + type.value);
    if (val('f-loc')) lines.push('Location: ' + val('f-loc'));
    if (val('f-contact')) lines.push('Contact: ' + val('f-contact'));
    lines.push('', 'Message:', val('f-msg'));
    lines.push('', '— sent from himanshu03-dev.github.io');
    return lines.join('\n');
  }

  if (form) {
    // clear invalid state as the user types
    [].slice.call(form.querySelectorAll('input, textarea')).forEach(function (el) {
      el.addEventListener('input', function () {
        var f = el.closest('.field');
        if (f) f.classList.remove('invalid');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        var bad = form.querySelector('.field.invalid input, .field.invalid textarea');
        if (bad) bad.focus();
        return;
      }
      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(buildMessage());
      window.open(url, '_blank', 'noopener');
    });

    var mailBtn = document.getElementById('mailBtn');
    if (mailBtn) {
      mailBtn.addEventListener('click', function () {
        if (!validate()) {
          var bad = form.querySelector('.field.invalid input, .field.invalid textarea');
          if (bad) bad.focus();
          return;
        }
        var subject = 'Opportunity for Himanshu Dev — ' + (val('f-role') || 'Developer role') + ' @ ' + val('f-company');
        window.location.href = 'mailto:' + EMAIL +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(buildMessage());
      });
    }
  }

  /* ---------- Init ---------- */
  onScroll();
  runCounters();
  fillBars();
})();
