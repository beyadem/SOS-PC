# SOS PC — Assistant de dépannage informatique

**SOS PC** est une application web gratuite qui aide à résoudre les problèmes informatiques courants, avec des explications simples.

## Nouveauté de la version 1.1

- **Diagnostic Wi-Fi interactif :** l'utilisateur répond à 2 ou 3 questions, puis obtient des conseils adaptés à sa situation.
- **Retour en arrière** et **recommencement** du diagnostic.
- Guides de dépannage classiques pour les PC lents, les imprimantes et le son.
- Étapes à cocher, compteur et barre de progression.
- Interface responsive (ordinateur et téléphone).

## Utilisation

Ouvrez `index.html` dans un navigateur ou visitez le site GitHub Pages du projet.
Aucune inscription et aucune installation ne sont nécessaires.

## Technologies

HTML, CSS et JavaScript — sans bibliothèque ni serveur.

## Organisation

- `index.html` : structure de la page et chargement des fichiers.
- `style.css` : design et adaptation aux écrans.
- `script.js` : catégories, questions du diagnostic et interactions.

## Comment fonctionne le questionnaire Wi-Fi ?

Dans `script.js`, l'objet `wifiFlow` décrit un **arbre de décision** :
chaque réponse (`next`) envoie vers une autre question ou vers un résultat (`steps`).
La variable `wifiHistory` mémorise les questions parcourues pour permettre de revenir en arrière.

## Limites et sécurité

SOS PC **ne réalise pas de diagnostic automatique** du système : les résultats dépendent des réponses de l'utilisateur et sont indicatifs.
Il ne récupère ni mot de passe, ni donnée personnelle, et ne modifie aucun réglage automatiquement.
En cas de doute sur une machine d'entreprise, demandez l'aide du support informatique.

## Idées pour la suite

- Questionnaire guidé pour les problèmes d'imprimante et de son.
- Recherche par mot-clé.
- Conseils simples de cybersécurité.
