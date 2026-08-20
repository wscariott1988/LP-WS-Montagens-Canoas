(function () {
  'use strict';

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .service-card, .review-card, .city-badge, .step-card, .faq-item').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  var lightboxEl = null;
  var lightboxImg = null;
  var lightboxCaption = null;

  function buildLightbox() {
    lightboxEl = document.createElement('div');
    lightboxEl.className = 'lightbox';
    lightboxEl.setAttribute('role', 'dialog');
    lightboxEl.setAttribute('aria-modal', 'true');
    lightboxEl.setAttribute('aria-label', 'Foto ampliada');

    var closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Fechar');
    closeBtn.textContent = '×';

    lightboxImg = document.createElement('img');
    lightboxImg.alt = 'Foto ampliada';
    lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'lightbox-caption';

    lightboxEl.appendChild(closeBtn);
    lightboxEl.appendChild(lightboxImg);
    lightboxEl.appendChild(lightboxCaption);
    document.body.appendChild(lightboxEl);

    function close() {
      lightboxEl.classList.remove('open');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    lightboxEl.addEventListener('click', function (e) {
      if (e.target === lightboxEl) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightboxEl.classList.contains('open')) close();
    });
  }

  function openLightbox(img, caption) {
    if (!lightboxEl) buildLightbox();
    lightboxImg.src = img;
    lightboxImg.alt = caption || 'Foto ampliada';
    lightboxCaption.textContent = caption || '';
    lightboxEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      if (!img) return;
      openLightbox(img.currentSrc || img.src, item.getAttribute('data-caption') || '');
    });
  });

  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        var openAnswer = openItem.querySelector('.faq-answer');
        if (openAnswer) {
          openAnswer.style.maxHeight = '0px';
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
