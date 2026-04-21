// Custom cursor
const dot = document.getElementById('cursorDot');
if (dot && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  });
} else if (dot) {
  dot.style.display = 'none';
}

// Glitch name effect on hover
const nameEl = document.querySelector('.name');
if (nameEl) {
  let glitchInterval = null;
  const original = nameEl.textContent;
  const chars = '!@#$%<>?/\\|[]{}';
  nameEl.addEventListener('mouseenter', () => {
    let iterations = 0;
    clearInterval(glitchInterval);
    glitchInterval = setInterval(() => {
      nameEl.textContent = original.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (i < iterations) return original[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (iterations >= original.length) { clearInterval(glitchInterval); nameEl.textContent = original; }
      iterations += 0.5;
    }, 40);
  });
}

// Typing cycle on "Currently"
const currentTextEl = document.getElementById('currently-text');
const currentIconEl = document.getElementById('currently-icon');

if (currentTextEl && currentIconEl) {
  const statuses = [
    { icon: '📚', text: 'Year 3 @ NTU' },
    { icon: '🔨', text: 'Looking for Internship (PA)' },
    { icon: '🎮', text: 'Playing Overwatch' }
  ];
  let idx = 0;

  function typeText(status, cb) {
    currentIconEl.textContent = status.icon;
    currentTextEl.textContent = '';
    let i = 0;
    const t = setInterval(() => {
      currentTextEl.textContent += status.text[i++];
      if (i >= status.text.length) {
        clearInterval(t);
        setTimeout(cb, 2500);
      }
    }, 60);
  }

  function eraseText(cb) {
    const t = setInterval(() => {
      currentTextEl.textContent = currentTextEl.textContent.slice(0, -1);
      if (!currentTextEl.textContent.length) {
        clearInterval(t);
        cb();
      }
    }, 35);
  }

  function cycle() {
    idx = (idx + 1) % statuses.length;
    eraseText(() => typeText(statuses[idx], cycle));
  }

  setTimeout(cycle, 3000);
}

// Card pop-in on load
const card = document.querySelector('.card');
if (card) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  });
}