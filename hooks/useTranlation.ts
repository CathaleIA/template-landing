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
    head: string;
    title: string;
    description: string;
    features: { title: string; description: string }[];
    oursecurity: {
      title: string;
      description: string;
      listsecurity: string[];
    };
    finaltext: string;
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
    head: string;
    title: string;
    description: string;
    content: string;
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
      head: '',
      title: '',
      description: '',
      features: [],
      oursecurity: { title: '', description: '', listsecurity: [] },
      finaltext: '',
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
      head: '',
      title: '',
      description: '',
      content: '',
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