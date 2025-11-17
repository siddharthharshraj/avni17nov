/**
 * Impact Stories Data
 * Content for different sector impact stories linked to real case studies
 */

export interface ImpactStory {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const sectors = [
  'Education',
  'Healthcare',
  'Water & Sanitation',
  'Waste Management',
  'Social Security',
  'Livelihood',
  'Human Rights',
  'Legal Aid',
  'Sports',
] as const;

export type Sector = (typeof sectors)[number];

export const impactStories: Record<Sector, ImpactStory> = {
  Education: {
    title: 'CLNL - Anganwadis And Schools Building Skills Beyond Classroom',
    description:
      "CLNL works with Anganwadis and schools to nurture children's social, emotional, and cognitive skills. The program focuses on holistic development — helping children learn, grow, and thrive beyond the classroom...",
    image: '/images/education_impactstory.png',
    link: '/resources/case-studies/scaling-rural-education',
  },
  Healthcare: {
    title: 'Improving Maternal & Child Health Outcomes - Calcutta Kids',
    description:
      'Calcutta Kids transformed their maternal and child health programs using Avni, tracking 15,000+ beneficiaries and improving health outcomes in urban slums through digital health records and automated risk stratification.',
    image: '/images/case-studies/6-ways-how-Avni-is-helping-JSS-MCH-Phulwari-programs/JSSCP_supervisor.jpg',
    link: '/resources/case-studies/calcutta-kids-healthcare',
  },
  'Water & Sanitation': {
    title: 'Scaling Water & Sanitation Programs With Real-Time Data - Arghyam',
    description: 'Arghyam leveraged Avni to track water quality, sanitation facilities, and community engagement across multiple states, ensuring sustainable access to clean water through digital monitoring and real-time data collection.',
    image: '/images/case-studies/2022-04-19-field-visit-rejuvenating-water-bodies/land-of-lakes.png',
    link: '/resources/case-studies/arghyam-water-sanitation',
  },
  'Waste Management': {
    title: 'Empowering Waste Pickers Through Digital Tools - Hasiru Dala',
    description: 'Hasiru Dala uses Avni to digitize waste collection routes, track waste-picker welfare, and measure environmental impact, helping waste-pickers earn fair wages while reducing landfill waste.',
    image: '/images/case-studies/2023-01-12-avni-conference-goa/day-4/sewa.jpg',
    link: '/resources/case-studies/empowering-waste-pickers',
  },
  'Social Security': {
    title: 'Strengthening Adolescent Health Programs - IHMP',
    description: 'IHMP implemented Avni to track adolescent health interventions, monitor nutrition programs, and ensure timely follow-ups for vulnerable populations across rural communities.',
    image: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/data_session.jpg',
    link: '/resources/case-studies/ihmp-strengthening-adolescent-health',
  },
  Livelihood: {
    title: 'Scaling Rural Education - Building Lifelong Skills',
    description: 'Scaling rural education initiatives using Avni to track student progress, monitor teacher performance, and improve learning outcomes across remote schools and anganwadis.',
    image: '/images/education_impactstory.png',
    link: '/resources/case-studies/scaling-rural-education',
  },
  'Human Rights': {
    title: 'Empowering Vision Care - Chashma Tech4Dev',
    description: 'Chashma Tech4Dev uses Avni to provide vision screening and eyeglasses to underserved communities, tracking patient records and ensuring follow-up care for better eye health outcomes.',
    image: '/images/case-studies/2023-07-14-avni-sprint-udaipur-day-2/ajeevika-field-visit.jpg',
    link: '/resources/case-studies/empowering-vision-care-chashma-tech4dev',
  },
  'Legal Aid': {
    title: 'Digital Healthcare in Rural India - Transforming Access',
    description: 'Digital healthcare initiatives using Avni to manage patient records, track treatments, and improve healthcare delivery in remote rural areas with limited infrastructure.',
    image: '/images/steer-programs.png',
    link: '/resources/case-studies/digital-healthcare-rural',
  },
  Sports: {
    title: 'Community Health Programs - Strengthening Grassroots Healthcare',
    description: 'Community health programs using Avni to track health interventions, monitor disease prevention, and improve healthcare access in underserved communities.',
    image: '/images/build-trust.png',
    link: '/resources/case-studies',
  },
};
