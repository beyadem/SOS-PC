// SOS PC — Données et logique de l'application
const problems = [
  {
    id: 'wifi', icon: '📶', title: 'Problème de Wi-Fi',
    description: 'Connexion absente ou Internet inaccessible',
    steps: [
      'Vérifiez que le Wi-Fi est activé et que le mode avion est désactivé.',
      'Vérifiez si un autre appareil accède à Internet sur le même réseau.',
      'Redémarrez votre ordinateur puis réessayez.',
      'Oubliez le réseau Wi-Fi dans les paramètres, puis reconnectez-vous.',
      'Si le problème persiste, contactez le responsable de votre réseau ou votre fournisseur d’accès.'
    ]
  },
  {
    id: 'slow', icon: '🐢', title: 'Ordinateur lent',
    description: 'Votre PC met du temps à réagir',
    steps: [
      'Redémarrez votre ordinateur.',
      'Ouvrez le Gestionnaire des tâches (Ctrl + Maj + Échap).',
      'Repérez les applications utilisant beaucoup de processeur ou de mémoire.',
      'Fermez uniquement les applications que vous reconnaissez et n’utilisez pas.',
      'Vérifiez l’espace disque disponible et les mises à jour Windows.'
    ]
  },
  {
    id: 'printer', icon: '🖨️', title: 'Imprimante bloquée',
    description: 'Impossible d’imprimer un document',
    steps: [
      'Vérifiez que l’imprimante est allumée et qu’elle affiche aucun message d’erreur.',
      'Vérifiez le papier, l’encre et la connexion USB ou réseau.',
      'Ouvrez Paramètres > Bluetooth et appareils > Imprimantes et scanners.',
      'Sélectionnez la bonne imprimante et vérifiez sa file d’attente.',
      'Redémarrez l’imprimante et effectuez un nouvel essai.'
    ]
  },
  {
    id: 'sound', icon: '🔊', title: 'Plus de son',
    description: 'Aucun son ne sort des haut-parleurs',
    steps: [
      'Vérifiez le volume et assurez-vous que le son n’est pas coupé.',
      'Vérifiez que le bon périphérique de sortie audio est sélectionné.',
      'Testez le son dans une autre application.',
      'Déconnectez puis reconnectez votre casque si vous en utilisez un.',
      'Redémarrez votre ordinateur et réessayez.'
    ]
  }
];

const list = document.querySelector('#problem-list');
const diagnostic = document.querySelector('#diagnostic');

problems.forEach(problem => {
  const button = document.createElement('button');
  button.className = 'problem-card';
  button.type = 'button';
  button.innerHTML = `<span class="problem-icon" aria-hidden="true">${problem.icon}</span><strong>${problem.title}</strong><small>${problem.description}</small>`;
  button.addEventListener('click', () => showDiagnostic(problem, button));
  list.appendChild(button);
});

function showDiagnostic(problem, selectedButton) {
  document.querySelectorAll('.problem-card').forEach(button => button.classList.remove('selected'));
  selectedButton.classList.add('selected');
  diagnostic.classList.remove('hidden');
  diagnostic.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = `Diagnostic : ${problem.title}`;
  const intro = document.createElement('p');
  intro.className = 'muted';
  intro.textContent = 'Cochez chaque étape après l’avoir effectuée.';
  const progress = document.createElement('div');
  progress.className = 'progress';
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', String(problem.steps.length));
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  progress.appendChild(bar);
  const stepsContainer = document.createElement('div');
  const status = document.createElement('span');
  status.className = 'status';

  problem.steps.forEach((step, index) => {
    const label = document.createElement('label');
    label.className = 'step';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.addEventListener('change', updateProgress);
    const text = document.createElement('span');
    text.textContent = `${index + 1}. ${step}`;
    label.append(input, text);
    stepsContainer.appendChild(label);
  });

  const reset = document.createElement('button');
  reset.className = 'reset';
  reset.type = 'button';
  reset.textContent = 'Recommencer';
  reset.addEventListener('click', () => {
    stepsContainer.querySelectorAll('input').forEach(input => input.checked = false);
    updateProgress();
  });
  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.append(reset, status);
  diagnostic.append(heading, intro, progress, stepsContainer, actions);
  updateProgress();
  diagnostic.scrollIntoView({ behavior: 'smooth', block: 'start' });

  function updateProgress() {
    const completed = stepsContainer.querySelectorAll('input:checked').length;
    bar.style.width = `${(completed / problem.steps.length) * 100}%`;
    progress.setAttribute('aria-valuenow', String(completed));
    status.textContent = completed === problem.steps.length
      ? 'Toutes les étapes sont terminées. Si le problème persiste, contactez un technicien.'
      : `${completed} étape(s) sur ${problem.steps.length} terminée(s)`;
  }
}
