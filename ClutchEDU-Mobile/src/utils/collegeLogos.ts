// src/utils/collegeLogos.ts

/**
 * Turn “Lesley University” → “lesley_university”
 */
export function sanitize(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

// import each file *statically* so Metro can bundle them
export const collegeLogos: Record<string, any> = {
  [sanitize('Lesley University')]: require('../../assets/images/logos/lesley_university.png'),
  [sanitize('Fisher College')]:  require('../../assets/images/logos/fisher_college.png'),
  [sanitize('Clark University')]: require('../../assets/images/logos/clark_university.png'),
  // …and so on for every logo you have in assets/images/logos/
};

export const defaultLogo = require('../../assets/images/logos/default.png');
