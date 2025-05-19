document.addEventListener('DOMContentLoaded', () => {
  // Establece el título del documento (la pestaña del navegador)
  document.title = chrome.i18n.getMessage('extensionName');

  // Traducción dinámica de los textos en el HTML
  document.getElementById('title').textContent = chrome.i18n.getMessage('extensionName');
  document.getElementById('label-hideShowcase').textContent = chrome.i18n.getMessage('hideShowcaseLabel');
  document.getElementById('label-minimalMode').textContent = chrome.i18n.getMessage('minimalModeLabel');

  const checkboxes = {
    hideShowcase: document.getElementById('hideShowcase'),
    minimalMode: document.getElementById('minimalMode')    
  };

  chrome.storage.sync.get({
    hideShowcase: true,
    minimalMode: false   
  }, prefs => {
    Object.entries(checkboxes).forEach(([key, checkbox]) => {
      checkbox.checked = prefs[key];

      checkbox.addEventListener('change', () => {
        chrome.storage.sync.set({ [key]: checkbox.checked }, () => {
          chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'applySettings' });
          });
        });
      });
    });
  });
});
