const fs = require('fs');
const path = require('path');

const translations = {
  en: {
    title: "Get Your Free SEO Checklist",
    description: "Join 10,000+ marketers getting actionable SEO insights delivered weekly",
    placeholder: "Enter your email address",
    ctaText: "Get Free Checklist",
    sending: "Sending...",
    trustSignal: "📧 No spam, unsubscribe anytime • 🔒 Your data is secure",
    success: {
      title: "Success! Check Your Email",
      message: "Your free SEO checklist is on its way. Don't forget to check your spam folder!",
      downloadHint: "Download link sent to your email"
    }
  },
  fr: {
    title: "Obtenez Votre Liste de Contrôle SEO Gratuite",
    description: "Rejoignez plus de 10 000 spécialistes du marketing recevant chaque semaine des insights SEO actionnables",
    placeholder: "Entrez votre adresse email",
    ctaText: "Obtenir la Liste Gratuite",
    sending: "Envoi en cours...",
    trustSignal: "📧 Pas de spam, désinscription à tout moment • 🔒 Vos données sont sécurisées",
    success: {
      title: "Succès ! Vérifiez Votre Email",
      message: "Votre liste de contrôle SEO gratuite est en route. N'oubliez pas de vérifier votre dossier spam !",
      downloadHint: "Lien de téléchargement envoyé à votre email"
    }
  },
  es: {
    title: "Obtenga Su Lista de Verificación SEO Gratuita",
    description: "Únase a más de 10,000 especialistas en marketing que reciben insights SEO accionables semanalmente",
    placeholder: "Ingrese su dirección de correo electrónico",
    ctaText: "Obtener Lista Gratuita",
    sending: "Enviando...",
    trustSignal: "📧 Sin spam, cancele en cualquier momento • 🔒 Sus datos están seguros",
    success: {
      title: "¡Éxito! Verifique Su Correo",
      message: "Su lista de verificación SEO gratuita está en camino. ¡No olvide revisar su carpeta de spam!",
      downloadHint: "Enlace de descarga enviado a su correo"
    }
  },
  de: {
    title: "Erhalten Sie Ihre Kostenlose SEO-Checkliste",
    description: "Schließen Sie sich über 10.000 Marketingexperten an, die wöchentlich umsetzbare SEO-Insights erhalten",
    placeholder: "Geben Sie Ihre E-Mail-Adresse ein",
    ctaText: "Kostenlose Checkliste Erhalten",
    sending: "Wird gesendet...",
    trustSignal: "📧 Kein Spam, jederzeit abbestellen • 🔒 Ihre Daten sind sicher",
    success: {
      title: "Erfolg! Überprüfen Sie Ihre E-Mail",
      message: "Ihre kostenlose SEO-Checkliste ist unterwegs. Vergessen Sie nicht, Ihren Spam-Ordner zu überprüfen!",
      downloadHint: "Download-Link an Ihre E-Mail gesendet"
    }
  },
  it: {
    title: "Ottieni la Tua Lista di Controllo SEO Gratuita",
    description: "Unisciti a oltre 10.000 professionisti del marketing che ricevono insights SEO azionabili settimanalmente",
    placeholder: "Inserisci il tuo indirizzo email",
    ctaText: "Ottieni Lista Gratuita",
    sending: "Invio in corso...",
    trustSignal: "📧 Niente spam, disiscriviti in qualsiasi momento • 🔒 I tuoi dati sono al sicuro",
    success: {
      title: "Successo! Controlla la Tua Email",
      message: "La tua lista di controllo SEO gratuita è in arrivo. Non dimenticare di controllare la cartella spam!",
      downloadHint: "Link di download inviato alla tua email"
    }
  },
  id: {
    title: "Dapatkan Daftar Periksa SEO Gratis Anda",
    description: "Bergabunglah dengan lebih dari 10.000 pemasar yang menerima wawasan SEO yang dapat ditindaklanjuti setiap minggu",
    placeholder: "Masukkan alamat email Anda",
    ctaText: "Dapatkan Daftar Gratis",
    sending: "Mengirim...",
    trustSignal: "📧 Tanpa spam, berhenti berlangganan kapan saja • 🔒 Data Anda aman",
    success: {
      title: "Berhasil! Periksa Email Anda",
      message: "Daftar periksa SEO gratis Anda sedang dalam perjalanan. Jangan lupa periksa folder spam Anda!",
      downloadHint: "Link unduhan dikirim ke email Anda"
    }
  }
};

// Update each locale file
Object.keys(translations).forEach(locale => {
  const filePath = path.join(__dirname, '..', 'messages', `${locale}.json`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Add the emailCapture section
    data.emailCapture = translations[locale];
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Updated ${locale}.json with emailCapture translations`);
  } catch (error) {
    console.error(`❌ Error updating ${locale}.json:`, error.message);
  }
});

console.log('\n🎉 All locale files updated with emailCapture translations!');
