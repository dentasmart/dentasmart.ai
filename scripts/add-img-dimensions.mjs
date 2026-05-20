/**
 * One-time script: add width/height attributes to <img> tags inside <picture> elements
 * in JSX source files. Uses the natural dimensions of the 1600w (or 800w) WebP variant.
 * Does NOT touch string-array carousels (BenefitsCarousel, UserChallengesCarousel, Features data).
 */

import { readFileSync, writeFileSync } from 'fs';

// Map: image ID → [width, height] at natural (1600w) size
const dims = {
  'GXvgxLOgMTanohTM': [1600, 893],
  'JQpBfeUURrCKTqFU': [738, 1600],
  'MVOEXBpESLROdzsK': [1536, 2752],
  'QUJzfPwTjdiBdwFs': [1600, 893],
  'XlgHEMbZpBAbEXnM': [945, 2048],
  'aCeHxvEyoAWpKkct': [1600, 893],
  'dOrOUbRuSUXPRulY': [1600, 893],
  'kQkbFcHfULXNLoOD': [738, 1600],
  'lBzNqmERojJqlfJE': [738, 1600],
  'narrator-thumbnail': [1012, 589],
  'oaONyntFCCtQKvAL': [1600, 893],
  'team-kashif_mueen': [200, 200],
  'team-peter_fuentes': [200, 200],
  'team-qasim_mueen': [200, 200],
  'team-saba_ahmed': [744, 877],
  'team-tyrette_hamilton': [200, 200],
};

const files = [
  'client/src/pages/Home.tsx',
  'client/src/components/HowItWorksHero.tsx',
  'client/src/pages/Team.tsx',
  'client/src/pages/Pricing.tsx',
  'client/src/pages/OralHealthHub.tsx',
  'client/src/pages/InstantScan.tsx',
  'client/src/pages/Employers.tsx',
];

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  let changed = 0;

  for (const [id, [w, h]] of Object.entries(dims)) {
    // Match <img ... src="/images/optimized/ID-800.webp" ... > blocks that don't already have width=
    // We look for the src attribute and then check if width= is already present on the same img tag
    const imgRegex = new RegExp(
      `(<img\\b(?![^>]*\\bwidth=)[^>]*src="/images/optimized/${id}-800\\.webp"[^>]*?)(\\/?>)`,
      'gs'
    );
    const newContent = content.replace(imgRegex, (match, before, close) => {
      changed++;
      return `${before}\n                      width="${w}" height="${h}"${close}`;
    });
    content = newContent;
  }

  if (changed > 0) {
    writeFileSync(file, content, 'utf8');
    console.log(`  ✓ ${file} (${changed} img tags updated)`);
  } else {
    console.log(`  - ${file} (no changes)`);
  }
}

console.log('Done.');
