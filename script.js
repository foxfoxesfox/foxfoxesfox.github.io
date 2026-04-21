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

// Typing cycle on "Currently Playing"
const playingEl = document.getElementById('currently-playing');
if (playingEl) {
  const games = ['Persona 5 Royal', 'Initial D', 'Resident Evil', 'Security Breach'];
  let idx = 0;

  function typeText(el, text, cb) {
    el.textContent = ''; let i = 0;
    const t = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) { clearInterval(t); setTimeout(cb, 2000); }
    }, 60);
  }
  function eraseText(el, cb) {
    const t = setInterval(() => {
      el.textContent = el.textContent.slice(0, -1);
      if (!el.textContent.length) { clearInterval(t); cb(); }
    }, 35);
  }
  function cycle() {
    idx = (idx + 1) % games.length;
    eraseText(playingEl, () => typeText(playingEl, games[idx], cycle));
  }
  setTimeout(() => eraseText(playingEl, () => typeText(playingEl, games[0], cycle)), 3000);
}

// Subtle card tilt on mouse move
const card = document.querySelector('.card');
if (card && window.matchMedia('(pointer: fine)').matches) {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    card.style.transform = `perspective(1000px) rotateY(${dx * 2}deg) rotateX(${-dy * 2}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    card.style.transform  = '';
    setTimeout(() => card.style.transition = '', 500);
  });
}