/**
 * Navigation dropdown data
 * Based on Figma design: Desktop - 6 (node 1-560)
 */

export interface UseCaseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface FeaturedBlog {
  title: string;
  image: string;
  link: string;
}

export interface DropdownTab {
  id: string;
  label: string;
  icon: string;
}

export const productServicesTabs: DropdownTab[] = [
  {
    id: 'services',
    label: 'Services',
    icon: '/icons/navigation/services.svg',
  },
  {
    id: 'use-cases',
    label: 'Use Cases',
    icon: '/icons/navigation/usecase.svg',
  },
];

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export const servicesItems: ServiceItem[] = [
  {
    id: 'avni-cloud',
    title: 'Avni Cloud',
    description: 'Secure, Reliable Hosting That Keeps Your Program Data Safe And Accessible Anytime',
    icon: '/icons/navigation/cloud.svg',
    link: '/services#avni-cloud',
  },
  {
    id: 'dedicated-hosting',
    title: 'Dedicated Hosting',
    description: 'End-To-End Guidance To Help Your Team Adopt, Use, And Grow Confidently With Avni',
    icon: '/icons/navigation/dedicated-hosting.svg',
    link: '/services#dedicated-hosting',
  },
  {
    id: 'training-support',
    title: 'Training & Support',
    description: 'End-To-End Guidance To Help Your Team Adapt, Use, And Grow Confidently With Avni',
    icon: '/icons/navigation/training_support.svg',
    link: '/services#training-support',
  },
  {
    id: 'implementation',
    title: 'Implementation',
    description: 'Expert Assistance In Setting Up And Tailoring Avni To Your Program\'s Unique Workflows',
    icon: '/icons/navigation/implementation.svg',
    link: '/services#implementation',
  },
];

export const useCasesItems: UseCaseItem[] = [
  {
    id: 'case-management',
    title: 'Case Management',
    description: 'Track Individual And Household Progress Over Time With Organized, Field-Ready Case Records',
    icon: '/icons/navigation/case-mgmt.svg',
    link: '/use-cases#case-management',
  },
  {
    id: 'reporting',
    title: 'Reporting',
    description: 'Generate Accurate, Real-Time Reports To Monitor Program Performance And Demonstrate Impact',
    icon: '/icons/navigation/reporting.svg',
    link: '/use-cases#reporting',
  },
  {
    id: 'mobile-medical-units',
    title: 'Mobile Medical Units & Camps',
    description: 'Empower Field Teams To Collect Data Offline During Visits And Community Camps With Ease',
    icon: '/icons/navigation/mmu-units.svg',
    link: '/use-cases#mobile-medical-units',
  },
  {
    id: 'surveys',
    title: 'Surveys',
    description: 'Design And Deploy Quick, Customisable Surveys To Capture Feedback And Measure Outcomes',
    icon: '/icons/navigation/survey.svg',
    link: '/use-cases#surveys',
  },
  {
    id: 'cohort-research',
    title: 'Cohort Based Research Studies',
    description: 'Manage Longitudinal Studies With Structured Data Collection And Built-In Participant Tracking',
    icon: '/icons/navigation/cohort.svg',
    link: '/use-cases#cohort-research',
  },
];

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export const solutionsItems: SolutionItem[] = [
  {
    id: 'education',
    title: 'Education',
    description: 'Tracking Learning Progress To Improve Education Quality',
    icon: '/icons/navigation/education.svg',
    link: '/solutions?solution=Education',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Strengthening Community Health With Real-Time Data',
    icon: '/icons/navigation/healthcare.svg',
    link: '/solutions?solution=Healthcare',
  },
  {
    id: 'water-sanitation',
    title: 'Water & Sanitation',
    description: 'Driving Clean Water And Hygiene Through Data',
    icon: '/icons/navigation/water.svg',
    link: '/solutions?solution=Water & Sanitation',
  },
  {
    id: 'waste-management',
    title: 'Waste Management',
    description: 'Empowering Waste-Pickers With Digital Tracking Tools',
    icon: '/icons/navigation/waste.svg',
    link: '/solutions?solution=Waste Management',
  },
  {
    id: 'social-security',
    title: 'Social Security',
    description: 'Ensuring Inclusion Through Accurate Beneficiary Data',
    icon: '/icons/navigation/social-security.svg',
    link: '/solutions?solution=Social Security',
  },
  {
    id: 'livelihood',
    title: 'Livelihood',
    description: 'Boosting Income Programs With Data-Driven Insights',
    icon: '/icons/navigation/livlihood.svg',
    link: '/solutions?solution=Livelihood',
  },
  {
    id: 'human-rights',
    title: 'Human Rights',
    description: 'Documenting And Defending Rights With Secure Data',
    icon: '/icons/navigation/human.svg',
    link: '/solutions?solution=Human Rights',
  },
  {
    id: 'legal-aid',
    title: 'Legal Aid',
    description: 'Managing Legal Cases Efficiently With Digital Systems',
    icon: '/icons/navigation/legal-aid.svg',
    link: '/solutions?solution=Legal Aid',
  },
];

/**
 * Resources Items - Resources dropdown menu items
 */
export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export const resourcesItems: ResourceItem[] = [
  {
    id: 'case-studies',
    title: 'Case Studies',
    description: 'Real Stories Of Digital Transformation In Action',
    icon: '/icons/resources/case-studies.svg',
    link: '/resources/case-studies',
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Stories, Ideas, And Insights From Field And Avni Community',
    icon: '/icons/resources/blog.svg',
    link: '/blog',
  },
  {
    id: 'events',
    title: 'Events',
    description: 'Stay Updated On Upcoming Avni Activities And Meetups',
    icon: '/icons/resources/events.svg',
    link: '/resources/events',
  },
  {
    id: 'media-gallery',
    title: 'Media Gallery',
    description: 'Discover On-Ground Stories And Live Sessions From Avni',
    icon: '/icons/resources/media-gallery.svg',
    link: '/resources/media-gallery',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Explore In-Depth Guides And Implementation Details',
    icon: '/icons/resources/documentation.svg',
    link: 'https://avni.readme.io/docs/getting-started',
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Quick Answers To Help You Get Started And Go Further',
    icon: '/icons/resources/faq.svg',
    link: '/resources/faq',
  },
  {
    id: 'demo',
    title: 'Demo Accounts',
    description: 'Explore Avni In Action Using Our Functional Demo Accounts',
    icon: '/icons/resources/demo1.svg',
    link: '/demo',
  },
];

/**
 * Featured Blog - This will be dynamically fetched from blog system in the future
 * For now, it's hardcoded to show the Goonj case study
 * TODO: Replace with API call to fetch latest featured blog when blog pages are built
 */
export const featuredBlog: FeaturedBlog = {
  title: 'How Goonj Uses Avni To Digitise Offline Data Collection And Inventory Flow >',
  image: '/images/goonj-featured.jpg',
  link: '/blog/goonj-case-study',
};
