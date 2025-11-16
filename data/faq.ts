/**
 * FAQ Data Structure
 * Organized by categories with questions and answers
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      {
        id: 'what-is-avni',
        question: 'What Is Avni?',
        answer: 'Avni Is An Open-Source, Offline-First Data Collection And Case Management Platform Designed Specifically For NGOs And Social Sector Organizations. It Helps Field Teams Collect Data, Track Beneficiaries, And Generate Insights Even Without Internet Connectivity.',
      },
      {
        id: 'how-do-i-get-started',
        question: 'How Do I Get Started?',
        answer: 'Getting started with Avni is simple. First, sign up for an account on our website. Then, download the Avni mobile app from Google Play Store. Our team will help you configure your forms and workflows. You can also explore our demo accounts to see Avni in action before committing.',
      },
      {
        id: 'technical-expertise',
        question: 'How Do Technical Expertise To Use Avni?',
        answer: 'No extensive technical expertise is required. Avni is designed to be user-friendly for field workers with basic smartphone skills. For administrators setting up forms and workflows, basic computer literacy is sufficient. Our training and support team provides comprehensive guidance throughout your journey.',
      },
      {
        id: 'try-before-committing',
        question: 'Can I Try Avni Before Committing?',
        answer: 'Yes! We offer demo accounts that allow you to explore Avni\'s features and capabilities. You can test data collection, reporting, and case management features with sample data. Contact our team to get access to a demo account tailored to your use case.',
      },
    ],
  },
  {
    id: 'features-capabilities',
    title: 'Features & Capabilities',
    items: [
      {
        id: 'offline-work',
        question: 'Does Avni Work Offline?',
        answer: 'Yes, Avni is built with an offline-first approach. Field workers can collect data, update records, and access information without internet connectivity. All data is stored locally on the device and automatically syncs with the server when internet connection is available.',
      },
      {
        id: 'data-security',
        question: 'How Secure Is My Data?',
        answer: 'Data security is our top priority. Avni uses industry-standard encryption for data transmission and storage. We provide role-based access control, audit trails, and regular security updates. For organizations requiring dedicated hosting, we offer private cloud deployments with enhanced security measures.',
      },
      {
        id: 'customization',
        question: 'Can I Customize Forms And Workflows?',
        answer: 'Absolutely! Avni is highly customizable. You can create custom forms, define workflows, set up validation rules, and configure data collection processes to match your program\'s specific needs. Our implementation team assists with initial setup and customization.',
      },
      {
        id: 'reporting-analytics',
        question: 'What Kind Of Reports Can I Generate?',
        answer: 'Avni provides comprehensive reporting capabilities including real-time dashboards, custom reports, data exports, and analytics. You can track program performance, monitor field activities, generate beneficiary reports, and create visualizations for stakeholder presentations.',
      },
      {
        id: 'integration',
        question: 'Does Avni Integrate With Other Systems?',
        answer: 'Yes, Avni offers API access for integration with other systems. You can connect Avni with your existing tools for accounting, communication, or data analysis. Our technical team can assist with integration requirements.',
      },
    ],
  },
  {
    id: 'pricing-plans',
    title: 'Pricing & Plans',
    items: [
      {
        id: 'pricing-model',
        question: 'What Is Avni\'s Pricing Model?',
        answer: 'Avni offers flexible pricing based on your organization\'s size and needs. We have plans for small NGOs, growing organizations, and large-scale implementations. Pricing includes cloud hosting, support, and regular updates. Contact our sales team for detailed pricing information.',
      },
      {
        id: 'free-trial',
        question: 'Is There A Free Trial Available?',
        answer: 'Yes, we offer a 30-day free trial for new organizations. This allows you to test all features with your team and evaluate if Avni meets your needs. No credit card is required to start the trial.',
      },
      {
        id: 'payment-methods',
        question: 'What Payment Methods Do You Accept?',
        answer: 'We accept various payment methods including bank transfers, credit cards, and online payment gateways. For annual subscriptions, we also offer invoice-based payments. International payments are supported through our payment partners.',
      },
      {
        id: 'cancel-subscription',
        question: 'Can I Cancel My Subscription Anytime?',
        answer: 'Yes, you can cancel your subscription at any time. We offer month-to-month plans with no long-term commitment. If you cancel, you\'ll retain access until the end of your billing period. We also provide data export options if you decide to move away from Avni.',
      },
    ],
  },
  {
    id: 'technical-support',
    title: 'Technical Support',
    items: [
      {
        id: 'support-channels',
        question: 'What Support Channels Are Available?',
        answer: 'We provide multiple support channels including email support, phone support during business hours, comprehensive documentation, video tutorials, and a community forum. Premium plans include dedicated support managers and priority response times.',
      },
      {
        id: 'training-provided',
        question: 'Do You Provide Training For My Team?',
        answer: 'Yes, we offer comprehensive training programs for both field workers and administrators. Training includes online sessions, on-site workshops (for larger implementations), video tutorials, and documentation. We customize training based on your team\'s needs and technical proficiency.',
      },
      {
        id: 'response-time',
        question: 'What Is Your Support Response Time?',
        answer: 'Our standard support response time is within 24 hours for email queries. Premium plans receive priority support with response times of 4-8 hours. Critical issues affecting data collection are addressed immediately. Phone support is available during business hours.',
      },
      {
        id: 'data-migration',
        question: 'Can You Help With Data Migration?',
        answer: 'Yes, our implementation team assists with data migration from your existing systems. We support various data formats and provide tools for bulk data import. The migration process is carefully planned to ensure data integrity and minimal disruption to your operations.',
      },
    ],
  },
  {
    id: 'implementation',
    title: 'Implementation & Setup',
    items: [
      {
        id: 'implementation-time',
        question: 'How Long Does Implementation Take?',
        answer: 'Implementation timeline varies based on complexity. Simple setups can be completed in 2-3 weeks, while complex implementations with custom workflows may take 6-8 weeks. Our team works closely with you to create a realistic timeline and ensure smooth deployment.',
      },
      {
        id: 'team-size',
        question: 'What Team Size Do I Need?',
        answer: 'You can start with any team size. Avni scales from small teams of 5-10 field workers to large programs with hundreds of users. We recommend having at least one program administrator who will manage the system and coordinate with field workers.',
      },
      {
        id: 'mobile-requirements',
        question: 'What Are The Mobile Device Requirements?',
        answer: 'Avni works on Android devices running Android 5.0 or higher. We recommend devices with at least 2GB RAM and 16GB storage for optimal performance. The app is optimized to work on budget smartphones commonly used by field workers.',
      },
      {
        id: 'internet-requirements',
        question: 'What Internet Speed Is Required?',
        answer: 'Avni is designed to work with minimal internet connectivity. For initial app setup and data sync, a basic 2G/3G connection is sufficient. Field workers can work completely offline and sync data when they have connectivity. Administrators accessing the web dashboard need a stable internet connection.',
      },
    ],
  },
];

/**
 * Get all FAQ items flattened for search
 */
export function getAllFAQItems(): Array<FAQItem & { categoryTitle: string; categoryId: string }> {
  return faqData.flatMap(category =>
    category.items.map(item => ({
      ...item,
      categoryTitle: category.title,
      categoryId: category.id,
    }))
  );
}

/**
 * Search FAQ items by query
 */
export function searchFAQItems(query: string): Array<FAQItem & { categoryTitle: string; categoryId: string }> {
  if (!query.trim()) {
    return getAllFAQItems();
  }

  const searchTerm = query.toLowerCase().trim();
  const allItems = getAllFAQItems();

  return allItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm) ||
    item.answer.toLowerCase().includes(searchTerm)
  );
}
