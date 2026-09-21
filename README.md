# Questionnaire médecins → Google Sheet

Deux fichiers : `index.html` (la page) et `Code.gs` (le script Google). Mise en place en 10 minutes.

## 1. Créer le Google Sheet et le script

1. Ouvre [sheets.new](https://sheets.new), nomme la feuille (ex. « Réponses médecins »).
2. Menu **Extensions → Apps Script**.
3. Supprime le contenu de l'éditeur, colle tout `Code.gs`, enregistre (Ctrl+S).
4. En haut à droite : **Déployer → Nouveau déploiement**.
5. Clique l'engrenage ⚙ à côté de « Sélectionner le type » → **Application Web**.
6. Réglages :
   - Description : `Questionnaire médecins`
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde** (indispensable, sinon la page ne pourra pas écrire)
7. **Déployer** → Google demande une autorisation : *Autoriser l'accès* → choisis ton compte → « Paramètres avancés » → « Accéder à … (non sécurisé) » → Autoriser. (Écran normal pour un script perso.)
8. Copie l'**URL de l'application Web** (elle finit par `/exec`).

Test rapide : ouvre cette URL dans ton navigateur → tu dois voir « endpoint actif ✔ ».

## 2. Brancher la page

Dans `index.html`, ligne ~110 :

```js
const SHEET_URL = "COLLE_ICI_L_URL_DE_TON_APPS_SCRIPT";
const SITE_URL  = "https://mouadev.com";
```

Remplace par ton URL `/exec` et ton site. C'est tout.

## 3. Héberger la page

N'importe quel hébergement statique :

- **Sur ton site** : dépose `index.html` dans un dossier, ex. `mouadev.com/medecins/`.
- **Vercel / Netlify** (gratuit) : glisse-dépose le dossier sur [app.netlify.com/drop](https://app.netlify.com/drop) → URL en 10 secondes.

Puis teste une fois en remplissant le formulaire : une ligne apparaît dans l'onglet « Réponses » du Sheet (les en-têtes se créent automatiquement à la première réponse).

## 4. Suivre d'où viennent les réponses

Ajoute `?source=` au lien selon le canal :

- `…/medecins/?source=whatsapp`
- `…/medecins/?source=instagram`
- `…/medecins/?source=email`

La colonne **Source** du Sheet se remplit automatiquement.

## Modifier les questions

Tout est dans le tableau `Q` de `index.html` : chaque question a un `id`, un `type` (`text`, `select`, `single`, `multi`, `scale`, `long`, `phone`, `email`), ses options `o`, et éventuellement `showIf` pour la logique conditionnelle. Si tu ajoutes une question, ajoute aussi son `id` dans `COLUMNS` de `Code.gs` (et un libellé dans `HEADERS`), puis redéploie le script (**Déployer → Gérer les déploiements → ✎ → Nouvelle version**).

## Couleurs

En haut du CSS (`:root`) : fond `#F6FAFB`, texte `#0B2E3A`, accent `#0F766E`. Change `--accent` pour adapter à ta charte.
