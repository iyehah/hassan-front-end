export interface FeatureItem {
    title: string;
    description: string;
    icon: string;
  }
  
  export interface NavItem {
    label: string;
    path: string;
  }
  
  export interface ChatHistoryItem {
    id: string;
    title: string;
    date: string;
  }
  
  export interface WebPageContent {
    hero: {
      title: string;
      subtitle: string;
      getStarted: string;
      learnMore: string;
      ctaTitle: string;
      ctaSubtitle: string;
      startFreeTrial: string;
    };
    features: {
      title: string;
      subtitle: string;
      items: FeatureItem[];
    };
  }
  
  export interface ChatPageContent {
    error: string;
  }
  
  export interface LoginPageContent {
    title: string;
    subtitle: string;
    labels: {
      email: string;
      password: string;
      rememberMe: string;
      forgotPassword: string;
      newToBrainWave: string;
    };
    buttons: {
      signIn: string;
      signingIn: string;
      createAccount: string;
    };
    errors: {
      fillAllFields: string;
      invalidCredentials: string;
    };
  }
  
