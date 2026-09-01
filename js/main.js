// Wspólny skrypt dla wszystkich podstron.
// Każda funkcja sama sprawdza, czy potrzebne elementy istnieją na stronie —
// ten sam plik można bezpiecznie podpiąć wszędzie.

document.addEventListener('DOMContentLoaded', function () {
  initScrollReveal();
  initStatsCounter();
});

// --- Pojawianie się kart przy przewijaniu (strona "O mnie") -------------

function initScrollReveal() {
  var items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var stagger = 90; // ms odstępu między kolejnymi kartami w tej samej grupie

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var siblings = Array.prototype.slice.call(el.parentElement.querySelectorAll(':scope > [data-reveal]'));
      var index = Math.max(0, siblings.indexOf(el));
      el.style.transitionDelay = (index * stagger) + 'ms';
      el.classList.add('is-visible');
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach(function (el) { observer.observe(el); });
}

// --- Licznik statystyk 0 → wartość docelowa (strona "Motoryka") ---------

function initStatsCounter() {
  var section = document.querySelector('[data-stats]');
  if (!section) return;

  var values = section.querySelectorAll('[data-stat-value]');
  if (!values.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var targets = Array.prototype.map.call(values, function (el) {
    return {
      el: el,
      target: parseInt(el.getAttribute('data-stat-value'), 10) || 0,
      suffix: el.getAttribute('data-stat-suffix') || ''
    };
  });

  if (reduceMotion) {
    targets.forEach(function (t) { t.el.textContent = t.target + t.suffix; });
    return;
  }

  var hasRun = false;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        runCounters(targets);
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(section);
}

function runCounters(targets) {
  var duration = 1600;
  var start = performance.now();

  function step(now) {
    var progress = Math.min(1, (now - start) / duration);
    var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

    targets.forEach(function (t) {
      t.el.textContent = Math.round(t.target * eased) + t.suffix;
    });

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
