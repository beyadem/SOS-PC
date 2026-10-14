// SOS PC — Version 1.1
// Application 100 % locale : aucune donnée personnelle n'est envoyée.

const problems = [
  {
    id: 'wifi', icon: '📶', title: 'Problème de Wi-Fi',
    description: 'Un questionnaire pour identifier la cause possible.'
  },
  {
    id: 'slow', icon: '🐢', title: 'Ordinateur lent',
    description: 'Votre PC met du temps à réagir.',
    steps: [
      'Redémarrez votre ordinateur.',
      'Ouvrez le Gestionnaire des tâches avec Ctrl + Maj + Échap.',
      'Repérez les applications qui consomment beaucoup de processeur ou de mémoire.',
      'Fermez uniquement les applications que vous reconnaissez et n’utilisez pas.',
      'Vérifiez l’espace disque disponible et les mises à jour Windows.'
    ]
  },
  {
    id: 'printer', icon: '🖨️', title: 'Imprimante bloquée',
    description: 'Impossible d’imprimer un document.',
    steps: [
      'Vérifiez que l’imprimante est allumée et n’affiche pas de message d’erreur.',
      'Vérifiez la présence de papier et la connexion USB ou réseau.',
      'Ouvrez Paramètres > Bluetooth et appareils > Imprimantes et scanners.',
      'Sélectionnez la bonne imprimante et vérifiez sa file d’attente.',
      'Redémarrez l’imprimante, puis effectuez un nouvel essai.'
    ]
  },
  {
    id: 'sound', icon: '🔊', title: 'Plus de son',
    description: 'Aucun son ne sort des haut-parleurs.',
    steps: [
      'Vérifiez le volume et assurez-vous que le son n’est pas coupé.',
      'Vérifiez que le bon périphérique de sortie audio est sélectionné.',
      'Testez le son dans une autre application.',
      'Déconnectez puis reconnectez votre casque, si vous en utilisez un.',
      'Redémarrez votre ordinateur et réessayez.'
    ]
  }
];

// Un arbre de décision : chaque réponse mène à une question ou un résultat.
const wifiFlow = {
  connected: {
    question: 'Votre ordinateur indique-t-il qu’il est connecté au Wi-Fi ?',
    answers: [
      { label: 'Oui, il est connecté', next: 'otherDevices' },
      { label: 'Non, il n’est pas connecté', next: 'networkVisible' }
    ]
  },
  otherDevices: {
    question: 'Un autre appareil (téléphone ou PC) arrive-t-il à naviguer sur ce Wi-Fi ?',
    answers: [
      { label: 'Oui, les autres appareils fonctionnent', next: 'allBrowsers' },
      { label: 'Non, ils ont aussi un problème', next: 'networkIssue' },
      { label: 'Je ne peux pas vérifier', next: 'localChecks' }
    ]
  },
  allBrowsers: {
    question: 'Le problème touche-t-il plusieurs sites ou navigateurs ?',
    answers: [
      { label: 'Oui, tout semble inaccessible', next: 'computerIssue' },
      { label: 'Non, seulement un site ou une application', next: 'siteIssue' }
    ]
  },
  networkVisible: {
    question: 'Le nom de votre réseau apparaît-il dans la liste des réseaux Wi-Fi ?',
    answers: [
      { label: 'Oui, je vois mon réseau', next: 'joinIssue' },
      { label: 'Non, je ne le vois pas', next: 'missingNetwork' }
    ]
  },
  networkIssue: {
    title: 'Le problème semble venir du réseau partagé',
    explanation: 'Plusieurs appareils sont touchés : le point d’accès, la box ou le fournisseur d’accès peuvent être concernés.',
    steps: [
      'Vérifiez les voyants de la box et les éventuels messages de panne du fournisseur.',
      'Vérifiez les branchements de la box sans toucher aux réglages avancés.',
      'Si vous êtes autorisé à le faire, redémarrez la box et testez à nouveau après son démarrage.',
      'Si plusieurs appareils restent sans connexion, contactez le fournisseur d’accès ou l’administrateur réseau.'
    ]
  },
  computerIssue: {
    title: 'Le problème semble concerner cet ordinateur',
    explanation: 'Les autres appareils fonctionnent : commençons par les vérifications locales.',
    steps: [
      'Désactivez le mode avion et vérifiez que le Wi-Fi est bien activé.',
      'Déconnectez puis reconnectez-vous à votre réseau Wi-Fi.',
      'Redémarrez l’ordinateur et testez plusieurs sites connus.',
      'Ouvrez Paramètres > Réseau et Internet pour consulter l’état de la connexion.',
      'Si le problème persiste, demandez de l’aide à une personne compétente.'
    ]
  },
  siteIssue: {
    title: 'Le problème semble limité à un site ou une application',
    explanation: 'La connexion fonctionne probablement pour d’autres services.',
    steps: [
      'Vérifiez l’adresse du site et essayez un autre site de confiance.',
      'Fermez puis relancez l’application ou le navigateur concerné.',
      'Essayez le même site dans un autre navigateur.',
      'Si seul ce service est indisponible, consultez sa page d’état officielle ou contactez son assistance.'
    ]
  },
  joinIssue: {
    title: 'L’ordinateur détecte le réseau, mais ne s’y connecte pas',
    explanation: 'Cela peut venir des informations de connexion ou du signal Wi-Fi.',
    steps: [
      'Vérifiez que vous sélectionnez le bon nom de réseau.',
      'Saisissez soigneusement le mot de passe fourni par le responsable du réseau.',
      'Rapprochez-vous de la box ou du point d’accès pour tester le signal.',
      'Redémarrez l’ordinateur et réessayez.',
      'Si le réseau est géré par une entreprise ou une école, contactez le support.'
    ]
  },
  missingNetwork: {
    title: 'Le réseau Wi-Fi n’est pas visible',
    explanation: 'Le Wi-Fi peut être désactivé, le signal trop faible ou le réseau indisponible.',
    steps: [
      'Vérifiez que le Wi-Fi est activé et que le mode avion est désactivé.',
      'Rapprochez-vous du point d’accès ou de la box.',
      'Regardez si votre téléphone voit le nom de ce réseau.',
      'Redémarrez l’ordinateur, puis ouvrez à nouveau la liste des réseaux.',
      'Si aucun réseau n’est visible sur le PC, contactez le support informatique.'
    ]
  },
  localChecks: {
    title: 'Premières vérifications sur votre ordinateur',
    explanation: 'Sans deuxième appareil, on peut commencer par des tests simples et sans risque.',
    steps: [
      'Vérifiez que le mode avion est désactivé et que le Wi-Fi est actif.',
      'Déconnectez puis reconnectez l’ordinateur au réseau.',
      'Essayez d’ouvrir deux sites de confiance dans le navigateur.',
      'Redémarrez votre ordinateur puis réessayez.',
      'Si le problème persiste, demandez au responsable du réseau si une panne est connue.'
    ]
  }
};

