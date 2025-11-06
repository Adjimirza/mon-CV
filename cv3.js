// theme.js
(function () {
  const STORAGE_KEY = 'theme-preference'; // 'light' | 'dark' | null
  const root = document.documentElement; // <html>
  const toggleBtn = document.getElementById('theme-toggle');

  // applique un thème: 'light' ou 'dark'
  function applyTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    // mettre à jour l'attribut aria pour l'accessibilité
    if (toggleBtn) toggleBtn.setAttribute('aria-pressed', theme === 'dark');
  }

  // récupère préférence système (true si sombre)
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // lit préférence user -> 'dark' | 'light' | null
  function getStoredPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  // enregistre préférence
  function storePreference(value) {
    try {
      if (value === null) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, value);
    } catch (e) { /* localStorage peut être bloqué, on ignore */ }
  }

  // initialisation : priorité -> localStorage > system preference > light
  (function init() {
    const stored = getStoredPreference();
    if (stored === 'dark' || stored === 'light') {
      applyTheme(stored);
    } else {
      applyTheme(systemPrefersDark() ? 'dark' : 'light');
    }

    // écouter changement du média (si utilisateur change le thème système)
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const storedNow = getStoredPreference();
        if (storedNow === null) { // seulement si l'utilisateur n'a pas choisi un thème manuellement
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  })();

  // bascule au clic
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = root.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      storePreference(newTheme);
      // changer icône du bouton (optionnel)
      toggleBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    });
  }
})();


                    
// --- Animation du nom ---
const nomElement = document.getElementById("nom");
const texte = nomElement.textContent;
nomElement.textContent = ""; // Efface le texte

let i = 0;
function ecrireNom() {
  if (i < texte.length) {
    nomElement.textContent += texte.charAt(i);
    i++;
    setTimeout(ecrireNom, 150);
  }
}
ecrireNom();

const bars = document.querySelectorAll('progress');

bars.forEach(bar => {
  let valueFinale = bar.value;   // valeur dans ton HTML (ex: 90)
  bar.value = 0;                 // on démarre à 0

  let valeurActuelle = 0;
  let interval = setInterval(() => {
    if (valeurActuelle < valueFinale) {
      valeurActuelle++;
      bar.value = valeurActuelle;
    } else {
      clearInterval(interval); // stop l’animation quand c’est fini
    }
  }, 25); // vitesse (20 ms = rapide, tu peux augmenter si tu veux plus lent)
});
