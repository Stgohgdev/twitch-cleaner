fetch(chrome.runtime.getURL("twitch.css"))
  .then(res => res.text())
  .then(css => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  });


function hideSections(prefs) {
  // Ocultar el carrusel de la portada
  const showcaseContainer = document.querySelector('div[data-a-target="front-page-carousel"]');
  if (prefs.hideShowcase && showcaseContainer) {
    showcaseContainer.style.display = 'none';
    const showcaseVideos = showcaseContainer.querySelectorAll('video');
    showcaseVideos.forEach(video => {
      video.pause();
      video.muted = true;
    });
  } else if (showcaseContainer) {
    showcaseContainer.style.display = '';
  }

  // Ocultar elementos en modo minimalista
  const minimalElements = [
    '.side-nav',
    'header',
    '[data-test-selector="recommended-channel"]',
    '[data-test-selector="followed-channel"]',
    '.tw-carousel',
    '[data-a-target="video-player-metadata"]'
  ];

  minimalElements.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.display = prefs.minimalMode ? 'none' : '';
    });
  });

  // Ocultar o mostrar historias
  toggleHistoriasVisibility(prefs.hideStories);
}

// Silencia y pausa el carrusel solo una vez
function muteAndPauseShowcaseOnly() {
  const showcase = document.querySelector('div[data-a-target="front-page-carousel"]');
  if (!showcase) return;
  const videos = showcase.querySelectorAll('video');
  videos.forEach(video => {
    if (!video.dataset.userInteracted) {
      video.pause();
      video.muted = true;
      video.dataset.userInteracted = 'true';
      video.addEventListener('play', () => {
        video.dataset.userInteracted = 'false';
      });
    }
  });
}

// Cargar preferencias y aplicar cambios
function applySettings() {
  chrome.storage.sync.get({
    hideShowcase: true,
    minimalMode: false    
  }, prefs => {
    hideSections(prefs);
    muteAndPauseShowcaseOnly();    
  });
}

// Mensaje desde popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'applySettings') {
    applySettings();
  }
});

// Reaplicar ajustes cuando el DOM cambia
const observer = new MutationObserver(() => applySettings());
observer.observe(document.body, { childList: true, subtree: true });

// Ejecutar al cargar
applySettings();
