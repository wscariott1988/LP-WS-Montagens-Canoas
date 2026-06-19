(function () {
  const header = document.querySelector('header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      header.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    } else {
      header.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
    }
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .service-card, .review-card, .city-badge').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();
