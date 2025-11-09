/*
 Checks that all locales have complete translation coverage relative to en.
 - Verifies key parity across en/fr/it/es/id/de
 - Optionally asserts presence of server.* keys if present in base
 Exits with non-zero code on any failure.
*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES = ['en', 'fr', 'it', 'es', 'id', 'de'];
const MESSAGES_DIR = path.resolve(__dirname, '../../messages');

function loadMessages(locale) {
	const file = path.join(MESSAGES_DIR, `${locale}.json`);
	if (!fs.existsSync(file)) {
		throw new Error(`Missing messages file: ${file}`);
	}
	return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function flatten(obj, prefix = '', out = {}) {
	for (const [k, v] of Object.entries(obj || {})) {
		const key = prefix ? `${prefix}.${k}` : k;
		if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
		else out[key] = v;
	}
	return out;
}

function getSeoCheckIds() {
	// Keep in sync with lib/i18n-server.ts SEO_CHECK_IDS
	return [
		'site_crawlability','xml_sitemap','robots_txt','url_structure','internal_linking','canonical_tags','schema_markup','https_implementation','redirect_chains','error_404',
		'core_web_vitals','image_optimization','css_js_optimization','server_response','browser_caching','cdn_implementation','lazy_loading','font_optimization','third_party_scripts','database_optimization',
		'mobile_first_indexing','responsive_design','touch_targets','viewport_config','mobile_speed','app_store_optimization','amp_implementation','mobile_usability',
		'title_tags','meta_descriptions','header_structure','keyword_density','content_length','readability','internal_link_strategy','image_alt_text','content_freshness','duplicate_content','content_quality','structured_content',
		'backlink_profile','anchor_text_distribution','domain_authority','toxic_links','link_velocity','broken_backlinks','competitor_backlinks'
	];
}

function main() {
	const base = loadMessages('en');
	const baseFlat = flatten(base);
	const seoIds = getSeoCheckIds();

	let errors = 0;

	for (const locale of LOCALES) {
		const msgs = loadMessages(locale);
		const flat = flatten(msgs);

		// Key parity
		const missing = Object.keys(baseFlat).filter((k) => !(k in flat));
		const extra = Object.keys(flat).filter((k) => !(k in baseFlat));
		if (missing.length) {
			console.error(`[i18n] ${locale} missing ${missing.length} keys:\n - ${missing.slice(0, 20).join('\n - ')}${missing.length>20?'\n   ...':''}`);
			errors++;
		}
		if (extra.length) {
			console.warn(`[i18n] ${locale} has ${extra.length} extra keys (ok):\n - ${extra.slice(0, 10).join('\n - ')}${extra.length>10?'\n   ...':''}`);
		}

		const hasServerChecks = Object.keys(baseFlat).some((k) => k.startsWith('server.audit.checks.'));
		if (hasServerChecks) {
			const missingChecks = [];
			for (const id of seoIds) {
				const nameK = `server.audit.checks.${id}.name`;
				const descK = `server.audit.checks.${id}.description`;
				if (!(nameK in flat)) missingChecks.push(nameK);
				if (!(descK in flat)) missingChecks.push(descK);
			}
			if (missingChecks.length) {
				console.error(`[i18n] ${locale} missing audit check translations (${missingChecks.length}):\n - ${missingChecks.slice(0, 20).join('\n - ')}${missingChecks.length>20?'\n   ...':''}`);
				errors++;
			}
		}

		const hasServerNotifications = Object.keys(baseFlat).some((k) => k.startsWith('server.notifications.'));
		if (hasServerNotifications) {
			const titleKey = 'server.notifications.audit_complete.title';
			const msgKey = 'server.notifications.audit_complete.message';
			const title = flat[titleKey];
			const message = flat[msgKey];
			if (!title || !/\{\s*domain\s*\}/.test(title)) {
				console.warn(`[i18n] ${locale} notification title may miss {domain} placeholder: ${titleKey}`);
			}
			if (!message || !/\{\s*score\s*\}/.test(message)) {
				console.warn(`[i18n] ${locale} notification message may miss {score} placeholder: ${msgKey}`);
			}
		}
	}

	if (errors > 0) {
		console.error(`\n[i18n] FAILED with ${errors} error group(s).`);
		process.exit(1);
	} else {
		console.log('[i18n] All locale message files look good.');
	}
}

main();
