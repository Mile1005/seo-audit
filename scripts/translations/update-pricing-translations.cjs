const fs = require("fs");
const path = require("path");

const locales = {
  es: {
    hero: {
      badge: "Oferta Limitada: 60% de Descuento en Todos los Planes",
      title1: "Elige Tu",
      title2: "Plan de Éxito SEO",
      subtitle:
        "Transforma tu sitio web con auditorías SEO impulsadas por IA. Obtén insights accionables, mejora tus rankings y aumenta tu tráfico orgánico con nuestra plataforma de optimización inteligente.",
      billing: {
        monthly: "Mensual",
        yearly: "Anual",
        saveLabel: "Ahorra 20%",
      },
    },
    plans: {
      starter: {
        name: "Principiante",
        description: "Perfecto para sitios web pequeños y principiantes",
        cta: "Comenzar Gratis",
        popular: false,
        features: {
          feature1: "1 auditoría de sitio web por mes",
          feature2: "Recomendaciones SEO básicas",
          feature3: "Detección de problemas técnicos",
          feature4: "Análisis de meta tags",
          feature5: "Soporte por email",
        },
        limitations: {
          limit1: "Limitado a 10 páginas por auditoría",
          limit2: "Sin soporte prioritario",
          limit3: "Solo informes básicos",
        },
      },
      professional: {
        name: "Profesional",
        description: "Ideal para empresas en crecimiento y agencias",
        cta: "Iniciar Profesional",
        popular: true,
        popularBadge: "Más Popular",
        features: {
          feature1: "10 auditorías de sitio web por mes",
          feature2: "Recomendaciones SEO avanzadas",
          feature3: "Análisis de competencia",
          feature4: "Sugerencias de optimización de contenido",
          feature5: "Monitoreo de rendimiento",
          feature6: "Soporte por email prioritario",
          feature7: "Informes personalizados",
          feature8: "Acceso API",
        },
        limitations: {
          limit1: "Limitado a 100 páginas por auditoría",
          limit2: "Sin soporte telefónico",
        },
      },
      enterprise: {
        name: "Empresa",
        description: "Para grandes organizaciones con necesidades complejas",
        cta: "Contactar Ventas",
        popular: false,
        features: {
          feature1: "Auditorías de sitio web ilimitadas",
          feature2: "Informes de marca blanca",
          feature3: "Seguimiento avanzado de competencia",
          feature4: "Integraciones personalizadas",
          feature5: "Gerente de cuenta dedicado",
          feature6: "Soporte telefónico",
          feature7: "Garantía SLA",
          feature8: "Sesiones de capacitación personalizadas",
          feature9: "Funciones API avanzadas",
        },
        limitations: {},
      },
      billing: {
        monthly: "mes",
        yearly: "mes, facturado anualmente",
        discount: "60% DE DESCUENTO",
      },
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber sobre nuestra plataforma SEO con IA",
      questions: {
        q1: {
          question: "¿Cómo funciona la auditoría SEO con IA?",
          answer:
            "Nuestra IA analiza la estructura técnica de tu sitio web, la calidad del contenido, métricas de rendimiento y factores SEO. Luego proporciona recomendaciones personalizadas basadas en las mejores prácticas actuales y directrices de motores de búsqueda.",
        },
        q2: {
          question: "¿Puedo cambiar de plan en cualquier momento?",
          answer:
            "¡Sí! Puedes cambiar tu plan en cualquier momento. Las actualizaciones toman efecto inmediatamente, mientras que las bajadas de nivel toman efecto en tu próximo ciclo de facturación.",
        },
        q3: {
          question: "¿Ofrecen reembolsos?",
          answer:
            "Ofrecemos una garantía de devolución de dinero de 30 días para todos los planes de pago. Si no estás satisfecho, contacta a nuestro equipo de soporte para un reembolso completo.",
        },
        q4: {
          question: "¿Qué tan precisas son las recomendaciones de la IA?",
          answer:
            "Nuestra IA está entrenada en millones de sitios web y se actualiza constantemente con las últimas prácticas SEO. Las recomendaciones tienen una tasa de precisión del 95%+ y son validadas regularmente por expertos SEO.",
        },
        q5: {
          question: "¿Hay una prueba gratuita disponible?",
          answer:
            "¡Sí! Nuestro plan Principiante es completamente gratuito e incluye 1 auditoría de sitio web por mes. No se requiere tarjeta de crédito para comenzar.",
        },
        q6: {
          question: "¿Qué tipo de soporte proporcionan?",
          answer:
            "Ofrecemos soporte por email para todos los planes, soporte por email prioritario para usuarios Profesionales y soporte telefónico dedicado para clientes Empresariales. Los tiempos de respuesta varían según el nivel del plan.",
        },
      },
    },
    testimonials: {
      title: "Con la Confianza de Más de 10,000 Empresas",
      subtitle:
        "Descubre cómo nuestras auditorías SEO impulsadas por IA han transformado empresas en todo el mundo",
      items: {
        testimonial1: {
          name: "Sarah Chen",
          role: "Directora de Marketing",
          company: "TechFlow Solutions",
          content:
            "AI SEO Turbo transformó el rendimiento de nuestro sitio web. Vimos un aumento del 150% en el tráfico orgánico en 3 meses.",
          rating: 5,
        },
        testimonial2: {
          name: "Mike Rodriguez",
          role: "Especialista SEO",
          company: "Digital Growth Agency",
          content:
            "Los insights impulsados por IA son increíbles. Detectó problemas que nuestras herramientas anteriores pasaron por alto y proporcionó soluciones accionables.",
          rating: 5,
        },
        testimonial3: {
          name: "Emily Watson",
          role: "Gerente de E-commerce",
          company: "StyleHub Retail",
          content:
            "Nuestra tasa de conversión mejoró un 40% después de implementar las optimizaciones recomendadas. El ROI fue inmediato.",
          rating: 5,
        },
      },
    },
    cta: {
      title: "¿Listo para Transformar tu SEO?",
      subtitle:
        "Únete a miles de empresas que ya están impulsando su tráfico orgánico con insights SEO impulsados por IA. Comienza tu auditoría gratuita hoy y ve la diferencia que la optimización inteligente puede hacer.",
      primaryButton: "Iniciar Auditoría Gratuita",
      secondaryButton: "Contactar Ventas",
      emailPlaceholder: "Ingresa tu email para consejos SEO exclusivos",
      emailCta: "Obtener Consejos SEO",
    },
  },
  de: {
    hero: {
      badge: "Limitiertes Angebot: 60% Rabatt auf Alle Pläne",
      title1: "Wählen Sie Ihren",
      title2: "SEO-Erfolgsplan",
      subtitle:
        "Transformieren Sie Ihre Website mit KI-gesteuerten SEO-Audits. Erhalten Sie umsetzbare Erkenntnisse, steigern Sie Ihre Rankings und erhöhen Sie Ihren organischen Traffic mit unserer intelligenten Optimierungsplattform.",
      billing: {
        monthly: "Monatlich",
        yearly: "Jährlich",
        saveLabel: "Sparen Sie 20%",
      },
    },
    plans: {
      starter: {
        name: "Starter",
        description: "Perfekt für kleine Websites und Anfänger",
        cta: "Kostenlos Starten",
        popular: false,
        features: {
          feature1: "1 Website-Audit pro Monat",
          feature2: "Grundlegende SEO-Empfehlungen",
          feature3: "Erkennung technischer Probleme",
          feature4: "Meta-Tags-Analyse",
          feature5: "E-Mail-Support",
        },
        limitations: {
          limit1: "Begrenzt auf 10 Seiten pro Audit",
          limit2: "Kein vorrangiger Support",
          limit3: "Nur grundlegende Berichte",
        },
      },
      professional: {
        name: "Professional",
        description: "Ideal für wachsende Unternehmen und Agenturen",
        cta: "Professional Starten",
        popular: true,
        popularBadge: "Am Beliebtesten",
        features: {
          feature1: "10 Website-Audits pro Monat",
          feature2: "Erweiterte SEO-Empfehlungen",
          feature3: "Konkurrenzanalyse",
          feature4: "Vorschläge zur Content-Optimierung",
          feature5: "Leistungsüberwachung",
          feature6: "Vorrangiger E-Mail-Support",
          feature7: "Benutzerdefinierte Berichte",
          feature8: "API-Zugriff",
        },
        limitations: {
          limit1: "Begrenzt auf 100 Seiten pro Audit",
          limit2: "Kein Telefon-Support",
        },
      },
      enterprise: {
        name: "Enterprise",
        description: "Für große Organisationen mit komplexen Anforderungen",
        cta: "Vertrieb Kontaktieren",
        popular: false,
        features: {
          feature1: "Unbegrenzte Website-Audits",
          feature2: "White-Label-Berichte",
          feature3: "Erweitertes Konkurrenz-Tracking",
          feature4: "Benutzerdefinierte Integrationen",
          feature5: "Dedizierter Account Manager",
          feature6: "Telefon-Support",
          feature7: "SLA-Garantie",
          feature8: "Individuelle Schulungssitzungen",
          feature9: "Erweiterte API-Funktionen",
        },
        limitations: {},
      },
      billing: {
        monthly: "Monat",
        yearly: "Monat, jährlich abgerechnet",
        discount: "60% RABATT",
      },
    },
    faq: {
      title: "Häufig Gestellte Fragen",
      subtitle: "Alles, was Sie über unsere KI-SEO-Plattform wissen müssen",
      questions: {
        q1: {
          question: "Wie funktioniert das KI-SEO-Audit?",
          answer:
            "Unsere KI analysiert die technische Struktur Ihrer Website, die Content-Qualität, Leistungsmetriken und SEO-Faktoren. Anschließend liefert sie personalisierte Empfehlungen basierend auf aktuellen Best Practices und Suchmaschinen-Richtlinien.",
        },
        q2: {
          question: "Kann ich meinen Plan jederzeit ändern?",
          answer:
            "Ja! Sie können Ihren Plan jederzeit ändern. Upgrades treten sofort in Kraft, während Downgrades mit Ihrem nächsten Abrechnungszyklus wirksam werden.",
        },
        q3: {
          question: "Bieten Sie Rückerstattungen an?",
          answer:
            "Wir bieten eine 30-Tage-Geld-zurück-Garantie für alle bezahlten Pläne. Wenn Sie nicht zufrieden sind, kontaktieren Sie unser Support-Team für eine vollständige Rückerstattung.",
        },
        q4: {
          question: "Wie genau sind die KI-Empfehlungen?",
          answer:
            "Unsere KI ist auf Millionen von Websites trainiert und wird ständig mit den neuesten SEO-Best Practices aktualisiert. Empfehlungen haben eine Genauigkeit von über 95% und werden regelmäßig von SEO-Experten validiert.",
        },
        q5: {
          question: "Gibt es eine kostenlose Testversion?",
          answer:
            "Ja! Unser Starter-Plan ist komplett kostenlos und beinhaltet 1 Website-Audit pro Monat. Keine Kreditkarte zum Starten erforderlich.",
        },
        q6: {
          question: "Welche Art von Support bieten Sie?",
          answer:
            "Wir bieten E-Mail-Support für alle Pläne, vorrangigen E-Mail-Support für Professional-Nutzer und dedizierten Telefon-Support für Enterprise-Kunden. Die Antwortzeiten variieren je nach Plan-Level.",
        },
      },
    },
    testimonials: {
      title: "Von Über 10.000 Unternehmen Vertraut",
      subtitle:
        "Sehen Sie, wie unsere KI-gesteuerten SEO-Audits Unternehmen weltweit transformiert haben",
      items: {
        testimonial1: {
          name: "Sarah Chen",
          role: "Marketing-Direktorin",
          company: "TechFlow Solutions",
          content:
            "AI SEO Turbo hat die Leistung unserer Website transformiert. Wir sahen eine Steigerung des organischen Traffics um 150% innerhalb von 3 Monaten.",
          rating: 5,
        },
        testimonial2: {
          name: "Mike Rodriguez",
          role: "SEO-Spezialist",
          company: "Digital Growth Agency",
          content:
            "Die KI-gesteuerten Insights sind unglaublich. Es hat Probleme erkannt, die unsere vorherigen Tools übersehen haben, und lieferte umsetzbare Lösungen.",
          rating: 5,
        },
        testimonial3: {
          name: "Emily Watson",
          role: "E-Commerce-Managerin",
          company: "StyleHub Retail",
          content:
            "Unsere Conversion-Rate verbesserte sich um 40% nach Umsetzung der empfohlenen Optimierungen. Der ROI war sofort.",
          rating: 5,
        },
      },
    },
    cta: {
      title: "Bereit, Ihr SEO zu Transformieren?",
      subtitle:
        "Schließen Sie sich Tausenden von Unternehmen an, die bereits ihren organischen Traffic mit KI-gesteuerten SEO-Insights steigern. Starten Sie noch heute Ihr kostenloses Audit und sehen Sie den Unterschied, den intelligente Optimierung machen kann.",
      primaryButton: "Kostenloses Audit Starten",
      secondaryButton: "Vertrieb Kontaktieren",
      emailPlaceholder: "Geben Sie Ihre E-Mail für exklusive SEO-Tipps ein",
      emailCta: "SEO-Tipps Erhalten",
    },
  },
  it: {
    hero: {
      badge: "Offerta Limitata: 60% di Sconto su Tutti i Piani",
      title1: "Scegli il Tuo",
      title2: "Piano di Successo SEO",
      subtitle:
        "Trasforma il tuo sito web con audit SEO potenziati dall'IA. Ottieni insights azionabili, migliora il tuo posizionamento e aumenta il traffico organico con la nostra piattaforma di ottimizzazione intelligente.",
      billing: {
        monthly: "Mensile",
        yearly: "Annuale",
        saveLabel: "Risparmia 20%",
      },
    },
    plans: {
      starter: {
        name: "Starter",
        description: "Perfetto per piccoli siti web e principianti",
        cta: "Inizia Gratis",
        popular: false,
        features: {
          feature1: "1 audit del sito web al mese",
          feature2: "Raccomandazioni SEO di base",
          feature3: "Rilevamento problemi tecnici",
          feature4: "Analisi meta tag",
          feature5: "Supporto via email",
        },
        limitations: {
          limit1: "Limitato a 10 pagine per audit",
          limit2: "Nessun supporto prioritario",
          limit3: "Solo report di base",
        },
      },
      professional: {
        name: "Professional",
        description: "Ideale per aziende in crescita e agenzie",
        cta: "Inizia Professional",
        popular: true,
        popularBadge: "Più Popolare",
        features: {
          feature1: "10 audit del sito web al mese",
          feature2: "Raccomandazioni SEO avanzate",
          feature3: "Analisi della concorrenza",
          feature4: "Suggerimenti per l'ottimizzazione dei contenuti",
          feature5: "Monitoraggio delle prestazioni",
          feature6: "Supporto email prioritario",
          feature7: "Report personalizzati",
          feature8: "Accesso API",
        },
        limitations: {
          limit1: "Limitato a 100 pagine per audit",
          limit2: "Nessun supporto telefonico",
        },
      },
      enterprise: {
        name: "Enterprise",
        description: "Per grandi organizzazioni con esigenze complesse",
        cta: "Contatta Vendite",
        popular: false,
        features: {
          feature1: "Audit del sito web illimitati",
          feature2: "Report in white label",
          feature3: "Tracking avanzato della concorrenza",
          feature4: "Integrazioni personalizzate",
          feature5: "Account manager dedicato",
          feature6: "Supporto telefonico",
          feature7: "Garanzia SLA",
          feature8: "Sessioni di formazione personalizzate",
          feature9: "Funzionalità API avanzate",
        },
        limitations: {},
      },
      billing: {
        monthly: "mese",
        yearly: "mese, fatturato annualmente",
        discount: "60% DI SCONTO",
      },
    },
    faq: {
      title: "Domande Frequenti",
      subtitle: "Tutto quello che devi sapere sulla nostra piattaforma SEO IA",
      questions: {
        q1: {
          question: "Come funziona l'audit SEO IA?",
          answer:
            "La nostra IA analizza la struttura tecnica del tuo sito web, la qualità dei contenuti, le metriche delle prestazioni e i fattori SEO. Fornisce quindi raccomandazioni personalizzate basate sulle migliori pratiche attuali e le linee guida dei motori di ricerca.",
        },
        q2: {
          question: "Posso cambiare piano in qualsiasi momento?",
          answer:
            "Sì! Puoi cambiare il tuo piano in qualsiasi momento. Gli upgrade hanno effetto immediatamente, mentre i downgrade hanno effetto al prossimo ciclo di fatturazione.",
        },
        q3: {
          question: "Offrite rimborsi?",
          answer:
            "Offriamo una garanzia di rimborso di 30 giorni per tutti i piani a pagamento. Se non sei soddisfatto, contatta il nostro team di supporto per un rimborso completo.",
        },
        q4: {
          question: "Quanto sono accurate le raccomandazioni dell'IA?",
          answer:
            "La nostra IA è addestrata su milioni di siti web e costantemente aggiornata con le ultime best practice SEO. Le raccomandazioni hanno un tasso di precisione del 95%+ e sono regolarmente validate da esperti SEO.",
        },
        q5: {
          question: "È disponibile una prova gratuita?",
          answer:
            "Sì! Il nostro piano Starter è completamente gratuito e include 1 audit del sito web al mese. Nessuna carta di credito richiesta per iniziare.",
        },
        q6: {
          question: "Che tipo di supporto fornite?",
          answer:
            "Offriamo supporto via email per tutti i piani, supporto email prioritario per utenti Professional e supporto telefonico dedicato per clienti Enterprise. I tempi di risposta variano in base al livello del piano.",
        },
      },
    },
    testimonials: {
      title: "Fiducia da Oltre 10.000 Aziende",
      subtitle:
        "Scopri come i nostri audit SEO potenziati dall'IA hanno trasformato aziende in tutto il mondo",
      items: {
        testimonial1: {
          name: "Sarah Chen",
          role: "Direttrice Marketing",
          company: "TechFlow Solutions",
          content:
            "AI SEO Turbo ha trasformato le prestazioni del nostro sito web. Abbiamo visto un aumento del 150% del traffico organico in 3 mesi.",
          rating: 5,
        },
        testimonial2: {
          name: "Mike Rodriguez",
          role: "Specialista SEO",
          company: "Digital Growth Agency",
          content:
            "Gli insights potenziati dall'IA sono incredibili. Ha rilevato problemi che i nostri strumenti precedenti avevano perso e ha fornito soluzioni azionabili.",
          rating: 5,
        },
        testimonial3: {
          name: "Emily Watson",
          role: "Manager E-commerce",
          company: "StyleHub Retail",
          content:
            "Il nostro tasso di conversione è migliorato del 40% dopo aver implementato le ottimizzazioni raccomandate. Il ROI è stato immediato.",
          rating: 5,
        },
      },
    },
    cta: {
      title: "Pronto a Trasformare la Tua SEO?",
      subtitle:
        "Unisciti a migliaia di aziende che stanno già potenziando il loro traffico organico con insights SEO potenziati dall'IA. Inizia il tuo audit gratuito oggi e vedi la differenza che l'ottimizzazione intelligente può fare.",
      primaryButton: "Inizia Audit Gratuito",
      secondaryButton: "Contatta Vendite",
      emailPlaceholder: "Inserisci la tua email per consigli SEO esclusivi",
      emailCta: "Ottieni Consigli SEO",
    },
  },
  id: {
    hero: {
      badge: "Penawaran Terbatas: Diskon 60% untuk Semua Paket",
      title1: "Pilih",
      title2: "Paket Kesuksesan SEO Anda",
      subtitle:
        "Transformasikan situs web Anda dengan audit SEO yang didukung AI. Dapatkan wawasan yang dapat ditindaklanjuti, tingkatkan peringkat Anda, dan tingkatkan lalu lintas organik dengan platform optimisasi cerdas kami.",
      billing: {
        monthly: "Bulanan",
        yearly: "Tahunan",
        saveLabel: "Hemat 20%",
      },
    },
    plans: {
      starter: {
        name: "Pemula",
        description: "Sempurna untuk situs web kecil dan pemula",
        cta: "Mulai Gratis",
        popular: false,
        features: {
          feature1: "1 audit situs web per bulan",
          feature2: "Rekomendasi SEO dasar",
          feature3: "Deteksi masalah teknis",
          feature4: "Analisis meta tag",
          feature5: "Dukungan email",
        },
        limitations: {
          limit1: "Terbatas hingga 10 halaman per audit",
          limit2: "Tidak ada dukungan prioritas",
          limit3: "Hanya laporan dasar",
        },
      },
      professional: {
        name: "Professional",
        description: "Ideal untuk bisnis yang sedang berkembang dan agensi",
        cta: "Mulai Professional",
        popular: true,
        popularBadge: "Paling Populer",
        features: {
          feature1: "10 audit situs web per bulan",
          feature2: "Rekomendasi SEO lanjutan",
          feature3: "Analisis pesaing",
          feature4: "Saran optimisasi konten",
          feature5: "Pemantauan kinerja",
          feature6: "Dukungan email prioritas",
          feature7: "Laporan kustom",
          feature8: "Akses API",
        },
        limitations: {
          limit1: "Terbatas hingga 100 halaman per audit",
          limit2: "Tidak ada dukungan telepon",
        },
      },
      enterprise: {
        name: "Enterprise",
        description: "Untuk organisasi besar dengan kebutuhan kompleks",
        cta: "Hubungi Penjualan",
        popular: false,
        features: {
          feature1: "Audit situs web tak terbatas",
          feature2: "Laporan white-label",
          feature3: "Pelacakan pesaing lanjutan",
          feature4: "Integrasi kustom",
          feature5: "Manajer akun khusus",
          feature6: "Dukungan telepon",
          feature7: "Jaminan SLA",
          feature8: "Sesi pelatihan kustom",
          feature9: "Fitur API lanjutan",
        },
        limitations: {},
      },
      billing: {
        monthly: "bulan",
        yearly: "bulan, ditagih tahunan",
        discount: "DISKON 60%",
      },
    },
    faq: {
      title: "Pertanyaan yang Sering Diajukan",
      subtitle: "Semua yang perlu Anda ketahui tentang platform SEO AI kami",
      questions: {
        q1: {
          question: "Bagaimana cara kerja audit SEO AI?",
          answer:
            "AI kami menganalisis struktur teknis situs web Anda, kualitas konten, metrik kinerja, dan faktor SEO. Kemudian memberikan rekomendasi yang dipersonalisasi berdasarkan praktik terbaik saat ini dan pedoman mesin pencari.",
        },
        q2: {
          question: "Bisakah saya mengubah paket kapan saja?",
          answer:
            "Ya! Anda dapat mengubah paket Anda kapan saja. Upgrade berlaku segera, sementara downgrade berlaku pada siklus penagihan berikutnya.",
        },
        q3: {
          question: "Apakah Anda menawarkan pengembalian dana?",
          answer:
            "Kami menawarkan jaminan uang kembali 30 hari untuk semua paket berbayar. Jika Anda tidak puas, hubungi tim dukungan kami untuk pengembalian dana penuh.",
        },
        q4: {
          question: "Seberapa akurat rekomendasi AI?",
          answer:
            "AI kami dilatih pada jutaan situs web dan terus diperbarui dengan praktik SEO terbaru. Rekomendasi memiliki tingkat akurasi 95%+ dan secara teratur divalidasi oleh ahli SEO.",
        },
        q5: {
          question: "Apakah tersedia uji coba gratis?",
          answer:
            "Ya! Paket Pemula kami sepenuhnya gratis dan mencakup 1 audit situs web per bulan. Tidak perlu kartu kredit untuk memulai.",
        },
        q6: {
          question: "Jenis dukungan apa yang Anda berikan?",
          answer:
            "Kami menawarkan dukungan email untuk semua paket, dukungan email prioritas untuk pengguna Professional, dan dukungan telepon khusus untuk pelanggan Enterprise. Waktu respons bervariasi berdasarkan level paket.",
        },
      },
    },
    testimonials: {
      title: "Dipercaya oleh Lebih dari 10.000 Bisnis",
      subtitle:
        "Lihat bagaimana audit SEO kami yang didukung AI telah mengubah bisnis di seluruh dunia",
      items: {
        testimonial1: {
          name: "Sarah Chen",
          role: "Direktur Pemasaran",
          company: "TechFlow Solutions",
          content:
            "AI SEO Turbo mengubah kinerja situs web kami. Kami melihat peningkatan 150% dalam lalu lintas organik dalam 3 bulan.",
          rating: 5,
        },
        testimonial2: {
          name: "Mike Rodriguez",
          role: "Spesialis SEO",
          company: "Digital Growth Agency",
          content:
            "Wawasan yang didukung AI sangat luar biasa. Ini menangkap masalah yang terlewat oleh alat kami sebelumnya dan memberikan solusi yang dapat ditindaklanjuti.",
          rating: 5,
        },
        testimonial3: {
          name: "Emily Watson",
          role: "Manajer E-commerce",
          company: "StyleHub Retail",
          content:
            "Tingkat konversi kami meningkat 40% setelah menerapkan optimisasi yang direkomendasikan. ROI langsung terlihat.",
          rating: 5,
        },
      },
    },
    cta: {
      title: "Siap Mengubah SEO Anda?",
      subtitle:
        "Bergabunglah dengan ribuan bisnis yang sudah meningkatkan lalu lintas organik mereka dengan wawasan SEO yang didukung AI. Mulai audit gratis Anda hari ini dan lihat perbedaan yang dapat dibuat oleh optimisasi cerdas.",
      primaryButton: "Mulai Audit Gratis",
      secondaryButton: "Hubungi Penjualan",
      emailPlaceholder: "Masukkan email Anda untuk tips SEO eksklusif",
      emailCta: "Dapatkan Tips SEO",
    },
  },
  fr: {
    hero: {
      badge: "Offre Limitée : 60% de Réduction sur Tous les Plans",
      title1: "Choisissez Votre",
      title2: "Plan de Succès SEO",
      subtitle:
        "Transformez votre site web avec des audits SEO propulsés par l'IA. Obtenez des insights actionnables, boostez vos classements et augmentez votre trafic organique avec notre plateforme d'optimisation intelligente.",
      billing: {
        monthly: "Mensuel",
        yearly: "Annuel",
        saveLabel: "Économisez 20%",
      },
    },
    plans: {
      starter: {
        name: "Débutant",
        description: "Parfait pour les petits sites web et les débutants",
        cta: "Commencer Gratuitement",
        popular: false,
        features: {
          feature1: "1 audit de site web par mois",
          feature2: "Recommandations SEO de base",
          feature3: "Détection des problèmes techniques",
          feature4: "Analyse des balises meta",
          feature5: "Support par email",
        },
        limitations: {
          limit1: "Limité à 10 pages par audit",
          limit2: "Pas de support prioritaire",
          limit3: "Rapports basiques uniquement",
        },
      },
      professional: {
        name: "Professionnel",
        description: "Idéal pour les entreprises en croissance et les agences",
        cta: "Démarrer Professionnel",
        popular: true,
        popularBadge: "Le Plus Populaire",
        features: {
          feature1: "10 audits de site web par mois",
          feature2: "Recommandations SEO avancées",
          feature3: "Analyse de la concurrence",
          feature4: "Suggestions d'optimisation de contenu",
          feature5: "Surveillance des performances",
          feature6: "Support email prioritaire",
          feature7: "Rapports personnalisés",
          feature8: "Accès API",
        },
        limitations: {
          limit1: "Limité à 100 pages par audit",
          limit2: "Pas de support téléphonique",
        },
      },
      enterprise: {
        name: "Entreprise",
        description: "Pour les grandes organisations aux besoins complexes",
        cta: "Contacter les Ventes",
        popular: false,
        features: {
          feature1: "Audits de site web illimités",
          feature2: "Rapports en marque blanche",
          feature3: "Suivi avancé de la concurrence",
          feature4: "Intégrations personnalisées",
          feature5: "Gestionnaire de compte dédié",
          feature6: "Support téléphonique",
          feature7: "Garantie SLA",
          feature8: "Sessions de formation personnalisées",
          feature9: "Fonctionnalités API avancées",
        },
        limitations: {},
      },
      billing: {
        monthly: "mois",
        yearly: "mois, facturé annuellement",
        discount: "60% DE RÉDUCTION",
      },
    },
    faq: {
      title: "Questions Fréquemment Posées",
      subtitle: "Tout ce que vous devez savoir sur notre plateforme SEO IA",
      questions: {
        q1: {
          question: "Comment fonctionne l'audit SEO IA ?",
          answer:
            "Notre IA analyse la structure technique de votre site web, la qualité du contenu, les métriques de performance et les facteurs SEO. Elle fournit ensuite des recommandations personnalisées basées sur les meilleures pratiques actuelles et les directives des moteurs de recherche.",
        },
        q2: {
          question: "Puis-je changer de plan à tout moment ?",
          answer:
            "Oui ! Vous pouvez changer votre plan à tout moment. Les mises à niveau prennent effet immédiatement, tandis que les rétrogradations prennent effet lors de votre prochain cycle de facturation.",
        },
        q3: {
          question: "Offrez-vous des remboursements ?",
          answer:
            "Nous offrons une garantie de remboursement de 30 jours pour tous les plans payants. Si vous n'êtes pas satisfait, contactez notre équipe de support pour un remboursement complet.",
        },
        q4: {
          question: "Quelle est la précision des recommandations IA ?",
          answer:
            "Notre IA est entraînée sur des millions de sites web et constamment mise à jour avec les dernières meilleures pratiques SEO. Les recommandations ont un taux de précision de plus de 95% et sont régulièrement validées par des experts SEO.",
        },
        q5: {
          question: "Y a-t-il un essai gratuit disponible ?",
          answer:
            "Oui ! Notre plan Débutant est entièrement gratuit et comprend 1 audit de site web par mois. Aucune carte de crédit nécessaire pour commencer.",
        },
        q6: {
          question: "Quel type de support proposez-vous ?",
          answer:
            "Nous offrons un support par email pour tous les plans, un support email prioritaire pour les utilisateurs Professionnels et un support téléphonique dédié pour les clients Entreprise. Les temps de réponse varient en fonction du niveau du plan.",
        },
      },
    },
    testimonials: {
      title: "Approuvé par Plus de 10 000 Entreprises",
      subtitle:
        "Découvrez comment nos audits SEO propulsés par l'IA ont transformé des entreprises dans le monde entier",
      items: {
        testimonial1: {
          name: "Sarah Chen",
          role: "Directrice Marketing",
          company: "TechFlow Solutions",
          content:
            "AI SEO Turbo a transformé les performances de notre site web. Nous avons constaté une augmentation de 150% du trafic organique en 3 mois.",
          rating: 5,
        },
        testimonial2: {
          name: "Mike Rodriguez",
          role: "Spécialiste SEO",
          company: "Digital Growth Agency",
          content:
            "Les insights propulsés par l'IA sont incroyables. Ils ont détecté des problèmes que nos outils précédents avaient manqués et ont fourni des solutions actionnables.",
          rating: 5,
        },
        testimonial3: {
          name: "Emily Watson",
          role: "Responsable E-commerce",
          company: "StyleHub Retail",
          content:
            "Notre taux de conversion s'est amélioré de 40% après avoir mis en œuvre les optimisations recommandées. Le ROI a été immédiat.",
          rating: 5,
        },
      },
    },
    cta: {
      title: "Prêt à Transformer Votre SEO ?",
      subtitle:
        "Rejoignez des milliers d'entreprises qui augmentent déjà leur trafic organique avec des insights SEO propulsés par l'IA. Commencez votre audit gratuit aujourd'hui et voyez la différence que l'optimisation intelligente peut faire.",
      primaryButton: "Commencer l'Audit Gratuit",
      secondaryButton: "Contacter les Ventes",
      emailPlaceholder: "Entrez votre email pour des conseils SEO exclusifs",
      emailCta: "Obtenir des Conseils SEO",
    },
  },
};

// Update each locale file
Object.keys(locales).forEach((locale) => {
  const filePath = path.join(__dirname, "..", "messages", `${locale}.json`);

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(content);

    // Replace the pricing section
    data.pricing = locales[locale];

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log(`✅ Updated ${locale}.json`);
  } catch (error) {
    console.error(`❌ Error updating ${locale}.json:`, error.message);
  }
});

console.log("\n🎉 All locale files have been updated with new pricing translations!");
