/**
 * ============================================
 * AVNI TEAM DATA
 * ============================================
 * 
 * HOW TO ADD A NEW TEAM MEMBER:
 * 1. Add their photo to: /public/images/team/firstname.jpeg
 * 2. Add their info to the appropriate array below (founders or team)
 * 3. Keep the array sorted alphabetically by first name
 * 
 * HOW TO REMOVE A TEAM MEMBER:
 * 1. Simply delete their entry from the array below
 * 2. Optionally remove their photo from /public/images/team/
 * 
 * IMPORTANT:
 * - Founders should ONLY be in the 'founders' array
 * - Team members should ONLY be in the 'team' array (no duplicates)
 * - Keep arrays sorted alphabetically for easy maintenance
 * 
 * Source: avni-new-design-main/app/team/page.tsx
 */

export interface TeamMember {
  name: string;           // Full name as it should appear on the website
  image: string;          // Path to photo: /images/team/filename.jpeg
  linkedin: string;       // Full LinkedIn URL: https://www.linkedin.com/in/username/
  role?: string;          // Optional: Job title (not currently displayed)
}

/**
 * ============================================
 * FOUNDERS (4 members)
 * ============================================
 * These appear in the "Our Founders" section
 * Order: As listed below (not alphabetical)
 */
export const founders: TeamMember[] = [
  {
    name: 'Arjun Khandelwal',
    image: '/images/team/arjun.jpeg',
    linkedin: 'https://www.linkedin.com/in/arjun-khandelwal-41614b8/',
  },
  {
    name: 'Pradipta Kundu',
    image: '/images/team/pradipta_k.jpeg',
    linkedin: 'https://www.linkedin.com/in/pradiptakundu/',
  },
  {
    name: 'Vivek Singh',
    image: '/images/team/vivek.jpeg',
    linkedin: 'https://www.linkedin.com/in/vivek-singh-4535a61/',
  },
  {
    name: 'Vinay Venu',
    image: '/images/team/vinay.jpeg',
    linkedin: 'https://www.linkedin.com/in/ijkvinay/',
  },
];

/**
 * ============================================
 * TEAM MEMBERS (15 members)
 * ============================================
 * These appear in the "Our Team Today" section
 * Order: ALPHABETICAL by first name (A-Z)
 * 
 * ⚠️ DO NOT include founders here - they have their own section above
 * 
 * TEMPLATE for adding new member:
 * {
 *   name: 'Full Name',
 *   image: '/images/team/firstname.jpeg',
 *   linkedin: 'https://www.linkedin.com/in/username/',
 * },
 */
export const team: TeamMember[] = [
  {
    name: 'A Ashok kumar',
    image: '/images/team/ashok.png',
    linkedin: 'https://www.linkedin.com/in/a-ashok-kumar/',
  },
  {
    name: 'Achala Belokar',
    image: '/images/team/achala_b.jpeg',
    linkedin: 'https://www.linkedin.com/in/achala-belokar-212520108/',
  },
  {
    name: 'ADAM SANADI',
    image: '/images/team/adam.jpeg',
    linkedin: 'https://www.linkedin.com/in/adamsanadi6/',
  },
  {
    name: 'Anjali Bhagabati',
    image: '/images/team/anjali.png',
    linkedin: 'https://www.linkedin.com/in/anjali-bhagabati-68791049/',
  },
  {
    name: 'Dinesh G',
    image: '/images/team/dinesh_g.png',
    linkedin: 'https://www.linkedin.com/in/dinesh-g-293198315/',
  },
  {
    name: 'Himesh R',
    image: '/images/team/himesh.jpeg',
    linkedin: 'https://www.linkedin.com/in/himeshr/',
  },
  {
    name: 'Joy A',
    image: '/images/team/joy_a.jpeg',
    linkedin: 'https://www.linkedin.com/in/joy-a-8a42b715b/',
  },
  {
    name: 'Maha Lakshme',
    image: '/images/team/maha.jpeg',
    linkedin: 'https://www.linkedin.com/in/maha-lakshme-89bab383/',
  },
  {
    name: 'Mohammed Taqi',
    image: '/images/team/taqi.jpeg',
    linkedin: 'https://www.linkedin.com/in/mohammed-taqi-69b6b221b/',
  },
  {
    name: 'Noopur Varma',
    image: '/images/team/noopur_V.jpeg',
    linkedin: 'https://www.linkedin.com/in/noopurvarma/',
  },
  {
    name: 'Nupoor Khandelwal',
    image: '/images/team/nupoor_k.jpeg',
    linkedin: 'https://www.linkedin.com/in/nupoor-khandelwal-26aa9b1b/',
  },
  {
    name: 'Om Bhardwaj',
    image: '/images/team/om.png',
    linkedin: 'https://www.linkedin.com/in/ombhardwaj/',
  },
  {
    name: 'Pooja Harmalkar',
    image: '/images/team/pooja.png',
    linkedin: 'https://www.linkedin.com/in/pooja-harmalkar-60ba3698/',
  },
  {
    name: 'Siddharth Harsh Raj',
    image: '/images/team/siddharth.png',
    linkedin: 'https://www.linkedin.com/in/siddharthharshraj/',
  },
  {
    name: 'Subhamita Kanungo',
    image: '/images/team/Subhamita_k.png',
    linkedin: 'https://www.linkedin.com/in/subhamitakanungo/',
  },
];
