// hooks/useTranslation.ts
'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

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
};

export const useTranslation = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Translations>({
    header: {
      title: '',
      nav: [],
      buttons: { login: '', signup: '' },
    },
     whyChoose: {
      subtitle: '',
      mainTitle: '',
      highlightedTitle: '',
      description: '',
      ctaButton: '',
      stats: [],
      featuresTitle: '',
      featuresDescription: '',
      features: [],
      techTitle: '',
      techDescription: '',
      techFeatures: [],
      ctaTitle: '',
      ctaDescription: '',
      faqTitle: '',
      faqSubtitle: '',
      faqs: [],
    },
    hero: {
      hookPhrase: {
        line1: '',
        line2: '',
      },
      description: '',
      buttons: { getStarted: '', demo: '' },
    },
    features: {
      head: '',
      title: '',
      description: '',
      items: [],
    },
    dashboard: {
      head: '',
      title: '',
      description: '',
      features: [],
    },
    integrations: {
      head: '',
      title: '',
      description: '',
      api: { title: '', description: '', features: [] },
      process: { title: '', steps: [] },
    },
    security: {
      mainFeatures: [],
      subtitle: '',
      mainTitle: '',
      highlightedTitle: '',
      services: [],
      bottomFeatures: []
    },
    testimonials: {
      head: '',
      title: '',
      description: '',
      items: [],
    },
    pricing: {
      head: '',
      title: '',
      description: '',
      topics: [],
      add: '',
      button: '',
      plans: [],
    },
    about: {
      badge: '',
      mainTitle: '',
      highlightedTitle: '',
      description: '',
      primaryButton: '',
      secondaryButton: '',
    },
    contact: {
      head: '',
      title: '',
      description: '',
      benefitsTitle: '',
      benefits: [],
    },
    footer: {
      copyright: '',
      description: '',
      sections: {
        contact: '',
        quickLinks: '',
        services: ''
      },
      contact: {
        phone: '',
        phoneLabel: '',
        email: '',
        emailLabel: '',
        address: '',
        addressLabel: '',
        whatsapp: '',
        linkedin: '',
        github: ''
      },
      social: { 
        whatsapp: '', 
        linkedin: '', 
        github: '' 
      },
      links: {
        home: '',
        about: '',
        products: '',
        news: '',
        contact: ''
      },
      services: {
        evChargers: '',
        chargingStations: '',
        fastCharging: '',
        dcCharging: '',
        manufacturers: ''
      },
      legal: {
        privacy: '',
        terms: '',
        cookies: ''
      }
    },
  });

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationsModule = await import(`@/../locales/${language}.json`);
        setTranslations(translationsModule.default);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };
    loadTranslations();
  }, [language]);

  return translations;
};