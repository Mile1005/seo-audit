/**
 * TypeScript types for next-intl translation keys
 * Auto-generated from messages/en.json
 *
 * Usage:
 * import { useTranslations } from 'next-intl';
 *
 * const t = useTranslations('dashboard');
 * t('title') // ✅ Type-safe with autocomplete
 * t('invalid') // ❌ TypeScript error
 */

export type Messages = {
  common: {
    loading: string;
    error: string;
    success: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    create: string;
    update: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    clear: string;
    apply: string;
    confirm: string;
    yes: string;
    no: string;
    all: string;
    none: string;
    or: string;
    and: string;
    viewMore: string;
    viewLess: string;
    export: string;
    import: string;
    download: string;
    upload: string;
    share: string;
    copy: string;
    copied: string;
    refresh: string;
    retry: string;
    undo: string;
    redo: string;
    select: string;
    selected: string;
    deselect: string;
    selectAll: string;
  };
  nav: {
    home: string;
    features: string;
    pricing: string;
    blog: string;
    about: string;
    contact: string;
    dashboard: string;
    login: string;
    signup: string;
    logout: string;
    help: string;
    docs: string;
    support: string;
    status: string;
    demo: string;
    caseStudies: string;
  };
  home: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    ctaSecondary: string;
    trustedBy: string;
    freeTrialNoCreditCard: string;
  };
  meta: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    welcome: string;
    overview: {
      title: string;
      description: string;
      totalProjects: string;
      activeAudits: string;
      avgScore: string;
      improvements: string;
    };
    keywordTracking: {
      title: string;
      description: string;
      totalKeywords: string;
      topRankings: string;
      improved: string;
      declined: string;
    };
    backlinkAnalysis: {
      title: string;
      description: string;
      totalBacklinks: string;
      domainAuthority: string;
      newBacklinks: string;
    };
    competitorInsights: {
      title: string;
      description: string;
      competitorsTracked: string;
      yourRank: string;
      gapAnalysis: string;
    };
    recentAudits: {
      title: string;
      viewAll: string;
      noAudits: string;
      completedOn: string;
    };
  };
  audit: {
    title: string;
    subtitle: string;
    points: string;
    startAudit: string;
    runningAudit: string;
    auditComplete: string;
    analyzeUrl: string;
    enterUrl: string;
    urlPlaceholder: string;
    results: {
      title: string;
      overallScore: string;
      excellent: string;
      good: string;
      poor: string;
      needsImprovement: string;
      completedOn: string;
      auditId: string;
      excellentPerformance: string;
      goodPerformance: string;
      poorPerformance: string;
    };
    scores: {
      seo: string;
      performance: string;
      accessibility: string;
      bestPractices: string;
      userExperience: string;
      security: string;
    };
    categories: {
      criticalIssues: string;
      warnings: string;
      passed: string;
      opportunities: string;
      quickWins: string;
    };
    issues: {
      severity: {
        critical: string;
        high: string;
        medium: string;
        low: string;
        info: string;
      };
      fix: string;
      learnMore: string;
      recommendation: string;
      impact: string;
      effort: string;
    };
    coreWebVitals: {
      title: string;
      lcp: string;
      fid: string;
      cls: string;
      fcp: string;
      ttfb: string;
      good: string;
      needsWork: string;
      bad: string;
    };
    metaTags: {
      title: string;
      titleTag: string;
      metaDescription: string;
      ogTags: string;
      twitterCards: string;
      canonical: string;
      robots: string;
    };
    structuredData: {
      title: string;
      detected: string;
      valid: string;
      invalid: string;
      warnings: string;
      organization: string;
      website: string;
      article: string;
      product: string;
    };
    export: {
      pdf: string;
      csv: string;
      json: string;
      downloading: string;
      success: string;
    };
  };
  keywords: {
    title: string;
    subtitle: string;
    search: string;
    searchPlaceholder: string;
    analyzing: string;
    noResults: string;
    table: {
      keyword: string;
      volume: string;
      difficulty: string;
      cpc: string;
      competition: string;
      intent: string;
      trend: string;
      opportunity: string;
    };
    difficulty: {
      easy: string;
      medium: string;
      hard: string;
      veryHard: string;
    };
    intent: {
      informational: string;
      navigational: string;
      transactional: string;
      commercial: string;
    };
    filters: {
      volume: string;
      difficulty: string;
      cpc: string;
      minVolume: string;
      maxVolume: string;
      minDifficulty: string;
      maxDifficulty: string;
    };
    variations: {
      title: string;
      generating: string;
      questions: string;
      longTail: string;
      related: string;
      comparisons: string;
    };
    tracking: {
      add: string;
      addAll: string;
      remove: string;
      tracking: string;
      success: string;
    };
  };
  backlinks: {
    title: string;
    subtitle: string;
    overview: {
      totalBacklinks: string;
      referringDomains: string;
      domainAuthority: string;
      pageAuthority: string;
      trustFlow: string;
      citationFlow: string;
    };
    table: {
      url: string;
      anchorText: string;
      da: string;
      pa: string;
      type: string;
      status: string;
      firstSeen: string;
      lastChecked: string;
    };
    types: {
      dofollow: string;
      nofollow: string;
      ugc: string;
      sponsored: string;
    };
    status: {
      active: string;
      lost: string;
      new: string;
      broken: string;
    };
    filters: {
      type: string;
      status: string;
      minDA: string;
      anchorText: string;
    };
    analysis: {
      toxicLinks: string;
      opportunities: string;
      gapAnalysis: string;
      anchorDistribution: string;
    };
  };
  projects: {
    title: string;
    create: string;
    edit: string;
    deleteAction: string;
    settings: string;
    noProjects: string;
    form: {
      name: string;
      namePlaceholder: string;
      url: string;
      urlPlaceholder: string;
      description: string;
      descriptionPlaceholder: string;
      create: string;
      update: string;
    };
    deleteDialog: {
      title: string;
      message: string;
      confirm: string;
      cancel: string;
    };
  };
  auth: {
    login: {
      title: string;
      subtitle: string;
      email: string;
      emailPlaceholder: string;
      password: string;
      passwordPlaceholder: string;
      rememberMe: string;
      forgotPassword: string;
      submit: string;
      noAccount: string;
      signupLink: string;
      orContinueWith: string;
      google: string;
      github: string;
    };
    signup: {
      title: string;
      subtitle: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      password: string;
      passwordPlaceholder: string;
      confirmPassword: string;
      confirmPasswordPlaceholder: string;
      agreeToTerms: string;
      terms: string;
      privacy: string;
      submit: string;
      haveAccount: string;
      loginLink: string;
    };
    forgotPassword: {
      title: string;
      subtitle: string;
      email: string;
      emailPlaceholder: string;
      submit: string;
      backToLogin: string;
      success: string;
    };
    resetPassword: {
      title: string;
      subtitle: string;
      password: string;
      passwordPlaceholder: string;
      confirmPassword: string;
      confirmPasswordPlaceholder: string;
      submit: string;
      success: string;
    };
    verifyEmail: {
      title: string;
      subtitle: string;
      checkInbox: string;
      didntReceive: string;
      resend: string;
      resending: string;
      resent: string;
    };
    errors: {
      invalidCredentials: string;
      emailExists: string;
      passwordMismatch: string;
      weakPassword: string;
      invalidEmail: string;
      required: string;
      serverError: string;
      sessionExpired: string;
    };
  };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    save: string;
    free: {
      name: string;
      price: string;
      period: string;
      description: string;
      cta: string;
      features: {
        audits: string;
        keywords: string;
        backlinks: string;
        support: string;
      };
    };
    pro: {
      name: string;
      price: string;
      period: string;
      description: string;
      cta: string;
      popular: string;
      features: {
        audits: string;
        keywords: string;
        backlinks: string;
        competitors: string;
        reports: string;
        support: string;
      };
    };
    enterprise: {
      name: string;
      price: string;
      period: string;
      description: string;
      cta: string;
      features: {
        audits: string;
        api: string;
        whiteLabel: string;
        team: string;
        dedicated: string;
        sla: string;
      };
    };
    faq: {
      title: string;
      question1: string;
      answer1: string;
      question2: string;
      answer2: string;
      question3: string;
      answer3: string;
      question4: string;
      answer4: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    audit: {
      title: string;
      description: string;
      features: {
        technical: string;
        onPage: string;
        performance: string;
        accessibility: string;
      };
    };
    keywords: {
      title: string;
      description: string;
      features: {
        research: string;
        tracking: string;
        variations: string;
        intent: string;
      };
    };
    backlinks: {
      title: string;
      description: string;
      features: {
        monitoring: string;
        analysis: string;
        opportunities: string;
        competitors: string;
      };
    };
    reports: {
      title: string;
      description: string;
      features: {
        pdf: string;
        csv: string;
        scheduled: string;
        whiteLabel: string;
      };
    };
  };
  errors: {
    "404": {
      title: string;
      message: string;
      backHome: string;
    };
    "500": {
      title: string;
      message: string;
      retry: string;
    };
    generic: {
      title: string;
      message: string;
      retry: string;
    };
    network: {
      title: string;
      message: string;
      retry: string;
    };
    rateLimit: {
      title: string;
      message: string;
      wait: string;
    };
  };
  notifications: {
    auditComplete: string;
    auditFailed: string;
    keywordAdded: string;
    keywordsAdded: string;
    projectCreated: string;
    projectUpdated: string;
    projectDeleted: string;
    settingsSaved: string;
    exportStarted: string;
    exportComplete: string;
    exportFailed: string;
  };
  footer: {
    product: string;
    company: string;
    resources: string;
    legal: string;
    copyright: string;
    madeWith: string;
  };
};

declare module "next-intl" {
  interface IntlMessages extends Messages {}
}
