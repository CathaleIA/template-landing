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
    tabs: {
      title: string;
      value: string;
      title2: string;
      description: string;
      keys: string[];
    }[];
    demo: {
      watch: string;
      try: string;
    };
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
    social: {
      twitter: string;
      linkedin: string;
      github: string;
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
      tabs: [],
      demo: { watch: '', try: '' },
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
      social: { twitter: '', linkedin: '', github: '' },
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