const list = document.querySelector('#problem-list');
const diagnostic = document.querySelector('#diagnostic');
let wifiHistory = [];

problems.forEach((problem) => {
  const button = document.createElement('button');
  button.className = 'problem-card';
  button.type = 'button';
  button.innerHTML = `<span class="problem-icon" aria-hidden="true">${problem.icon}</span><strong>${problem.title}</strong><small>${problem.description}</small>`;
  button.addEventListener('click', () => {
    document.querySelectorAll('.problem-card').forEach((card) => card.classList.remove('selected'));
    button.classList.add('selected');
    diagnostic.classList.remove('hidden');
    if (problem.id === 'wifi') {
      wifiHistory = [];
      showWifiNode('connected');
    } else {
      showChecklist(problem.title, problem.steps);
    }
    diagnostic.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  list.appendChild(button);
});

function clearDiagnostic(title, introText) {
  diagnostic.replaceChildren();
  const titleEl = document.createElement('h2');
  titleEl.textContent = title;
  const intro = document.createElement('p');
  intro.className = 'muted';
  intro.textContent = introText;
  diagnostic.append(titleEl, intro);
}

function makeButton(text, onClick, secondary = false) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = secondary ? 'reset secondary' : 'reset';
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}

function showWifiNode(nodeId) {
  const node = wifiFlow[nodeId];
  const isResult = Array.isArray(node.steps);
  clearDiagnostic(isResult ? 'Résultat du diagnostic Wi-Fi' : 'Diagnostic guidé : Wi-Fi',
    isResult ? node.explanation : 'Répondez à la question pour recevoir des conseils adaptés.');

  const progressLabel = document.createElement('p');
  progressLabel.className = 'step-counter';
  progressLabel.textContent = isResult ? 'Conseils personnalisés' : `Question ${wifiHistory.length + 1}`;
  diagnostic.append(progressLabel);

  if (isResult) {
    const resultTitle = document.createElement('h3');
    resultTitle.textContent = node.title;
    diagnostic.append(resultTitle);
    appendChecklist(node.steps);
  } else {
    const question = document.createElement('h3');
    question.textContent = node.question;
    diagnostic.append(question);
    const answers = document.createElement('div');
    answers.className = 'answer-grid';
    node.answers.forEach((answer) => {
      answers.appendChild(makeButton(answer.label, () => {
        wifiHistory.push(nodeId);
        showWifiNode(answer.next);
      }));
    });
    diagnostic.append(answers);
  }

  const actions = document.createElement('div');
  actions.className = 'actions';
  if (wifiHistory.length > 0) {
    actions.appendChild(makeButton('← Question précédente', () => {
      const previousNode = wifiHistory.pop();
      showWifiNode(previousNode);
    }, true));
  }
  actions.appendChild(makeButton('Recommencer le diagnostic', () => {
    wifiHistory = [];
    showWifiNode('connected');
  }, true));
  diagnostic.append(actions);
}

function showChecklist(title, steps) {
  clearDiagnostic(`Diagnostic : ${title}`, 'Cochez les étapes après les avoir effectuées.');
  appendChecklist(steps);
}

function appendChecklist(steps) {
  const progress = document.createElement('div');
  progress.className = 'progress';
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-label', 'Étapes de dépannage terminées');
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', String(steps.length));
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  progress.appendChild(bar);
  const stepsContainer = document.createElement('div');
  const status = document.createElement('p');
  status.className = 'status';
  status.setAttribute('aria-live', 'polite');

  steps.forEach((step, index) => {
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

  const reset = makeButton('Décocher les étapes', () => {
    stepsContainer.querySelectorAll('input').forEach((input) => { input.checked = false; });
    updateProgress();
  }, true);
  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.append(reset, status);
  diagnostic.append(progress, stepsContainer, actions);
  updateProgress();

  function updateProgress() {
    const completed = stepsContainer.querySelectorAll('input:checked').length;
    bar.style.width = `${(completed / steps.length) * 100}%`;
    progress.setAttribute('aria-valuenow', String(completed));
    status.textContent = completed === steps.length
      ? 'Toutes les étapes sont terminées. Si le problème persiste, contactez un technicien.'
      : `${completed} étape(s) sur ${steps.length} terminée(s)`;
  }
}
