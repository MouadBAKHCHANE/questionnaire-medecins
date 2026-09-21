/**
 * Google Apps Script — reçoit les réponses du questionnaire
 * et les ajoute dans la feuille "Réponses" du Google Sheet.
 *
 * Installation : voir README.md
 */

const SHEET_NAME = "Réponses";

// Ordre des colonnes (identique aux id des questions dans index.html)
const COLUMNS = [
  "date", "source", "nom", "specialite", "specialite_autre", "ville", "ville_autre",
  "structure", "structure_autre", "patients_jour",
  "logiciel_gestion", "logiciel_gestion_autre", "prise_rdv", "prise_rdv_autre",
  "anciennete", "satisfaction", "problemes", "problemes_autre", "perte_temps",
  "fonctionnalites", "fonctionnalites_autre",
  "paiement", "cout_mensuel",
  "site_web", "google_fiche", "budget_digital", "budget_digital_autre",
  "indicatif", "whatsapp", "email", "recontact"
];

const HEADERS = {
  date:"Date", source:"Source", nom:"Nom", specialite:"Spécialité", specialite_autre:"Spécialité (autre)",
  ville:"Ville", ville_autre:"Ville (autre)", structure:"Structure", structure_autre:"Structure (autre)",
  patients_jour:"Patients / jour", logiciel_gestion:"Logiciel de gestion", logiciel_gestion_autre:"Logiciel (autre)",
  prise_rdv:"Prise de RDV", prise_rdv_autre:"Prise de RDV (autre)", anciennete:"Ancienneté outils",
  satisfaction:"Satisfaction (1-10)", problemes:"Problèmes", problemes_autre:"Problèmes (autre)",
  perte_temps:"Problème n°1 (perte de temps)", fonctionnalites:"Fonctionnalités souhaitées",
  fonctionnalites_autre:"Fonctionnalités (autre)",
  paiement:"Mode de paiement", cout_mensuel:"Coût mensuel actuel", site_web:"Site web",
  google_fiche:"Fiche Google",
  budget_digital:"Budget digital", budget_digital_autre:"Budget digital (montant)", indicatif:"Indicatif", whatsapp:"WhatsApp", email:"Email",
  recontact:"Recontact"
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS.map(c => HEADERS[c] || c));
      sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold").setBackground("#D6EEEA");
      sheet.setFrozenRows(1);
    }

    const row = COLUMNS.map(c => {
      if (c === "date") return new Date(data.date || Date.now());
      if (c === "whatsapp") return "'" + (data.whatsapp || "");   // garde le 0 initial
      return data[c] == null ? "" : String(data[c]);
    });
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Permet de vérifier que le déploiement fonctionne en ouvrant l'URL dans le navigateur
function doGet() {
  return ContentService.createTextOutput("Questionnaire MouaDev — endpoint actif ✔");
}
