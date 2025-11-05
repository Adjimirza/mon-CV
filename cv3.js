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

// --- Animation des barres de progression ---
const progresses = document.querySelectorAll('.progress');

progresses.forEach(progress => {
  const value = progress.getAttribute('data-value');
  setTimeout(() => {
    progress.style.width = value + '%';
  }, 500);
});
