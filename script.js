/* =============================================================
   Himanshu Dev — portfolio behaviour
   ============================================================= */
(function () {
  'use strict';

  document.documentElement.classList.add('js');
  document.body.classList.add('loading');

  var WA_NUMBER = '918755017490';
  var EMAIL = 'drajputhimanshu704@gmail.com';
  var GH_USER = 'Himanshu03-Dev';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* ---------------- Preloader ---------------- */
  (function preload() {
    var el = $('#preloader'), nameEl = $('#preName'), bar = $('#preBar');
    if (!el) return;
    'Himanshu Dev'.split('').forEach(function (ch, i) {
      var s = document.createElement('span');
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.animationDelay = (i * 0.035) + 's';
      nameEl.appendChild(s);
    });
    var p = 0;
    var t = setInterval(function () {
      p = Math.min(100, p + Math.random() * 34 + 14);
      if (bar) bar.style.width = p + '%';
      if (p >= 100) {
        clearInterval(t);
        setTimeout(function () {
          el.classList.add('done');
          document.body.classList.remove('loading');
          kick();
        }, 260);
      }
    }, 90);
    setTimeout(function () {
      clearInterval(t);
      el.classList.add('done');
      document.body.classList.remove('loading');
      kick();
    }, 1500);
  })();

  /* ---------------- Theme ---------------- */
  (function theme() {
    var root = document.documentElement;
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    if (saved) root.setAttribute('data-theme', saved);
    var btn = $('#themeBtn');
    if (btn) btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      toast(next === 'light' ? 'Light mode' : 'Dark mode');
    });
  })();

  /* ---------------- Toasts ---------------- */
  function toast(msg) {
    var box = $('#toasts');
    if (!box) return;
    var t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg><span></span>';
    t.lastChild.textContent = msg;
    box.appendChild(t);
    setTimeout(function () {
      t.classList.add('out');
      setTimeout(function () { t.remove(); }, 320);
    }, 2300);
  }

  /* ---------------- Year + clock ---------------- */
  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  (function clock() {
    var el = $('#clock');
    if (!el) return;
    function tick() {
      try {
        el.textContent = new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false
        }) + ' IST';
      } catch (e) { el.textContent = '—'; }
    }
    tick();
    setInterval(tick, 20000);
  })();

  /* ---------------- Scroll ---------------- */
  var bar = $('#progress'), nav = $('#nav'), toTop = $('#toTop'), timeline = $('#timeline');
  var sections = $$('section[id]'), links = $$('.nav-links a');

  function onScroll() {
    var st = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('stuck', st > 24);
    if (toTop) toTop.classList.toggle('show', st > 520);

    var cur = '';
    for (var i = 0; i < sections.length; i++) {
      if (st >= sections[i].offsetTop - 150) cur = sections[i].id;
    }
    links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });

    if (timeline) {
      var r = timeline.getBoundingClientRect();
      var pct = (window.innerHeight * 0.6 - r.top) / r.height * 100;
      timeline.style.setProperty('--tl', Math.max(0, Math.min(100, pct)) + '%');
    }

    counters();
    fillBars();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------------- Mobile nav ---------------- */
  var burger = $('#burger'), navLinks = $('#navLinks');
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

  /* ---------------- Typing ---------------- */
  (function typing() {
    var el = $('#typed');
    if (!el) return;
    var roles = [
      'Python & Django Developer',
      'WordPress Developer',
      'REST API Builder',
      'Full-Stack Web Developer',
      '3+ Years · 20+ Live Websites'
    ];
    var cursor = el.querySelector('.cursor');
    var ri = 0, ci = 0, del = false;
    function tick() {
      var w = roles[ri];
      ci = del ? ci - 1 : ci + 1;
      el.textContent = w.substring(0, ci);
      if (cursor) el.appendChild(cursor);
      var d = del ? 36 : 72;
      if (!del && ci === w.length) { d = 1700; del = true; }
      else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; d = 300; }
      setTimeout(tick, d);
    }
    setTimeout(tick, 700);
  })();

  /* ---------------- Marquee ---------------- */
  (function marquee() {
    var el = $('#marquee');
    if (!el) return;
    var stack = ['Python', 'Django', 'Django REST Framework', 'REST APIs', 'MySQL', 'SQL', 'OOP',
      'WordPress', 'PHP', 'Custom Themes', 'Plugin Development', 'Elementor', 'WooCommerce',
      'HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'Responsive Design',
      'Git & GitHub', 'Postman', 'SEO', 'Core Web Vitals', 'Agile', 'Pandas'];
    var html = stack.map(function (s) { return '<span class="marquee-item">' + s + '</span>'; }).join('');
    el.innerHTML = html + html;
  })();

  /* ---------------- Reveal ---------------- */
  function reveal() {
    var els = $$('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function (e, i) { e.style.transitionDelay = (Math.min(i, 4) * 0.05) + 's'; io.observe(e); });
    } else {
      els.forEach(function (e) { e.classList.add('in'); });
    }
  }

  /* ---------------- Counters + bars ---------------- */
  function counters() {
    $$('[data-count]').forEach(function (el) {
      if (el.dataset.done) return;
      if (el.getBoundingClientRect().top > window.innerHeight - 60) return;
      el.dataset.done = '1';
      var target = parseInt(el.dataset.count, 10), sfx = el.dataset.suffix || '', n = 0;
      var step = Math.max(1, Math.round(target / 26));
      var t = setInterval(function () {
        n += step;
        if (n >= target) { n = target; clearInterval(t); }
        el.textContent = n + sfx;
      }, 40);
    });
  }

  function fillBars() {
    $$('.bar i').forEach(function (b) {
      var r = b.getBoundingClientRect();
      if (r.top < window.innerHeight - 30 && r.bottom > 0) b.style.width = (b.dataset.w || 70) + '%';
    });
  }

  /* ---------------- Skill tabs ---------------- */
  $$('.skill-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      $$('.skill-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      $$('.skill-panel').forEach(function (p) { p.classList.remove('active'); });
      var panel = $('#panel-' + tab.dataset.panel);
      if (panel) { panel.classList.add('active'); setTimeout(fillBars, 60); }
    });
  });

  /* ---------------- Client work ---------------- */
  var WORK = [
    { n: 'Pariva Health', u: 'https://www.parivahealth.com/', c: 'healthcare',
      d: 'Healthcare platform built on a custom WordPress theme with technical SEO and page-speed work.',
      p: ['Custom theme built from scratch with custom post types for services and specialists',
          'Contact and enquiry forms wired up with validation and spam handling',
          'Technical SEO — schema markup, meta structure, internal linking',
          'Image and asset optimization for faster load times'],
      s: ['WordPress', 'PHP', 'HTML5', 'CSS3', 'JavaScript', 'SEO'] },
    { n: 'Anil Baghi Hospital', u: 'https://www.anilbaghihospital.com/', c: 'healthcare',
      d: 'Hospital website covering departments, doctors and appointment enquiries.',
      p: ['Department and doctor listing templates driven by custom post types',
          'Appointment enquiry flow with form validation',
          'Fully responsive layout tested across devices and browsers'],
      s: ['WordPress', 'HTML5', 'CSS3', 'jQuery', 'Bootstrap'] },
    { n: 'PainFlame', u: 'https://www.painflame.com/', c: 'healthcare',
      d: 'Ayurvedic and physiotherapy brand site promoting wellness services.',
      p: ['Service pages for physiotherapy, chiropractic treatment and laser therapy',
          'Responsive, modern layout designed to convert enquiries',
          'On-page SEO and performance tuning before launch'],
      s: ['WordPress', 'Elementor', 'CSS3', 'JavaScript', 'SEO'] },
    { n: "Mom's Belief", u: 'https://www.momsbelief.com/', c: 'healthcare',
      d: 'Parenting and mental-health platform with programs, clinical services and a content hub.',
      p: ['Front-end and back-end development across programs and clinical services',
          'SEO-optimized content hub with category and article templates',
          'Custom components for program enrolment and enquiry'],
      s: ['WordPress', 'PHP', 'JavaScript', 'MySQL', 'SEO'] },
    { n: 'Corporate Valuations', u: 'https://www.corporatevaluations.in/', c: 'finance',
      d: 'Financial advisory firm site with a deep service architecture and insights section.',
      p: ['Information architecture for a large multi-service firm',
          'Insights / knowledge section with filtering',
          'Lead-capture integration and form routing'],
      s: ['WordPress', 'PHP', 'HTML5', 'CSS3', 'SEO'] },
    { n: 'Eisen Investments', u: 'https://www.eiseninvestments.com/', c: 'finance',
      d: 'Investment firm website with a clean corporate presence.',
      p: ['Corporate layout with a restrained, trust-building visual system',
          'Responsive, cross-browser build',
          'Performance optimization and clean semantic markup'],
      s: ['WordPress', 'HTML5', 'CSS3', 'Bootstrap'] },
    { n: 'Webority Technologies', u: 'https://www.webority.com/', c: 'technology',
      d: 'Company website for the agency — services, portfolio and lead generation.',
      p: ['Custom theme with services and portfolio modules',
          'Performance and SEO optimization across all templates',
          'Ongoing maintenance and content updates'],
      s: ['WordPress', 'PHP', 'JavaScript', 'SEO'] },
    { n: 'Cloudverse.ai', u: 'https://www.cloudverse.ai/', c: 'technology',
      d: 'Cloud product website with a modern, animation-led presentation.',
      p: ['Modern layout with scroll and hover animation work',
          'Optimized asset delivery to keep the animations smooth',
          'Responsive behaviour across breakpoints'],
      s: ['WordPress', 'CSS3', 'JavaScript', 'jQuery'] },
    { n: 'Treacle Tech', u: 'https://www.treacletech.com/', c: 'technology',
      d: 'Technology services website with custom sections and on-page SEO.',
      p: ['Custom section templates for services and case studies',
          'Responsive design and cross-browser testing',
          'On-page SEO setup'],
      s: ['WordPress', 'HTML5', 'CSS3', 'SEO'] },
    { n: 'Abaca Tech', u: 'https://www.abacatech.com/', c: 'technology',
      d: 'IT services site built on a custom WordPress theme.',
      p: ['Service and case-study templates',
          'Custom post types for structured content',
          'Speed and SEO optimization'],
      s: ['WordPress', 'PHP', 'CSS3'] },
    { n: 'Intuicent Innovations', u: 'https://www.intuicentinnovations.com/', c: 'technology',
      d: 'Innovation and consulting website with a clear content structure.',
      p: ['Custom theme development end-to-end',
          'Content structure planning with the client',
          'Responsive build and launch support'],
      s: ['WordPress', 'HTML5', 'CSS3', 'JavaScript'] },
    { n: 'Cyson', u: 'https://www.cyson.in/', c: 'technology',
      d: 'Technology brand website focused on speed and clarity.',
      p: ['Custom sections built to match the brand system',
          'Page-speed optimization — caching, image compression, minification',
          'Mobile-first responsive build'],
      s: ['WordPress', 'CSS3', 'JavaScript'] },
    { n: 'Outsourzr', u: 'https://www.outsourzr.com/', c: 'technology',
      d: 'Outsourcing services platform with enquiry-driven service pages.',
      p: ['Service pages with a consistent, repeatable template',
          'Enquiry forms with routing and validation',
          'SEO setup and submission'],
      s: ['WordPress', 'PHP', 'jQuery', 'SEO'] },
    { n: 'OfficeDel', u: 'https://officedel.com/', c: 'technology',
      d: 'Office solutions website with a catalogue-style layout.',
      p: ['Catalogue layout with category structure',
          'Responsive grid and image handling',
          'Enquiry integration'],
      s: ['WordPress', 'CSS3', 'Bootstrap'] },
    { n: 'Galapegasus', u: 'https://www.galapegasus.com/', c: 'technology',
      d: 'Corporate website built on a custom WordPress theme.',
      p: ['Custom theme with reusable content blocks',
          'Cross-device optimization',
          'Deployment and post-launch support'],
      s: ['WordPress', 'HTML5', 'CSS3'] },
    { n: 'Hindu College Perfumery', u: 'https://www.hinducollegeperfumery.org/', c: 'education',
      d: 'Institutional website covering courses, departments and admissions.',
      p: ['Course and department page templates',
          'Admissions enquiry flow',
          'Accessible, readable structure for a wide audience'],
      s: ['WordPress', 'HTML5', 'CSS3', 'JavaScript'] },
    { n: 'AstroGuru Saurabh', u: 'https://www.astrogurusauraabh.com/', c: 'lifestyle',
      d: 'Astrology and consultation portal for a spiritual consultant.',
      p: ['Built the entire front-end from design to live',
          'Services showcase and testimonials section',
          'Consultation booking flow with enquiry handling'],
      s: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'jQuery'] },
    { n: 'DiWhyNot', u: 'https://www.diwhynot.in/', c: 'lifestyle',
      d: 'Lifestyle brand website with a custom visual identity.',
      p: ['Custom design implementation',
          'Responsive layout across breakpoints',
          'Content management setup so the client can update it alone'],
      s: ['WordPress', 'CSS3', 'JavaScript'] },
    { n: 'PNF Events', u: 'https://www.pnfevents.in/', c: 'lifestyle',
      d: 'Event management website with gallery and enquiry flow.',
      p: ['Gallery and services modules',
          'Enquiry forms with validation',
          'Mobile-first build'],
      s: ['WordPress', 'Elementor', 'CSS3'] },
    { n: 'House Affair', u: 'https://www.houseaffair.in/', c: 'lifestyle',
      d: 'Interior and home brand site with a visual-led layout.',
      p: ['Image-heavy layout with lazy loading and compression',
          'Responsive gallery components',
          'SEO basics and launch'],
      s: ['WordPress', 'CSS3', 'JavaScript'] }
  ];

  var CAT = { healthcare: 'Healthcare', finance: 'Finance', technology: 'Technology', lifestyle: 'Lifestyle', education: 'Education' };

  var grid = $('#workGrid');
  if (grid) {
    grid.innerHTML = WORK.map(function (w, i) {
      return '<button class="work-card" data-cat="' + w.c + '" data-i="' + i + '">' +
          '<span class="work-top">' +
            '<span class="work-cat">' + CAT[w.c] + '</span>' +
            '<svg class="work-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>' +
          '</span>' +
          '<span class="work-name">' + w.n + '</span>' +
          '<span class="work-desc">' + w.d + '</span>' +
        '</button>';
    }).join('');

    var counts = { all: WORK.length };
    WORK.forEach(function (w) { counts[w.c] = (counts[w.c] || 0) + 1; });
    Object.keys(counts).forEach(function (k) {
      var el = $('#c' + k.charAt(0).toUpperCase() + k.slice(1));
      if (el) el.textContent = counts[k];
    });

    $$('.filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('.filter').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.dataset.f;
        $$('.work-card', grid).forEach(function (c) {
          c.classList.toggle('hidden', f !== 'all' && c.dataset.cat !== f);
        });
      });
    });

    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.work-card');
      if (card) openModal(WORK[+card.dataset.i]);
    });
  }

  /* ---------------- Modal ---------------- */
  var modal = $('#modal'), lastFocus = null;

  function openModal(w) {
    if (!modal || !w) return;
    lastFocus = document.activeElement;
    $('#mCat').textContent = CAT[w.c];
    $('#mTitle').textContent = w.n;
    $('#mHost').textContent = w.u.replace(/^https?:\/\//, '').replace(/\/$/, '');
    $('#mDesc').textContent = w.d;
    $('#mList').innerHTML = w.p.map(function (x) { return '<li>' + x + '</li>'; }).join('');
    $('#mStack').innerHTML = w.s.map(function (x) { return '<span class="chip">' + x + '</span>'; }).join('');
    $('#mLink').href = w.u;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('.modal-close', modal).focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  if (modal) {
    modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) closeModal(); });
  }

  /* ---------------- Card spotlight + magnetic ---------------- */
  $$('.tilt').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('.magnetic').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.18;
        var y = (e.clientY - r.top - r.height / 2) * 0.3;
        el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------------- Cursor ---------------- */
  (function cursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var dot = $('#cDot'), ring = $('#cRing');
    if (!dot || !ring) return;
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.opacity = ring.style.opacity = 1;
      dot.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
    });
    document.addEventListener('mouseleave', function () { dot.style.opacity = ring.style.opacity = 0; });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = 'translate(' + (rx - ring.offsetWidth / 2) + 'px,' + (ry - ring.offsetHeight / 2) + 'px)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      var hot = e.target.closest('a, button, .work-card, .skill-card, input, textarea, select');
      ring.classList.toggle('hot', !!hot);
    });
  })();

  /* ---------------- GitHub live stats ---------------- */
  (function gh() {
    var card = $('#ghCard');
    if (!card || !window.fetch) return;
    fetch('https://api.github.com/users/' + GH_USER)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) {
        $('#ghRepos').textContent = d.public_repos != null ? d.public_repos : '–';
        $('#ghFollowers').textContent = d.followers != null ? d.followers : '–';
        if (d.created_at) {
          var y = Math.max(1, new Date().getFullYear() - new Date(d.created_at).getFullYear());
          $('#ghYears').textContent = y;
        }
        card.hidden = false;
      })
      .catch(function () { /* stays hidden if GitHub is unreachable */ });
  })();

  /* ---------------- Copy email ---------------- */
  var copyBtn = $('#copyMail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var done = function () { toast('Email copied'); };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(EMAIL).then(done).catch(function () { window.location.href = 'mailto:' + EMAIL; });
      } else {
        var ta = document.createElement('textarea');
        ta.value = EMAIL; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { window.location.href = 'mailto:' + EMAIL; }
        ta.remove();
      }
    });
  }

  /* ---------------- Contact form ---------------- */
  var form = $('#waForm');

  function val(id) { var el = $('#' + id); return el ? el.value.trim() : ''; }

  function validate() {
    var ok = true;
    ['f-name', 'f-company', 'f-msg'].forEach(function (id) {
      var el = $('#' + id), f = el.closest('.field');
      if (!el.value.trim()) { f.classList.add('invalid'); ok = false; } else { f.classList.remove('invalid'); }
    });
    return ok;
  }

  function buildMessage() {
    var out = ['Hi Himanshu, I found your portfolio and would like to connect.', '',
      'Name: ' + val('f-name'), 'Company: ' + val('f-company')];
    if (val('f-role')) out.push('Role: ' + val('f-role'));
    var type = $('#f-type');
    if (type && type.value) out.push('Type: ' + type.value);
    if (val('f-loc')) out.push('Location: ' + val('f-loc'));
    if (val('f-contact')) out.push('Contact: ' + val('f-contact'));
    out.push('', 'Message:', val('f-msg'));
    out.push('', '— sent from himanshu03-dev.github.io');
    return out.join('\n');
  }

  function focusFirstInvalid() {
    var bad = form.querySelector('.field.invalid input, .field.invalid textarea');
    if (bad) bad.focus();
  }

  if (form) {
    $$('input, textarea', form).forEach(function (el) {
      el.addEventListener('input', function () {
        var f = el.closest('.field');
        if (f) f.classList.remove('invalid');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) { focusFirstInvalid(); return; }
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(buildMessage()), '_blank', 'noopener');
      toast('Opening WhatsApp…');
    });

    var mailBtn = $('#mailBtn');
    if (mailBtn) mailBtn.addEventListener('click', function () {
      if (!validate()) { focusFirstInvalid(); return; }
      var subject = 'Opportunity for Himanshu Dev — ' + (val('f-role') || 'Developer role') + ' @ ' + val('f-company');
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(buildMessage());
    });
  }

  /* ---------------- Command palette ---------------- */
  var cmdk = $('#cmdk'), cmdInput = $('#cmdInput'), cmdList = $('#cmdList'), sel = 0, shown = [];

  var COMMANDS = [
    { i: '◆', t: 'About', s: 'section', go: function () { jump('#about'); } },
    { i: '◆', t: 'Skills', s: 'section', go: function () { jump('#skills'); } },
    { i: '◆', t: 'Process', s: 'section', go: function () { jump('#process'); } },
    { i: '◆', t: 'Experience', s: 'section', go: function () { jump('#experience'); } },
    { i: '◆', t: 'Python Projects', s: 'section', go: function () { jump('#projects'); } },
    { i: '◆', t: 'Client Work', s: 'section', go: function () { jump('#work'); } },
    { i: '◆', t: 'Certifications & Education', s: 'section', go: function () { jump('#credentials'); } },
    { i: '◆', t: 'Contact', s: 'section', go: function () { jump('#contact'); } },
    { i: '↓', t: 'Download resume', s: 'action', go: function () { window.location.href = 'assets/Himanshu_Dev_Resume.pdf'; } },
    { i: '💬', t: 'Message on WhatsApp', s: 'action', go: function () { window.open('https://wa.me/' + WA_NUMBER, '_blank', 'noopener'); } },
    { i: '✉', t: 'Copy email address', s: 'action', go: function () { if (copyBtn) copyBtn.click(); } },
    { i: '☎', t: 'Call +91 87550 17490', s: 'action', go: function () { window.location.href = 'tel:+918755017490'; } },
    { i: '⌾', t: 'Open GitHub profile', s: 'link', go: function () { window.open('https://github.com/' + GH_USER, '_blank', 'noopener'); } },
    { i: 'in', t: 'Open LinkedIn profile', s: 'link', go: function () { window.open('https://www.linkedin.com/in/himanshu-dev-3a57a1219', '_blank', 'noopener'); } },
    { i: '◐', t: 'Toggle light / dark theme', s: 'action', go: function () { $('#themeBtn').click(); } }
  ];

  function jump(hash) {
    var el = document.querySelector(hash);
    if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
  }

  function renderCmd(q) {
    q = (q || '').toLowerCase().trim();
    shown = COMMANDS.filter(function (c) { return !q || c.t.toLowerCase().indexOf(q) > -1 || c.s.indexOf(q) > -1; });
    sel = 0;
    if (!shown.length) { cmdList.innerHTML = '<div class="cmdk-empty">Nothing matches that.</div>'; return; }
    cmdList.innerHTML = shown.map(function (c, i) {
      return '<button class="cmdk-item' + (i === 0 ? ' sel' : '') + '" data-i="' + i + '">' +
        '<span class="ic">' + c.i + '</span><span>' + c.t + '</span><span class="sub">' + c.s + '</span></button>';
    }).join('');
  }

  function openCmd() {
    if (!cmdk) return;
    cmdk.classList.add('open');
    cmdInput.value = '';
    renderCmd('');
    setTimeout(function () { cmdInput.focus(); }, 40);
  }
  function closeCmd() { if (cmdk) cmdk.classList.remove('open'); }

  function runCmd(i) {
    var c = shown[i];
    closeCmd();
    if (c) setTimeout(c.go, 120);
  }

  if (cmdk) {
    $('#openCmd').addEventListener('click', openCmd);
    cmdk.addEventListener('click', function (e) { if (e.target.hasAttribute('data-cmd-close')) closeCmd(); });
    cmdInput.addEventListener('input', function () { renderCmd(cmdInput.value); });
    cmdList.addEventListener('click', function (e) {
      var b = e.target.closest('.cmdk-item');
      if (b) runCmd(+b.dataset.i);
    });
    cmdInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!shown.length) return;
        sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + shown.length) % shown.length;
        $$('.cmdk-item', cmdList).forEach(function (b, i) { b.classList.toggle('sel', i === sel); });
        var cur = cmdList.children[sel];
        if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        runCmd(sel);
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdk && cmdk.classList.contains('open') ? closeCmd() : openCmd();
    } else if (e.key === 'Escape') {
      closeCmd();
      closeModal();
    }
  });

  /* ---------------- Init ---------------- */
  function kick() {
    reveal();
    onScroll();
  }
  kick();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', kick);
  window.addEventListener('load', function () { setTimeout(kick, 60); });
})();
