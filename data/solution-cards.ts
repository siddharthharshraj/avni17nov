/**
 * Solution Cards Data
 * Maps each solution sector to relevant case studies and blogs
 */

export interface SolutionCard {
  type: 'case-study' | 'blog';
  image: string;
  title: string;
  label: string;
  link: string;
}

export interface SolutionCTA {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export const solutionCards: Record<string, { cards: SolutionCard[]; cta: SolutionCTA }> = {
  'Education': {
    cards: [
      {
        type: 'case-study',
        image: '/images/education_impactstory.png',
        title: 'Scaling Rural Education - Building Lifelong Skills Beyond Classroom',
        label: 'Case Study',
        link: '/resources/case-studies/scaling-rural-education'
      },
      {
        type: 'case-study',
        image: '/images/case-studies/2024-09-19-Scaling-Rural-Education/CInI-1.png',
        title: 'Classroom Observation Tool for Andhra Pradesh',
        label: 'Case Study',
        link: '/resources/case-studies/classroom-observation-tool-for-andhra-pradesh'
      }
    ],
    cta: {
      icon: '🏠',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Education Specific Use Cases',
      link: '/demo'
    }
  },
  'Healthcare': {
    cards: [
      {
        type: 'case-study',
        image: '/images/case-studies/6-ways-how-Avni-is-helping-JSS-MCH-Phulwari-programs/jss-mch-hero.jpg',
        title: 'Improving Maternal & Child Health Outcomes - Calcutta Kids',
        label: 'Case Study',
        link: '/resources/case-studies/calcutta-kids-healthcare'
      },
      {
        type: 'blog',
        image: '/images/case-studies/2024-06-25-digitising-adolescent-community-program-using-avni/ihmp-cover.jpg',
        title: 'Digitising Adolescent Community Program Using Avni',
        label: 'Blog',
        link: '/blog/2024-06-25-digitising-adolescent-community-program-using-avni'
      }
    ],
    cta: {
      icon: '🏥',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Healthcare Specific Use Cases',
      link: '/demo'
    }
  },
  'Water & Sanitation': {
    cards: [
      {
        type: 'case-study',
        image: '/images/case-studies/2022-04-19-field-visit-rejuvenating-water-bodies/land-of-lakes.png',
        title: 'Scaling Water & Sanitation Programs - Arghyam',
        label: 'Case Study',
        link: '/resources/case-studies/arghyam-water-sanitation'
      },
      {
        type: 'blog',
        image: '/images/case-studies/2022-04-19-field-visit-rejuvenating-water-bodies/land-of-lakes.png',
        title: 'Field Visit Report - Rejuvenating Water Bodies at Kolar',
        label: 'Blog',
        link: '/blog/2022-04-19-field-visit-rejuvenating-water-bodies'
      }
    ],
    cta: {
      icon: '💧',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Water & Sanitation Use Cases',
      link: '/demo'
    }
  },
  'Waste Management': {
    cards: [
      {
        type: 'case-study',
        image: '/images/case-studies/2023-01-12-avni-conference-goa/day-4/sewa.jpg',
        title: 'Empowering Waste Pickers Through Tech - Hasiru Dala',
        label: 'Case Study',
        link: '/resources/case-studies/hasiru-dala-impact'
      },
      {
        type: 'case-study',
        image: '/images/case-studies/2025-08-01-empowering-waste-pickers/hasiru-dala-cover.jpg',
        title: 'Scaling Impact for Waste Pickers Using Avni',
        label: 'Case Study',
        link: '/resources/case-studies/empowering-waste-pickers'
      }
    ],
    cta: {
      icon: '♻️',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Waste Management Use Cases',
      link: '/demo'
    }
  },
  'Social Security': {
    cards: [
      {
        type: 'case-study',
        image: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/data_session.jpg',
        title: 'Strengthening Adolescent Health - IHMP',
        label: 'Case Study',
        link: '/resources/case-studies/ihmp-strengthening-adolescent-health'
      },
      {
        type: 'case-study',
        image: '/images/case-studies/2025-05-28-bridging-the-nutrition-gap-apf-odisha/apf-cover.jpg',
        title: 'Bridging the Nutrition Gap - APF Odisha',
        label: 'Case Study',
        link: '/resources/case-studies/bridging-the-nutrition-gap-apf-odisha'
      }
    ],
    cta: {
      icon: '🤝',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Social Security Use Cases',
      link: '/demo'
    }
  },
  'Livelihood': {
    cards: [
      {
        type: 'case-study',
        image: '/images/case-studies/2025-09-03-how-goonj-uses-avni/goonj-cover.jpg',
        title: 'How Goonj Uses Avni To Digitise Data Collection',
        label: 'Case Study',
        link: '/resources/case-studies/how-goonj-uses-avni'
      },
      {
        type: 'case-study',
        image: '/images/case-studies/2024-11-27-Project-Potential-Bihar-Health-Access-Digitisation-Case-study/project-potential-cover.jpg',
        title: 'Empowering Healthcare Access in Bihar - Project Potential',
        label: 'Case Study',
        link: '/resources/case-studies/project-potential-bihar-health-access-digitisation-case-study'
      }
    ],
    cta: {
      icon: '💼',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Livelihood Use Cases',
      link: '/demo'
    }
  },
  'Legal Aid': {
    cards: [
      {
        type: 'case-study',
        image: '/images/steer-programs.png',
        title: 'Digital Case Management for Legal Aid Programs',
        label: 'Case Study',
        link: '/resources/case-studies/digital-healthcare-rural'
      },
      {
        type: 'blog',
        image: '/images/build-trust.png',
        title: 'Case for Generic Open Source Products in Social Sector',
        label: 'Blog',
        link: '/blog/2020-01-28-case-for-generic-open-source-products'
      }
    ],
    cta: {
      icon: '⚖️',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Legal Aid Use Cases',
      link: '/demo'
    }
  },
  'Sports': {
    cards: [
      {
        type: 'case-study',
        image: '/images/case-studies/2025-07-31-scoring-for-equality/maitrayana-cover.jpg',
        title: 'Scoring for Equality - Maitrayana Uses Avni for Sports Impact',
        label: 'Case Study',
        link: '/resources/case-studies/scoring-for-equality'
      },
      {
        type: 'blog',
        image: '/images/simplify-data.png',
        title: 'Community Programs and Digital Transformation',
        label: 'Blog',
        link: '/blog/2019-12-19-community-health-service-programs-and-avni'
      }
    ],
    cta: {
      icon: '⚽',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Sports Program Use Cases',
      link: '/demo'
    }
  }
};
