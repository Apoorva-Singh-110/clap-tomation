/* ========================================
   CELESTIA - Horoscope App
   Interactive Features & Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStarField();
  initCarousel();
  initCompatibility();
  initNumerologyForm();
  initFeedbackButtons();
});

/* ========================================
   STAR FIELD (Canvas Animation)
   ======================================== */
function initStarField() {
  const canvas = document.getElementById('starField');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Generate stars
  const stars = [];
  const starCount = 80;
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      baseOpacity: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    });
  }

  function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
      const opacity = star.baseOpacity +
        Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.25;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, opacity))})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  // Reposition stars on resize
  window.addEventListener('resize', () => {
    for (const star of stars) {
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
    }
  });
}

/* ========================================
   CAROUSEL
   ======================================== */
function initCarousel() {
  const container = document.getElementById('carouselContainer');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  if (!container || dots.length === 0) return;

  function updateDots() {
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.querySelector('.horoscope-card').offsetWidth + 14; // gap
    const activeIndex = Math.round(scrollLeft / cardWidth);

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }

  container.addEventListener('scroll', updateDots, { passive: true });

  // Click dots to scroll
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const cardWidth = container.querySelector('.horoscope-card').offsetWidth + 14;
      container.scrollTo({
        left: i * cardWidth,
        behavior: 'smooth',
      });
    });
  });
}

/* ========================================
   COMPATIBILITY CHECKER
   ======================================== */
function initCompatibility() {
  const selector = document.getElementById('signSelector');
  const resultDiv = document.getElementById('compatibilityResult');
  if (!selector || !resultDiv) return;

  const compatData = {
    aries:       { pct: 62, label: 'GOOD CHEMISTRY', summary: 'Two Aries together create fireworks. The energy is intense and exciting, but learning to take turns leading will be key to lasting harmony.' },
    taurus:      { pct: 55, label: 'MODERATE MATCH', summary: 'Fire meets earth in a clash of pace. Aries wants speed; Taurus wants stability. Patience from both sides can build something enduring.' },
    gemini:      { pct: 75, label: 'GREAT MATCH', summary: 'A lively and stimulating duo. Gemini\'s wit matches Aries\' enthusiasm, creating endless conversation and adventure together.' },
    cancer:      { pct: 42, label: 'CHALLENGING', summary: 'Fire and water require careful balance. Cancer\'s sensitivity may feel overwhelmed by Aries\' directness, but mutual care can bridge the gap.' },
    leo:         { pct: 88, label: 'HIGHLY COMPATIBLE', summary: 'Fire meets fire in this dynamic pairing. Both signs bring passion and energy, creating an exciting and magnetic connection.' },
    virgo:       { pct: 48, label: 'CHALLENGING', summary: 'Aries\' spontaneity meets Virgo\'s precision. Different approaches to life can spark growth — or friction. Communication is essential.' },
    libra:       { pct: 72, label: 'GREAT MATCH', summary: 'Opposites on the zodiac wheel, yet deeply drawn together. Libra\'s diplomacy balances Aries\' boldness in a complementary dance.' },
    scorpio:     { pct: 65, label: 'GOOD CHEMISTRY', summary: 'Both ruled by Mars, this pairing is intense and passionate. Power dynamics need careful navigation for this bond to thrive.' },
    sagittarius: { pct: 93, label: 'SOULMATE POTENTIAL', summary: 'A match written in the stars. Both fire signs share a love of adventure, freedom, and bold living. The spark never fades.' },
    capricorn:   { pct: 47, label: 'CHALLENGING', summary: 'Cardinal signs with different approaches. Aries leads with instinct; Capricorn with strategy. Respecting each other\'s methods is key.' },
    aquarius:    { pct: 78, label: 'GREAT MATCH', summary: 'Innovation meets action. Aquarius\' vision combined with Aries\' drive can create something truly remarkable and unconventional.' },
    pisces:      { pct: 58, label: 'MODERATE MATCH', summary: 'A dreamer meets a doer. Pisces softens Aries\' edges while Aries gives Pisces courage to act on their beautiful visions.' },
  };

  const signSymbols = {
    aries: '\u2648', taurus: '\u2649', gemini: '\u264A', cancer: '\u264B',
    leo: '\u264C', virgo: '\u264D', libra: '\u264E', scorpio: '\u264F',
    sagittarius: '\u2650', capricorn: '\u2651', aquarius: '\u2652', pisces: '\u2653',
  };

  selector.addEventListener('change', () => {
    const sign = selector.value;
    const data = compatData[sign];
    if (!data) return;

    // Determine color based on percentage
    let color;
    if (data.pct >= 80) color = '#4ADE80';
    else if (data.pct >= 60) color = '#FBBF24';
    else if (data.pct >= 40) color = '#F97316';
    else color = '#EF4444';

    resultDiv.innerHTML = `
      <div class="compat-card">
        <div class="compat-icons">
          <span class="compat-sign-icon">\u2648</span>
          <span class="compat-heart">\u2764\uFE0F</span>
          <span class="compat-sign-icon" style="animation-delay: 1s;">${signSymbols[sign] || ''}</span>
        </div>
        <div class="compat-percentage" style="color: ${color}; text-shadow: 0 0 20px ${color}40;" data-target="${data.pct}">0%</div>
        <div class="compat-label" style="color: ${color};">${data.label}</div>
        <p class="compat-summary">${data.summary}</p>
      </div>
    `;

    // Trigger visibility
    requestAnimationFrame(() => {
      resultDiv.classList.add('visible');
      // Count up animation
      animateCountUp(resultDiv.querySelector('.compat-percentage'), data.pct);
    });
  });
}

