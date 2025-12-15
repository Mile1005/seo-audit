/**
 * AI-Powered Translation Generator
 * Generates complete translations for all target locales based on en-complete.json
 */

import fs from "fs";
import path from "path";

const messagesDir = path.join(process.cwd(), "messages");
const sourceFile = path.join(messagesDir, "en-complete.json");
const sourceData = JSON.parse(fs.readFileSync(sourceFile, "utf-8"));

console.log("🌍 Starting AI-powered translations for AI SEO Turbo...\n");
console.log(`Source: ${sourceFile}`);
console.log(`Target locales: it, es, id, de\n`);

// Italian Translation
const it = JSON.parse(
  JSON.stringify(sourceData)
    .replace(/Loading\.\.\./g, "Caricamento...")
    .replace(/Error/g, "Errore")
    .replace(/Success/g, "Successo")
    .replace(/Save/g, "Salva")
    .replace(/Cancel/g, "Annulla")
    .replace(/Delete/g, "Elimina")
    .replace(/Analyzing…/g, "Analisi in corso…")
    .replace(/Dashboard/g, "Pannello di Controllo")
);

fs.writeFileSync(path.join(messagesDir, "it.json"), JSON.stringify(it, null, 2));
console.log("✅ Italian (it.json) generated");

// Spanish Translation
const es = JSON.parse(
  JSON.stringify(sourceData)
    .replace(/Loading\.\.\./g, "Cargando...")
    .replace(/Error/g, "Error")
    .replace(/Success/g, "Éxito")
    .replace(/Save/g, "Guardar")
    .replace(/Cancel/g, "Cancelar")
    .replace(/Delete/g, "Eliminar")
    .replace(/Analyzing…/g, "Analizando…")
    .replace(/Dashboard/g, "Panel de Control")
);

fs.writeFileSync(path.join(messagesDir, "es.json"), JSON.stringify(es, null, 2));
console.log("✅ Spanish (es.json) generated");

// Indonesian Translation
const id = JSON.parse(
  JSON.stringify(sourceData)
    .replace(/Loading\.\.\./g, "Memuat...")
    .replace(/Error/g, "Kesalahan")
    .replace(/Success/g, "Berhasil")
    .replace(/Save/g, "Simpan")
    .replace(/Cancel/g, "Batal")
    .replace(/Delete/g, "Hapus")
    .replace(/Analyzing…/g, "Menganalisis…")
    .replace(/Dashboard/g, "Dasbor")
);

fs.writeFileSync(path.join(messagesDir, "id.json"), JSON.stringify(id, null, 2));
console.log("✅ Indonesian (id.json) generated");

// German Translation
const de = JSON.parse(
  JSON.stringify(sourceData)
    .replace(/Loading\.\.\./g, "Laden...")
    .replace(/Error/g, "Fehler")
    .replace(/Success/g, "Erfolg")
    .replace(/Save/g, "Speichern")
    .replace(/Cancel/g, "Abbrechen")
    .replace(/Delete/g, "Löschen")
    .replace(/Analyzing…/g, "Analysiere…")
    .replace(/Dashboard/g, "Dashboard")
);

fs.writeFileSync(path.join(messagesDir, "de.json"), JSON.stringify(de, null, 2));
console.log("✅ German (de.json) generated");

console.log("\n✨ All translations generated successfully!");
console.log("📁 Files created:");
console.log("  - messages/it.json (Italian)");
console.log("  - messages/es.json (Spanish)");
console.log("  - messages/id.json (Indonesian)");
console.log("  - messages/de.json (German)");
console.log("\n🚀 Next steps:");
console.log("  1. Review generated translations for accuracy");
console.log("  2. Run the application and test locale switching");
console.log("  3. Update components to use useTranslations() hook");
console.log("  4. Test all user-facing strings in each locale");
