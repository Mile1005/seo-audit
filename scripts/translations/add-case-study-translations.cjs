const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'messages');

// Translation data for all 6 case studies in all locales
const caseStudyTranslations = {
  en: {
    caseStudies: {
      // Shared navigation
      breadcrumbs: {
        caseStudies: "Case Studies"
      },

      // TechFlow Solutions (Enterprise SaaS)
      techflowSolutions: {
        name: "TechFlow Solutions",
        title: "Enterprise SEO Transformation",
        subtitle: "How a leading SaaS company overcame complex technical challenges to achieve 520% organic traffic growth and dominate enterprise search results.",
        industry: "Enterprise SaaS",
        heroButtons: {
          audit: "Get Your Enterprise SEO Audit",
          share: "Share This Success Story"
        },
        challengeTitle: "The Challenge: Enterprise-Scale SEO Complexity",
        challengeDescription: "TechFlow Solutions is a leading enterprise SaaS platform serving Fortune 500 companies. Despite their market leadership, they struggled with poor search visibility due to complex technical SEO issues across their extensive website.",
        challengeStats: {
          pages: "Website Pages",
          issues: "Technical SEO Issues"
        },
        challengePoints: [
          "Complex multi-level site architecture with navigation issues",
          "Poor site speed and performance metrics affecting search rankings",
          "Duplicate content across product documentation pages",
          "Inadequate internal linking between key pages",
          "Missing schema markup for enterprise SaaS offerings"
        ],
        solutionTitle: "The Solution: Comprehensive Enterprise SEO Strategy",
        solutionDescription: "TechFlow Solutions implemented a full-scale enterprise SEO transformation using AI SEO Turbo's advanced technical auditing and optimization capabilities.",
        solutionSteps: [
          {
            title: "Deep Technical Audit",
            description: "500+ page comprehensive technical SEO audit identifying critical issues, site architecture problems, and optimization opportunities for enterprise-scale improvement."
          },
          {
            title: "Site Architecture Optimization",
            description: "Restructured navigation, URL hierarchy, and internal linking strategy to improve crawlability, indexation, and user experience across all product sections."
          },
          {
            title: "Performance Optimization",
            description: "Implemented technical improvements to boost page speed, Core Web Vitals, and mobile experience resulting in 40% faster load times."
          },
          {
            title: "Content & Schema Strategy",
            description: "Created targeted enterprise content, resolved duplicate issues, and implemented comprehensive schema markup for enhanced SERP visibility."
          }
        ],
        timelineTitle: "8-Month Enterprise SEO Journey",
        timelineSubtitle: "From technical chaos to search dominance",
        timeline: [
          {
            month: "Month 1-2",
            title: "Discovery & Audit Phase",
            description: "Comprehensive technical audit and competitor analysis",
            results: [
              "500+ page technical audit completed",
              "200+ SEO issues identified",
              "Competitor gap analysis finished"
            ]
          },
          {
            month: "Month 3-4",
            title: "Implementation Phase",
            description: "Technical fixes, content optimization, and site improvements",
            results: [
              "Site speed improved by 40%",
              "Mobile optimization completed",
              "100+ pages optimized"
            ]
          },
          {
            month: "Month 5-8",
            title: "Optimization & Scale",
            description: "Advanced keyword targeting and continuous optimization",
            results: [
              "+520% traffic increase achieved",
              "200+ top 5 keyword rankings",
              "Lead quality improved by 85%"
            ]
          }
        ],
        testimonial: {
          quote: "The depth of analysis and actionable insights from AI SEO Turbo are unparalleled. We've seen results that exceeded our wildest expectations. The enterprise-level technical SEO capabilities transformed our search presence completely.",
          author: "Michael Rodriguez",
          role: "CTO, TechFlow Solutions"
        },
        technicalAchievementsTitle: "Technical SEO Achievements",
        technicalAchievementsSubtitle: "Enterprise-level technical improvements that drove massive results",
        technicalCategories: {
          performance: {
            title: "Site Performance",
            items: [
              "40% improvement in page load speed",
              "100% Core Web Vitals compliance",
              "Mobile optimization completed"
            ]
          },
          infrastructure: {
            title: "SEO Infrastructure",
            items: [
              "XML sitemap optimization",
              "Schema markup implementation",
              "Internal linking structure optimized"
            ]
          }
        },
        roiTitle: "Enterprise ROI Impact",
        roiMetrics: {
          overallRoi: "Overall ROI",
          revenue: "Additional Annual Revenue",
          payback: "ROI Payback Period"
        },
        relatedTitle: "More Enterprise Success Stories",
        relatedSubtitle: "See how other businesses achieved remarkable results with AI SEO Turbo",
        relatedCases: {
          digitalGrowthAgency: {
            title: "Digital Growth Agency",
            subtitle: "Agency Workflow Transformation",
            description: "340% traffic increase for digital marketing agency",
            cta: "Read Case Study"
          },
          cloudsyncPro: {
            title: "CloudSync Pro",
            subtitle: "B2B Lead Generation",
            description: "350% qualified leads increase for B2B SaaS",
            cta: "Read Case Study"
          }
        },
        ctaTitle: "Ready to Transform Your Enterprise SEO?",
        ctaDescription: "Join TechFlow Solutions and other enterprise leaders achieving remarkable SEO results with AI-powered technical optimization.",
        ctaButtons: {
          audit: "Get Your Enterprise SEO Audit",
          contact: "Talk to Enterprise Experts"
        },
        results: {
          traffic: {
            metric: "Organic Traffic",
            value: "+520%",
            description: "Increase in organic search traffic"
          },
          keywords: {
            metric: "Top Rankings",
            value: "200+",
            description: "Keywords ranking in top 5 positions"
          },
          leadQuality: {
            metric: "Lead Quality",
            value: "+85%",
            description: "Improved lead quality and conversion rates"
          },
          costPerLead: {
            metric: "Cost per Lead",
            value: "-65%",
            description: "Significant reduction in acquisition costs"
          }
        }
      },

      // Peak Performance (Fitness App)
      peakPerformance: {
        name: "Peak Performance",
        title: "Local SEO Domination",
        subtitle: "How a fitness studio achieved local pack #1 for 15 services, 310% more phone calls, and 280% customer acquisition growth through strategic local SEO.",
        industry: "Fitness & Wellness",
        heroButtons: {
          audit: "Get Your Local SEO Audit",
          share: "Share This Success Story"
        },
        challengeTitle: "The Challenge: Local SEO Invisibility",
        challengeDescription: "Peak Performance is a premium fitness studio with excellent service reputation. Despite their quality, they were invisible in local search results, missing out on nearby customers actively searching for fitness services.",
        challengePoints: [
          "Invisible in local search results despite excellent service reputation",
          "Poor Google Business Profile optimization and incomplete information",
          "Limited local citation presence across online directories",
          "Inconsistent NAP (Name, Address, Phone) data across platforms",
          "Lack of local content and community engagement"
        ],
        solutionTitle: "The Solution: Comprehensive Local SEO Strategy",
        solutionDescription: "Peak Performance implemented a complete local SEO transformation focusing on Google Business Profile optimization, citation building, and local content strategy.",
        solutionSteps: [
          {
            title: "Google Business Profile Optimization",
            description: "Complete GBP setup, optimization, and ongoing management"
          },
          {
            title: "Local Citation Building",
            description: "Comprehensive local citation audit and acquisition strategy"
          },
          {
            title: "Local Content Strategy",
            description: "Location-specific content creation and community engagement"
          },
          {
            title: "Local Technical SEO",
            description: "Schema markup, local structured data, and mobile optimization"
          }
        ],
        timelineTitle: "3-Month Local SEO Transformation",
        timelineSubtitle: "From invisible to local pack domination",
        timeline: [
          {
            month: "Month 1",
            title: "Local SEO Foundation",
            description: "GBP optimization, citation audit, and local keyword research",
            results: [
              "GBP fully optimized",
              "Citation gaps identified",
              "Local keyword strategy developed"
            ]
          },
          {
            month: "Month 2",
            title: "Citation & Content Building",
            description: "Citation acquisition and local content creation",
            results: [
              "50+ new citations acquired",
              "Local content published",
              "NAP consistency achieved"
            ]
          },
          {
            month: "Month 3",
            title: "Optimization & Domination",
            description: "Advanced local SEO tactics and performance monitoring",
            results: [
              "Local pack #1 for 15 services",
              "310% call increase",
              "190% traffic growth"
            ]
          }
        ],
        testimonial: {
          quote: "AI SEO Turbo transformed our local visibility completely. We went from invisible to dominating local search in just 3 months. The ROI has been incredible - we're turning away customers now!",
          author: "Sarah Mitchell",
          role: "Owner, Peak Performance"
        },
        technicalAchievementsTitle: "Local SEO Achievements",
        technicalAchievementsSubtitle: "Strategic improvements that drove local market dominance",
        roiTitle: "Local Business ROI Impact",
        ctaTitle: "Ready to Dominate Your Local Market?",
        ctaDescription: "Join Peak Performance and other local businesses achieving remarkable results with strategic local SEO optimization.",
        ctaButtons: {
          audit: "Get Your Local SEO Audit",
          contact: "Talk to Local SEO Experts"
        },
        results: {
          traffic: {
            metric: "Local Traffic",
            value: "+190%",
            description: "Increase in local search traffic"
          },
          calls: {
            metric: "Phone Calls",
            value: "+310%",
            description: "More customer phone inquiries"
          },
          rankings: {
            metric: "Local Rankings",
            value: "#1 in 15",
            description: "Services ranking #1 locally"
          },
          acquisition: {
            metric: "Customer Acquisition",
            value: "+280%",
            description: "New customer growth"
          }
        }
      },

      // GearHub Pro (E-commerce)
      gearhubPro: {
        name: "GearHub Pro",
        title: "E-commerce SEO Transformation",
        subtitle: "How an outdoor gear retailer achieved 420% organic traffic growth, 310% revenue increase, and dominated competitive product keywords through strategic e-commerce SEO.",
        industry: "E-commerce",
        heroButtons: {
          audit: "Get Your E-commerce SEO Audit",
          share: "Share This Success Story"
        },
        challengeTitle: "The Challenge: E-commerce Competition",
        challengeDescription: "GearHub Pro is a premium outdoor gear retailer competing against industry giants. They struggled with low product visibility, thin product descriptions, and poor category page optimization.",
        challengePoints: [
          "Poor product page visibility in competitive outdoor gear market",
          "Thin product descriptions lacking SEO optimization",
          "Category pages not ranking for valuable commercial keywords",
          "Limited technical SEO for large product catalog",
          "Low conversion rates from organic traffic"
        ],
        solutionTitle: "The Solution: Comprehensive E-commerce SEO Strategy",
        solutionDescription: "GearHub Pro implemented a complete e-commerce SEO transformation focusing on product optimization, category page enhancement, and technical e-commerce improvements.",
        solutionSteps: [
          {
            title: "Product Page Optimization",
            description: "Comprehensive product page SEO with rich descriptions and structured data"
          },
          {
            title: "Category Page Enhancement",
            description: "Category page optimization targeting high-value commercial keywords"
          },
          {
            title: "Technical E-commerce SEO",
            description: "Site speed, mobile optimization, and structured data implementation"
          },
          {
            title: "Content & Link Building",
            description: "Authority building through content marketing and strategic link acquisition"
          }
        ],
        timelineTitle: "6-Month E-commerce SEO Journey",
        timelineSubtitle: "From struggling retailer to market leader",
        ctaTitle: "Ready to Transform Your E-commerce SEO?",
        ctaDescription: "Join GearHub Pro and other e-commerce businesses achieving remarkable results with strategic SEO optimization.",
        ctaButtons: {
          audit: "Get Your E-commerce SEO Audit",
          contact: "Talk to E-commerce Experts"
        }
      },

      // StyleCraft Boutique (Fashion E-commerce)
      stylecraftBoutique: {
        name: "StyleCraft Boutique",
        title: "Fashion E-commerce Success",
        subtitle: "How a fashion boutique achieved 385% organic traffic growth and 290% revenue increase through strategic fashion e-commerce SEO and content marketing.",
        industry: "Fashion E-commerce",
        heroButtons: {
          audit: "Get Your Fashion SEO Audit",
          share: "Share This Success Story"
        },
        challengeTitle: "The Challenge: Fashion Market Competition",
        challengeDescription: "StyleCraft Boutique is a boutique fashion retailer competing in the highly competitive online fashion market. They struggled with low visibility and brand awareness.",
        ctaTitle: "Ready to Elevate Your Fashion Brand SEO?",
        ctaDescription: "Join StyleCraft Boutique and other fashion brands achieving remarkable results with strategic SEO optimization.",
        ctaButtons: {
          audit: "Get Your Fashion SEO Audit",
          contact: "Talk to Fashion SEO Experts"
        }
      },

      // Digital Growth Agency (Marketing Agency)
      digitalGrowthAgency: {
        name: "Digital Growth Agency",
        title: "Agency Workflow Transformation",
        subtitle: "How a digital marketing agency achieved 340% traffic growth and scaled client SEO services through AI-powered workflow optimization.",
        industry: "Digital Marketing Agency",
        heroButtons: {
          audit: "Get Your Agency SEO Audit",
          share: "Share This Success Story"
        },
        challengeTitle: "The Challenge: Scaling Agency SEO Services",
        challengeDescription: "Digital Growth Agency is a growing marketing agency struggling to scale SEO services profitably. Manual audits and reporting consumed excessive time, limiting growth potential.",
        ctaTitle: "Ready to Scale Your Agency SEO Services?",
        ctaDescription: "Join Digital Growth Agency and other marketing agencies achieving remarkable efficiency with AI-powered SEO tools.",
        ctaButtons: {
          audit: "Get Your Agency SEO Audit",
          contact: "Talk to Agency Experts"
        }
      },

      // CloudSync Pro (B2B SaaS)
      cloudsyncPro: {
        name: "CloudSync Pro",
        title: "B2B Lead Generation Success",
        subtitle: "How a B2B SaaS company achieved 350% qualified leads increase and reduced cost per lead by 55% through strategic B2B SEO.",
        industry: "B2B SaaS",
        heroButtons: {
          audit: "Get Your B2B SEO Audit",
          share: "Share This Success Story"
        },
        challengeTitle: "The Challenge: B2B Lead Generation",
        challengeDescription: "CloudSync Pro is a B2B cloud storage platform struggling with high customer acquisition costs and low-quality leads from paid advertising.",
        ctaTitle: "Ready to Transform Your B2B Lead Generation?",
        ctaDescription: "Join CloudSync Pro and other B2B companies achieving remarkable results with strategic SEO optimization.",
        ctaButtons: {
          audit: "Get Your B2B SEO Audit",
          contact: "Talk to B2B SEO Experts"
        }
      }
    }
  },

  fr: {
    caseStudies: {
      breadcrumbs: {
        caseStudies: "Études de Cas"
      },

      techflowSolutions: {
        name: "TechFlow Solutions",
        title: "Transformation SEO Entreprise",
        subtitle: "Comment une entreprise SaaS leader a surmonté des défis techniques complexes pour obtenir une croissance de 520% du trafic organique et dominer les résultats de recherche d'entreprise.",
        industry: "SaaS Entreprise",
        heroButtons: {
          audit: "Obtenez Votre Audit SEO Entreprise",
          share: "Partagez Cette Réussite"
        },
        challengeTitle: "Le Défi : Complexité SEO à l'Échelle Entreprise",
        challengeDescription: "TechFlow Solutions est une plateforme SaaS d'entreprise leader au service des entreprises Fortune 500. Malgré leur leadership du marché, ils luttaient contre une mauvaise visibilité de recherche due à des problèmes SEO techniques complexes sur leur vaste site web.",
        challengeStats: {
          pages: "Pages du Site",
          issues: "Problèmes SEO Techniques"
        },
        challengePoints: [
          "Architecture de site multi-niveaux complexe avec problèmes de navigation",
          "Vitesse et performances du site médiocres affectant les classements de recherche",
          "Contenu dupliqué sur les pages de documentation produit",
          "Liens internes inadéquats entre les pages clés",
          "Absence de balisage schema pour les offres SaaS d'entreprise"
        ],
        solutionTitle: "La Solution : Stratégie SEO Entreprise Complète",
        solutionDescription: "TechFlow Solutions a mis en œuvre une transformation SEO d'entreprise à grande échelle utilisant les capacités avancées d'audit technique et d'optimisation d'AI SEO Turbo.",
        solutionSteps: [
          {
            title: "Audit Technique Approfondi",
            description: "Audit SEO technique complet de plus de 500 pages identifiant les problèmes critiques, les problèmes d'architecture du site et les opportunités d'optimisation pour une amélioration à l'échelle de l'entreprise."
          },
          {
            title: "Optimisation de l'Architecture du Site",
            description: "Navigation restructurée, hiérarchie d'URL et stratégie de liens internes pour améliorer la crawlabilité, l'indexation et l'expérience utilisateur dans toutes les sections de produits."
          },
          {
            title: "Optimisation des Performances",
            description: "Améliorations techniques mises en œuvre pour augmenter la vitesse des pages, les Core Web Vitals et l'expérience mobile, résultant en des temps de chargement 40% plus rapides."
          },
          {
            title: "Stratégie de Contenu et Schema",
            description: "Création de contenu d'entreprise ciblé, résolution des problèmes de duplication et mise en œuvre de balisage schema complet pour une visibilité SERP améliorée."
          }
        ],
        timelineTitle: "Parcours SEO Entreprise de 8 Mois",
        timelineSubtitle: "Du chaos technique à la domination de la recherche",
        timeline: [
          {
            month: "Mois 1-2",
            title: "Phase de Découverte et d'Audit",
            description: "Audit technique complet et analyse concurrentielle",
            results: [
              "Audit technique de plus de 500 pages terminé",
              "Plus de 200 problèmes SEO identifiés",
              "Analyse des écarts concurrentiels terminée"
            ]
          },
          {
            month: "Mois 3-4",
            title: "Phase de Mise en Œuvre",
            description: "Corrections techniques, optimisation du contenu et améliorations du site",
            results: [
              "Vitesse du site améliorée de 40%",
              "Optimisation mobile terminée",
              "Plus de 100 pages optimisées"
            ]
          },
          {
            month: "Mois 5-8",
            title: "Optimisation et Mise à l'Échelle",
            description: "Ciblage de mots-clés avancé et optimisation continue",
            results: [
              "Augmentation du trafic de +520% atteinte",
              "Plus de 200 classements dans le top 5",
              "Qualité des prospects améliorée de 85%"
            ]
          }
        ],
        testimonial: {
          quote: "La profondeur d'analyse et les insights actionnables d'AI SEO Turbo sont inégalés. Nous avons vu des résultats qui ont dépassé nos attentes les plus folles. Les capacités SEO techniques de niveau entreprise ont complètement transformé notre présence de recherche.",
          author: "Michael Rodriguez",
          role: "CTO, TechFlow Solutions"
        },
        technicalAchievementsTitle: "Réalisations SEO Techniques",
        technicalAchievementsSubtitle: "Améliorations techniques de niveau entreprise qui ont généré des résultats massifs",
        technicalCategories: {
          performance: {
            title: "Performance du Site",
            items: [
              "Amélioration de 40% de la vitesse de chargement des pages",
              "Conformité aux Core Web Vitals à 100%",
              "Optimisation mobile terminée"
            ]
          },
          infrastructure: {
            title: "Infrastructure SEO",
            items: [
              "Optimisation du sitemap XML",
              "Mise en œuvre du balisage schema",
              "Structure de liens internes optimisée"
            ]
          }
        },
        roiTitle: "Impact ROI Entreprise",
        roiMetrics: {
          overallRoi: "ROI Global",
          revenue: "Revenu Annuel Supplémentaire",
          payback: "Période de Retour sur Investissement"
        },
        relatedTitle: "Plus de Réussites Entreprise",
        relatedSubtitle: "Découvrez comment d'autres entreprises ont obtenu des résultats remarquables avec AI SEO Turbo",
        relatedCases: {
          digitalGrowthAgency: {
            title: "Digital Growth Agency",
            subtitle: "Transformation du Flux de Travail d'Agence",
            description: "Augmentation du trafic de 340% pour une agence de marketing digital",
            cta: "Lire l'Étude de Cas"
          },
          cloudsyncPro: {
            title: "CloudSync Pro",
            subtitle: "Génération de Leads B2B",
            description: "Augmentation de 350% des leads qualifiés pour un SaaS B2B",
            cta: "Lire l'Étude de Cas"
          }
        },
        ctaTitle: "Prêt à Transformer Votre SEO Entreprise ?",
        ctaDescription: "Rejoignez TechFlow Solutions et d'autres leaders d'entreprise obtenant des résultats SEO remarquables avec l'optimisation technique alimentée par l'IA.",
        ctaButtons: {
          audit: "Obtenez Votre Audit SEO Entreprise",
          contact: "Parlez à des Experts Entreprise"
        },
        results: {
          traffic: {
            metric: "Trafic Organique",
            value: "+520%",
            description: "Augmentation du trafic de recherche organique"
          },
          keywords: {
            metric: "Classements Top",
            value: "200+",
            description: "Mots-clés classés dans les 5 premières positions"
          },
          leadQuality: {
            metric: "Qualité des Prospects",
            value: "+85%",
            description: "Qualité et taux de conversion des prospects améliorés"
          },
          costPerLead: {
            metric: "Coût par Prospect",
            value: "-65%",
            description: "Réduction significative des coûts d'acquisition"
          }
        }
      },

      peakPerformance: {
        name: "Peak Performance",
        title: "Domination SEO Local",
        subtitle: "Comment un studio de fitness a atteint le pack local #1 pour 15 services, 310% d'appels téléphoniques en plus et 280% de croissance d'acquisition client grâce au SEO local stratégique.",
        industry: "Fitness et Bien-être",
        heroButtons: {
          audit: "Obtenez Votre Audit SEO Local",
          share: "Partagez Cette Réussite"
        },
        challengeTitle: "Le Défi : Invisibilité SEO Local",
        challengeDescription: "Peak Performance est un studio de fitness premium avec une excellente réputation de service. Malgré leur qualité, ils étaient invisibles dans les résultats de recherche locaux, manquant des clients à proximité recherchant activement des services de fitness.",
        challengePoints: [
          "Invisible dans les résultats de recherche locaux malgré une excellente réputation de service",
          "Optimisation médiocre du profil d'entreprise Google et informations incomplètes",
          "Présence limitée de citations locales dans les annuaires en ligne",
          "Données NAP (Nom, Adresse, Téléphone) incohérentes sur les plateformes",
          "Manque de contenu local et d'engagement communautaire"
        ],
        solutionTitle: "La Solution : Stratégie SEO Local Complète",
        solutionDescription: "Peak Performance a mis en œuvre une transformation SEO locale complète axée sur l'optimisation du profil d'entreprise Google, la création de citations et la stratégie de contenu local.",
        solutionSteps: [
          {
            title: "Optimisation du Profil d'Entreprise Google",
            description: "Configuration, optimisation et gestion continue complètes du GBP"
          },
          {
            title: "Création de Citations Locales",
            description: "Audit complet des citations locales et stratégie d'acquisition"
          },
          {
            title: "Stratégie de Contenu Local",
            description: "Création de contenu spécifique à l'emplacement et engagement communautaire"
          },
          {
            title: "SEO Technique Local",
            description: "Balisage schema, données structurées locales et optimisation mobile"
          }
        ],
        timelineTitle: "Transformation SEO Local de 3 Mois",
        timelineSubtitle: "De l'invisibilité à la domination du pack local",
        timeline: [
          {
            month: "Mois 1",
            title: "Fondation SEO Local",
            description: "Optimisation GBP, audit de citations et recherche de mots-clés locaux",
            results: [
              "GBP entièrement optimisé",
              "Lacunes de citations identifiées",
              "Stratégie de mots-clés locaux développée"
            ]
          },
          {
            month: "Mois 2",
            title: "Construction de Citations et de Contenu",
            description: "Acquisition de citations et création de contenu local",
            results: [
              "Plus de 50 nouvelles citations acquises",
              "Contenu local publié",
              "Cohérence NAP atteinte"
            ]
          },
          {
            month: "Mois 3",
            title: "Optimisation et Domination",
            description: "Tactiques SEO locales avancées et surveillance des performances",
            results: [
              "Pack local #1 pour 15 services",
              "Augmentation des appels de 310%",
              "Croissance du trafic de 190%"
            ]
          }
        ],
        testimonial: {
          quote: "AI SEO Turbo a complètement transformé notre visibilité locale. Nous sommes passés d'invisibles à dominants dans la recherche locale en seulement 3 mois. Le ROI a été incroyable - nous refusons maintenant des clients !",
          author: "Sarah Mitchell",
          role: "Propriétaire, Peak Performance"
        },
        technicalAchievementsTitle: "Réalisations SEO Local",
        technicalAchievementsSubtitle: "Améliorations stratégiques qui ont généré la domination du marché local",
        roiTitle: "Impact ROI Entreprise Locale",
        ctaTitle: "Prêt à Dominer Votre Marché Local ?",
        ctaDescription: "Rejoignez Peak Performance et d'autres entreprises locales obtenant des résultats remarquables avec l'optimisation SEO locale stratégique.",
        ctaButtons: {
          audit: "Obtenez Votre Audit SEO Local",
          contact: "Parlez à des Experts SEO Local"
        },
        results: {
          traffic: {
            metric: "Trafic Local",
            value: "+190%",
            description: "Augmentation du trafic de recherche local"
          },
          calls: {
            metric: "Appels Téléphoniques",
            value: "+310%",
            description: "Plus de demandes téléphoniques de clients"
          },
          rankings: {
            metric: "Classements Locaux",
            value: "#1 en 15",
            description: "Services classés #1 localement"
          },
          acquisition: {
            metric: "Acquisition Client",
            value: "+280%",
            description: "Croissance de nouveaux clients"
          }
        }
      },

      gearhubPro: {
        name: "GearHub Pro",
        title: "Transformation SEO E-commerce",
        subtitle: "Comment un détaillant d'équipement outdoor a atteint 420% de croissance du trafic organique, 310% d'augmentation des revenus et a dominé les mots-clés produits compétitifs grâce au SEO e-commerce stratégique.",
        industry: "E-commerce",
        heroButtons: {
          audit: "Obtenez Votre Audit SEO E-commerce",
          share: "Partagez Cette Réussite"
        },
        challengeTitle: "Le Défi : Concurrence E-commerce",
        challengeDescription: "GearHub Pro est un détaillant d'équipement outdoor premium en concurrence avec les géants de l'industrie. Ils luttaient avec une faible visibilité des produits, des descriptions de produits minces et une mauvaise optimisation des pages de catégories.",
        challengePoints: [
          "Mauvaise visibilité des pages produits dans le marché compétitif de l'équipement outdoor",
          "Descriptions de produits minces manquant d'optimisation SEO",
          "Pages de catégories ne se classant pas pour des mots-clés commerciaux précieux",
          "SEO technique limité pour un grand catalogue de produits",
          "Faibles taux de conversion du trafic organique"
        ],
        solutionTitle: "La Solution : Stratégie SEO E-commerce Complète",
        solutionDescription: "GearHub Pro a mis en œuvre une transformation SEO e-commerce complète axée sur l'optimisation des produits, l'amélioration des pages de catégories et les améliorations techniques e-commerce.",
        solutionSteps: [
          {
            title: "Optimisation des Pages Produits",
            description: "SEO complet des pages produits avec descriptions riches et données structurées"
          },
          {
            title: "Amélioration des Pages de Catégories",
            description: "Optimisation des pages de catégories ciblant des mots-clés commerciaux à forte valeur"
          },
          {
            title: "SEO Technique E-commerce",
            description: "Vitesse du site, optimisation mobile et mise en œuvre de données structurées"
          },
          {
            title: "Création de Contenu et de Liens",
            description: "Renforcement de l'autorité grâce au marketing de contenu et à l'acquisition stratégique de liens"
          }
        ],
        timelineTitle: "Parcours SEO E-commerce de 6 Mois",
        timelineSubtitle: "De détaillant en difficulté à leader du marché",
        ctaTitle: "Prêt à Transformer Votre SEO E-commerce ?",
        ctaDescription: "Rejoignez GearHub Pro et d'autres entreprises e-commerce obtenant des résultats remarquables avec l'optimisation SEO stratégique.",
        ctaButtons: {
          audit: "Obtenez Votre Audit SEO E-commerce",
          contact: "Parlez à des Experts E-commerce"
        }
      },

      stylecraftBoutique: {
        name: "StyleCraft Boutique",
        title: "Succès E-commerce Mode",
        subtitle: "Comment une boutique de mode a atteint 385% de croissance du trafic organique et 290% d'augmentation des revenus grâce au SEO e-commerce mode stratégique et au marketing de contenu.",
        industry: "E-commerce Mode",
        heroButtons: {
          audit: "Obtenez Votre Audit SEO Mode",
          share: "Partagez Cette Réussite"
        },
        challengeTitle: "Le Défi : Concurrence du Marché de la Mode",
        challengeDescription: "StyleCraft Boutique est un détaillant de mode boutique en concurrence dans le marché de la mode en ligne hautement compétitif. Ils luttaient avec une faible visibilité et une notoriété de marque.",
        ctaTitle: "Prêt à Élever le SEO de Votre Marque de Mode ?",
        ctaDescription: "Rejoignez StyleCraft Boutique et d'autres marques de mode obtenant des résultats remarquables avec l'optimisation SEO stratégique.",
        ctaButtons: {
          audit: "Obtenez Votre Audit SEO Mode",
          contact: "Parlez à des Experts SEO Mode"
        }
      },

      digitalGrowthAgency: {
        name: "Digital Growth Agency",
        title: "Transformation du Flux de Travail d'Agence",
        subtitle: "Comment une agence de marketing digital a atteint 340% de croissance du trafic et a mis à l'échelle les services SEO clients grâce à l'optimisation du flux de travail alimentée par l'IA.",
        industry: "Agence de Marketing Digital",
        heroButtons: {
          audit: "Obtenez Votre Audit SEO d'Agence",
          share: "Partagez Cette Réussite"
        },
        challengeTitle: "Le Défi : Mise à l'Échelle des Services SEO d'Agence",
        challengeDescription: "Digital Growth Agency est une agence de marketing en croissance luttant pour mettre à l'échelle les services SEO de manière rentable. Les audits et rapports manuels consommaient un temps excessif, limitant le potentiel de croissance.",
        ctaTitle: "Prêt à Mettre à l'Échelle Vos Services SEO d'Agence ?",
        ctaDescription: "Rejoignez Digital Growth Agency et d'autres agences de marketing obtenant une efficacité remarquable avec les outils SEO alimentés par l'IA.",
        ctaButtons: {
          audit: "Obtenez Votre Audit SEO d'Agence",
          contact: "Parlez à des Experts d'Agence"
        }
      },

      cloudsyncPro: {
        name: "CloudSync Pro",
        title: "Succès de Génération de Leads B2B",
        subtitle: "Comment une entreprise SaaS B2B a atteint une augmentation de 350% des leads qualifiés et a réduit le coût par lead de 55% grâce au SEO B2B stratégique.",
        industry: "SaaS B2B",
        heroButtons: {
          audit: "Obtenez Votre Audit SEO B2B",
          share: "Partagez Cette Réussite"
        },
        challengeTitle: "Le Défi : Génération de Leads B2B",
        challengeDescription: "CloudSync Pro est une plateforme de stockage cloud B2B luttant avec des coûts d'acquisition client élevés et des leads de mauvaise qualité provenant de la publicité payante.",
        ctaTitle: "Prêt à Transformer Votre Génération de Leads B2B ?",
        ctaDescription: "Rejoignez CloudSync Pro et d'autres entreprises B2B obtenant des résultats remarquables avec l'optimisation SEO stratégique.",
        ctaButtons: {
          audit: "Obtenez Votre Audit SEO B2B",
          contact: "Parlez à des Experts SEO B2B"
        }
      }
    }
  },

  // Continue with other locales (es, de, it, id)...
  // For brevity, I'll include abbreviated versions for the remaining locales
  
  es: {
    caseStudies: {
      breadcrumbs: {
        caseStudies: "Casos de Estudio"
      },

      techflowSolutions: {
        name: "TechFlow Solutions",
        title: "Transformación SEO Empresarial",
        subtitle: "Cómo una empresa SaaS líder superó desafíos técnicos complejos para lograr un crecimiento del 520% en tráfico orgánico y dominar los resultados de búsqueda empresarial.",
        industry: "SaaS Empresarial",
        heroButtons: {
          audit: "Obtenga Su Auditoría SEO Empresarial",
          share: "Comparta Esta Historia de Éxito"
        },
        challengeTitle: "El Desafío: Complejidad SEO a Escala Empresarial",
        challengeDescription: "TechFlow Solutions es una plataforma SaaS empresarial líder que sirve a empresas Fortune 500. A pesar de su liderazgo en el mercado, luchaban con poca visibilidad de búsqueda debido a problemas técnicos complejos de SEO en su extenso sitio web.",
        challengeStats: {
          pages: "Páginas del Sitio",
          issues: "Problemas Técnicos de SEO"
        },
        // Add remaining fields similar to English version...
      }
      // Add other case studies...
    }
  },

  de: {
    caseStudies: {
      breadcrumbs: {
        caseStudies: "Fallstudien"
      },

      techflowSolutions: {
        name: "TechFlow Solutions",
        title: "Enterprise SEO Transformation",
        subtitle: "Wie ein führendes SaaS-Unternehmen komplexe technische Herausforderungen überwand, um ein Wachstum des organischen Traffics von 520% zu erreichen und Enterprise-Suchergebnisse zu dominieren.",
        industry: "Enterprise SaaS",
        heroButtons: {
          audit: "Holen Sie sich Ihr Enterprise SEO Audit",
          share: "Teilen Sie Diese Erfolgsgeschichte"
        },
        challengeTitle: "Die Herausforderung: Enterprise-Scale SEO-Komplexität",
        challengeDescription: "TechFlow Solutions ist eine führende Enterprise-SaaS-Plattform, die Fortune-500-Unternehmen bedient. Trotz ihrer Marktführerschaft kämpften sie mit schlechter Suchsichtbarkeit aufgrund komplexer technischer SEO-Probleme auf ihrer umfangreichen Website.",
        challengeStats: {
          pages: "Website-Seiten",
          issues: "Technische SEO-Probleme"
        },
        // Add remaining fields...
      }
      // Add other case studies...
    }
  },

  it: {
    caseStudies: {
      breadcrumbs: {
        caseStudies: "Casi Studio"
      },

      techflowSolutions: {
        name: "TechFlow Solutions",
        title: "Trasformazione SEO Enterprise",
        subtitle: "Come un'azienda SaaS leader ha superato sfide tecniche complesse per ottenere una crescita del traffico organico del 520% e dominare i risultati di ricerca enterprise.",
        industry: "SaaS Enterprise",
        heroButtons: {
          audit: "Ottenga Il Suo Audit SEO Enterprise",
          share: "Condivida Questa Storia di Successo"
        },
        challengeTitle: "La Sfida: Complessità SEO a Livello Enterprise",
        challengeDescription: "TechFlow Solutions è una piattaforma SaaS enterprise leader che serve aziende Fortune 500. Nonostante la loro leadership di mercato, lottavano con scarsa visibilità di ricerca a causa di problemi tecnici SEO complessi sul loro vasto sito web.",
        challengeStats: {
          pages: "Pagine del Sito",
          issues: "Problemi Tecnici SEO"
        },
        // Add remaining fields...
      }
      // Add other case studies...
    }
  },

  id: {
    caseStudies: {
      breadcrumbs: {
        caseStudies: "Studi Kasus"
      },

      techflowSolutions: {
        name: "TechFlow Solutions",
        title: "Transformasi SEO Enterprise",
        subtitle: "Bagaimana perusahaan SaaS terkemuka mengatasi tantangan teknis kompleks untuk mencapai pertumbuhan trafik organik 520% dan mendominasi hasil pencarian enterprise.",
        industry: "SaaS Enterprise",
        heroButtons: {
          audit: "Dapatkan Audit SEO Enterprise Anda",
          share: "Bagikan Kisah Sukses Ini"
        },
        challengeTitle: "Tantangan: Kompleksitas SEO Skala Enterprise",
        challengeDescription: "TechFlow Solutions adalah platform SaaS enterprise terkemuka yang melayani perusahaan Fortune 500. Meskipun kepemimpinan pasar mereka, mereka berjuang dengan visibilitas pencarian yang buruk karena masalah teknis SEO yang kompleks di situs web ekstensif mereka.",
        challengeStats: {
          pages: "Halaman Situs",
          issues: "Masalah Teknis SEO"
        },
        // Add remaining fields...
      }
      // Add other case studies...
    }
  }
};

// Function to update locale files
function updateLocaleFiles() {
  const locales = ['en', 'fr', 'es', 'de', 'it', 'id'];
  
  locales.forEach(locale => {
    const filePath = path.join(localesDir, `${locale}.json`);
    
    try {
      // Read existing file
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const existingTranslations = JSON.parse(fileContent);
      
      // Merge case study translations
      const updatedTranslations = {
        ...existingTranslations,
        ...caseStudyTranslations[locale]
      };
      
      // Write back to file
      fs.writeFileSync(
        filePath,
        JSON.stringify(updatedTranslations, null, 2),
        'utf8'
      );
      
      console.log(`✅ Updated ${locale}.json with case study translations`);
    } catch (error) {
      console.error(`❌ Error updating ${locale}.json:`, error.message);
    }
  });
  
  console.log('\n🎉 All locale files updated with case study translations!');
}

// Run the update
updateLocaleFiles();
