// hooks/useTranslation.ts
"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Definir el tipo para las traducciones
type Translations = {
  header: {
    title: string;
    nav: { id: string; title: string }[];
    buttons: {
      login: string;
      signup: string;
    };
  };
  whyChoose: {
    subtitle: string;
    mainTitle: string;
    highlightedTitle: string;
    description: string;
    ctaButton: string;
    stats: {
      value: string;
      description: string;
    }[];
    featuresTitle: string;
    featuresDescription: string;
    features: {
      icon: string;
      title: string;
      description: string;
      benefit: string;
    }[];
    techTitle: string;
    techDescription: string;
    techFeatures: {
      name: string;
      description: string;
    }[];
    ctaTitle: string;
    ctaDescription: string;
    faqTitle: string;
    faqSubtitle: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
  hero: {
    hookPhrase: {
      line1: string;
      line2: string;
    };
    description: string;
    buttons: {
      getStarted: string;
      demo: string;
    };
  };
  features: {
    head: string;
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  dashboard: {
    head: string;
    title: string;
    description: string;
    text: string;
    title2: string;
    description2: string;
    features: {
      title: string;
      value: string;
      badge: string;
      description: string;
      image: string;
      hoverTitle: string;
      capabilities: string[];
      catchPhrase: string;
    }[];
  };
  integrations: {
    head: string;
    title: string;
    description: string;
    api: {
      title: string;
      description: string;
      features: string[];
    };
    process: {
      title: string;
      steps: { title: string; description: string }[];
    };
  };
  security: {
    mainFeatures: {
      icon: string;
      badge: string;
      title: string;
      description: string;
      link: string;
    }[];
    subtitle: string;
    mainTitle: string;
    highlightedTitle: string;
    services: {
      title: string;
      description: string;
    }[];
    bottomFeatures: string[];
  };
  testimonials: {
    head: string;
    title: string;
    description: string;
    items: { quote: string; author: string; role: string }[];
  };
  pricing: {
    head: string;
    title: string;
    description: string;
    texto1: string;
    texto2: string;
    boton1: string;
    boton2: string;
    texto3: string;
    texto4: string;
    topics: string[];
    add: string;
    button: string;
    plans: {
      name: string;
      monthlyPrice: number;
      description: string;
      features: string[];
      popular: boolean;
    }[];
  };
  about: {
    badge: string;
    mainTitle: string;
    highlightedTitle: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
  };
  analysis: {
    subtitle: string;
    mainTitle: string;
    highlightedTitle: string;
    description: string;
    mainFeatures: {
      badge: string;
      icon: string;
      title: string;
      description: string;
    }[];
    bottomFeatures: string[];
  };
  contact: {
    head: string;
    title: string;
    description: string;
    benefitsTitle: string;
    benefits: string[];
  };
  footer: {
    copyright: string;
    description: string;
    sections: {
      contact: string;
      quickLinks: string;
      services: string;
    };
    contact: {
      phone: string;
      phoneLabel: string;
      email: string;
      emailLabel: string;
      address: string;
      addressLabel: string;
      whatsapp: string;
      linkedin: string;
      github: string;
    };
    social: {
      whatsapp: string;
      linkedin: string;
      github: string;
    };
    links: {
      home: string;
      about: string;
      products: string;
      news: string;
      contact: string;
    };
    services: {
      evChargers: string;
      chargingStations: string;
      fastCharging: string;
      dcCharging: string;
      manufacturers: string;
    };
    legal: {
      privacy: string;
      terms: string;
      cookies: string;
    };
  };
  inteligent: {
    head: string;
    subtitle: string;
    mainTitle: string;
    highlightedTitle: string;
    description: string;
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  flexible: {
    valueProposition: {
      id: string;
      title: string;
      description: string;
    };
    servicesSection: {
      title: string;
      list: {
        id: string;
        icon: string;
        title: string;
        description: string;
      }[];
    };
  };
  security_standar: {
    // 1. La introducción, basada en tu tarjeta
    intro: {
      title: string;
      description: string;
      link?: {
        text: string;
        href: string;
      };
    };

    // 2. Una lista de características de seguridad
    features: {
      title: string; // Ej: "Un Enfoque de Seguridad en Capas"
      list: {
        id: string;
        icon: string;
        title: string;
        description: string;
      }[]; // Un array de features
    };

    // 3. Una sección para logos de confianza/cumplimiento
    trustSection: {
      title: string; // Ej: "Cumplimiento Normativo"
      logos: {
        id: string;
        name: string; // El nombre del logo, ej: "ISO 27001"
        icon: string; // El nombre del icono del logo
      }[];
    };
  };
  reports: {
    subtitle: string;
    mainTitle: string;
    highlightedTitle: string;
    description: string;
    mainFeatures: {
      badge: string;
      icon: string;
      title: string;
      description: string;
    }[];
    bottomFeatures: string[];
  };
  aboutUs: {
    hero: {
      title: string;
      subtitle: string;
      kpis: { label: string; value: string }[];
    };
    missionVision: {
      title: string;
      items: {
        id: string;
        icon: string;
        heading: string;
        shortDescription: string;
        longDescription: string;
      }[];
    };
    differentiators: {
      title: string;
      items: {
        id: string;
        icon: string; // clave de icono lucide
        heading: string;
        description: string;
        metric?: string; // opcional (ej. “4–6 semanas”)
      }[];
    };
    timeline: {
      title: string;
      items: {
        year: string;
        title: string;
        description: string;
      }[];
    };
  };
  aboutContact: {
    header: {
      title: string;
      subtitle: string;
      items?: { text: string }[];
    };
    contacts: {
      id: string;
      icon: string;
      title: string;
      value: string;
      description?: string;
      href?: string;
    }[];
    presence?: {
      title: string;
      subtitle?: string;
      subtext?: string;
      text?: string;
      items: { name: string; note?: string }[];
    };
    closing?: {
      text: string;
      subtext?: string;
    };
  };
  servicesShowcase: {
    head: {
      title: string; // Título de la sección (distinto a "Nuestros servicios")
      subtitle?: string; // Subtítulo amplio
      intro?: string; // Párrafo introductorio largo
    };
    items: {
      id: string; // ancla única: "realtime", "reports", "predictive", "control"
      icon?: string; // nombre de icono lucide (opcional)
      image?: string; // ruta opcional de imagen decorativa
      title: string; // Título del bloque (p. ej. "Análisis en tiempo real")
      summary: string; // Resumen corto para la tarjeta
      body: string; // Texto largo (varios párrafos permitidos con \\n)
      bullets?: { text: string }[]; // Lista de beneficios
      stats?: { label: string; value: string }[]; // Métricas destacadas
      cta?: { label: string; href?: string; targetId?: string }; // href o targetId interno para scroll
    }[];
  };
  privacy: {
    title: string;
    lastUpdatedLabel: string;
    intro: string;
    sections: {
      id: string;
      title: string;
      text: string;
    }[];
  };
  terms: {
    title: string;
    lastUpdatedLabel: string;
    intro: string;
    sections: {
      id: string;
      title: string;
      text: string;
    }[];
  };
  cookies: {
    title: string;
    lastUpdatedLabel: string;
    intro: string;
    consentNote: string; // Texto breve sobre consentimiento de cookies
    managePrefsLabel: string; // Etiqueta para "Gestionar preferencias" (solo texto)
    sections: {
      id: string;
      title: string;
      text: string;
    }[];
    categories: {
      id: string; // ej: "necessary", "analytics", "marketing"
      name: string; // ej: "Necesarias", "Analíticas", "Marketing"
      description: string; // descripción de la categoría
    }[];
  };
  dataExperience: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
    };
    highlights: {
      id: string;
      label: string;
      value: string;
    }[];
    pillars: {
      id: string;
      title: string;
      text: string;
      icon: string;
    }[];
    process: {
      id: string;
      title: string;
      text: string;
    }[];
    visuals: {
      id: string;
      caption: string;
    }[];
    note: string;
  };
};

export const useTranslation = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Translations>({
    header: {
      title: "",
      nav: [],
      buttons: { login: "", signup: "" },
    },
    whyChoose: {
      subtitle: "",
      mainTitle: "",
      highlightedTitle: "",
      description: "",
      ctaButton: "",
      stats: [],
      featuresTitle: "",
      featuresDescription: "",
      features: [],
      techTitle: "",
      techDescription: "",
      techFeatures: [],
      ctaTitle: "",
      ctaDescription: "",
      faqTitle: "",
      faqSubtitle: "",
      faqs: [],
    },
    hero: {
      hookPhrase: {
        line1: "",
        line2: "",
      },
      description: "",
      buttons: { getStarted: "", demo: "" },
    },
    features: {
      head: "",
      title: "",
      description: "",
      items: [],
    },
    dashboard: {
      head: "",
      title: "",
      description: "",
      text: "",
      title2: "",
      description2: "",
      features: [],
    },
    integrations: {
      head: "",
      title: "",
      description: "",
      api: { title: "", description: "", features: [] },
      process: { title: "", steps: [] },
    },
    security: {
      mainFeatures: [],
      subtitle: "",
      mainTitle: "",
      highlightedTitle: "",
      services: [],
      bottomFeatures: [],
    },
    testimonials: {
      head: "",
      title: "",
      description: "",
      items: [],
    },
    pricing: {
      head: "",
      title: "",
      description: "",
      texto1: "",
      texto2: "",
      boton1: "",
      boton2: "",
      texto3: "",
      texto4: "",
      topics: [],
      add: "",
      button: "",
      plans: [],
    },
    about: {
      badge: "",
      mainTitle: "",
      highlightedTitle: "",
      description: "",
      primaryButton: "",
      secondaryButton: "",
    },
    analysis: {
      subtitle: "",
      mainTitle: "",
      highlightedTitle: "",
      description: "",
      mainFeatures: [],
      bottomFeatures: [],
    },
    contact: {
      head: "",
      title: "",
      description: "",
      benefitsTitle: "",
      benefits: [],
    },
    footer: {
      copyright: "",
      description: "",
      sections: {
        contact: "",
        quickLinks: "",
        services: "",
      },
      contact: {
        phone: "",
        phoneLabel: "",
        email: "",
        emailLabel: "",
        address: "",
        addressLabel: "",
        whatsapp: "",
        linkedin: "",
        github: "",
      },
      social: {
        whatsapp: "",
        linkedin: "",
        github: "",
      },
      links: {
        home: "",
        about: "",
        products: "",
        news: "",
        contact: "",
      },
      services: {
        evChargers: "",
        chargingStations: "",
        fastCharging: "",
        dcCharging: "",
        manufacturers: "",
      },
      legal: {
        privacy: "",
        terms: "",
        cookies: "",
      },
    },
    inteligent: {
      head: "",
      subtitle: "",
      mainTitle: "",
      highlightedTitle: "",
      description: "",
      items: [],
    },
    flexible: {
      valueProposition: {
        id: "",
        title: "",
        description: "",
      },
      servicesSection: {
        title: "",
        list: [], // Un array vacío como en tu ejemplo 'items: []'
      },
    },
    security_standar: {
      intro: {
        title: "",
        description: "",
        link: {
          text: "",
          href: "",
        },
      },
      features: {
        title: "",
        list: [],
      },
      trustSection: {
        title: "",
        logos: [],
      },
    },
    reports: {
      subtitle: "",
      mainTitle: "",
      highlightedTitle: "",
      description: "",
      mainFeatures: [],
      bottomFeatures: [],
    },
    aboutUs: {
      hero: {
        title: "",
        subtitle: "",
        kpis: [],
      },
      missionVision: {
        title: "",
        items: [],
      },
      differentiators: {
        title: "",
        items: [],
      },
      timeline: {
        title: "",
        items: [],
      },
    },
    aboutContact: {
      header: { title: "", subtitle: "", items: [] },
      contacts: [],
      presence: { title: "", subtitle: "", subtext: "", text: "", items: [] },
      closing: { text: "", subtext: "" },
    },
    servicesShowcase: {
      head: { title: "", subtitle: "", intro: "" },
      items: [],
    },
    privacy: {
      title: "",
      lastUpdatedLabel: "",
      intro: "",
      sections: [
        {
          id: "",
          title: "",
          text: "",
        },
      ],
    },
    terms: {
      title: "",
      lastUpdatedLabel: "",
      intro: "",
      sections: [
        {
          id: "",
          title: "",
          text: "",
        },
      ],
    },
    cookies: {
      title: "",
      lastUpdatedLabel: "",
      intro: "",
      consentNote: "",
      managePrefsLabel: "",
      sections: [
        {
          id: "",
          title: "",
          text: "",
        },
      ],
      categories: [
        {
          id: "",
          name: "",
          description: "",
        },
      ],
    },
    dataExperience: {
      hero: {
        badge: "",
        title: "",
        subtitle: "",
      },
      highlights: [
        {
          id: "",
          label: "",
          value: "",
        },
      ],
      pillars: [
        {
          id: "",
          title: "",
          text: "",
          icon: "",
        },
      ],
      process: [
        {
          id: "",
          title: "",
          text: "",
        },
      ],
      visuals: [
        {
          id: "",
          caption: "",
        },
      ],
      note: "",
    },
  });

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationsModule = await import(
          `@/../locales/${language}.json`
        );
        setTranslations(translationsModule.default);
      } catch (error) {
        console.error("Error loading translations:", error);
      }
    };
    loadTranslations();
  }, [language]);

  return translations;
};