function animateCountUp(el, target) {
  if (!el) return;
  const duration = 800;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + '%';

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);
}

/* ========================================
   NUMEROLOGY FORM
   ======================================== */
function initNumerologyForm() {
  const nameInput = document.getElementById('numName');
  const nameCheck = document.getElementById('nameCheck');
  const dayInput = document.getElementById('numDay');
  const monthInput = document.getElementById('numMonth');
  const yearInput = document.getElementById('numYear');
  const revealBtn = document.getElementById('revealBtn');

  if (!nameInput) return;

  // Name validation
  nameInput.addEventListener('input', () => {
    const valid = nameInput.value.trim().length >= 2;
    nameInput.classList.toggle('valid', valid);
    if (nameCheck) {
      nameCheck.classList.toggle('visible', valid);
    }
  });

  // Auto-advance DOB fields
  function autoAdvance(current, next, maxLen) {
    current.addEventListener('input', () => {
      // Only allow digits
      current.value = current.value.replace(/\D/g, '');
      if (current.value.length >= maxLen && next) {
        next.focus();
      }
    });
  }

  if (dayInput && monthInput && yearInput) {
    autoAdvance(dayInput, monthInput, 2);
    autoAdvance(monthInput, yearInput, 2);
    autoAdvance(yearInput, null, 4);
  }

  // Time inputs auto-advance
  const timeH = document.getElementById('numTimeH');
  const timeM = document.getElementById('numTimeM');
  if (timeH && timeM) {
    autoAdvance(timeH, timeM, 2);
    timeM.addEventListener('input', () => {
      timeM.value = timeM.value.replace(/\D/g, '');
    });
  }

  // CTA button
  if (revealBtn) {
    revealBtn.addEventListener('click', () => {
      // Validate required fields
      const name = nameInput.value.trim();
      const day = dayInput ? dayInput.value : '';
      const month = monthInput ? monthInput.value : '';
      const year = yearInput ? yearInput.value : '';

      if (!name) {
        shakeElement(nameInput);
        nameInput.focus();
        return;
      }
      if (!day || !month || !year || year.length < 4) {
        if (!day) { shakeElement(dayInput); dayInput.focus(); }
        else if (!month) { shakeElement(monthInput); monthInput.focus(); }
        else { shakeElement(yearInput); yearInput.focus(); }
        return;
      }

      // Success animation
      revealBtn.style.background = 'linear-gradient(135deg, #4ADE80, #22C55E)';
      revealBtn.querySelector('.cta-text').textContent = 'Calculating...';

      setTimeout(() => {
        revealBtn.style.background = 'linear-gradient(135deg, #4A9FFF, #7B68EE)';
        revealBtn.querySelector('.cta-text').innerHTML = '&#10024; Reveal My Numbers &#10024;';
        // In a real app, navigate to numerology results
        alert('Numerology feature coming soon! Your life path number awaits.');
      }, 1500);
    });
  }
}

function shakeElement(el) {
  if (!el) return;
  el.style.borderColor = '#EF4444';
  el.style.animation = 'none';
  el.offsetHeight; // trigger reflow
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.animation = '';
  }, 600);
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ========================================
   FEEDBACK BUTTONS
   ======================================== */
function initFeedbackButtons() {
  document.querySelectorAll('.card-feedback').forEach(container => {
    const buttons = container.querySelectorAll('.feedback-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Deselect siblings
        buttons.forEach(b => b.classList.remove('selected'));
        // Select this one
        btn.classList.add('selected');
      });
    });
  });
}
