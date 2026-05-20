/**
 * ONE-TIME USE SCRIPT — do not re-run.
 * Updates all source files to replace manuscdn.com <img> tags with
 * <picture> elements using local optimized WebP srcset.
 * Also updates local team/narrator image references.
 *
 * Usage: node scripts/update-image-refs.mjs
 */

import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Load the mapping file
const mapping = JSON.parse(await readFile(join(__dirname, 'image-mapping.json'), 'utf8'));

// Build a lookup: original URL → { 400, 800, 1600 } web paths
const urlToSizes = {};
for (const [key, val] of Object.entries(mapping)) {
  if (!val.error && val.sizes) {
    urlToSizes[key] = val.sizes;
  }
}

// Files to process
const FILES = [
  'client/src/pages/FAQs.tsx',
  'client/src/components/UserChallengesCarousel.tsx',
  'client/src/pages/Features.tsx',
  'client/src/components/BenefitsCarousel.tsx',
  'client/src/pages/Home.tsx',
  'client/src/components/HowItWorksHero.tsx',
  'client/src/pages/Team.tsx',
  'client/src/pages/Pricing.tsx',
  'client/src/pages/OralHealthHub.tsx',
  'client/src/pages/InstantScan.tsx',
  'client/src/pages/Employers.tsx',
];

// Local image mapping: old path → new optimized id
const LOCAL_MAP = {
  '/images/team/kashif_mueen.png':     'team-kashif_mueen',
  '/images/team/peter_fuentes.png':    'team-peter_fuentes',
  '/images/team/qasim_mueen.png':      'team-qasim_mueen',
  '/images/team/saba_ahmed.png':       'team-saba_ahmed',
  '/images/team/tyrette_hamilton.png': 'team-tyrette_hamilton',
  '/images/narrator-thumbnail.png':    'narrator-thumbnail',
};

// Build local sizes lookup from mapping
const localSizes = {};
for (const [localPath, id] of Object.entries(LOCAL_MAP)) {
  const key = `local:${localPath.replace('/images/', '').replace('.png', '')}`;
  if (mapping[key] && mapping[key].sizes) {
    localSizes[localPath] = { id, sizes: mapping[key].sizes };
  }
}

/**
 * Replace a single <img ...src="URL"...> occurrence with a <picture> element.
 * Preserves all existing attributes (alt, className, loading, fetchPriority, etc.)
 * Wraps in <picture> with srcset for 400w/800w/1600w.
 */
function buildPicture(sizes, existingAttrs, isHero = false) {
  const s400 = sizes[400];
  const s800 = sizes[800];
  const s1600 = sizes[1600];

  // Build the img attributes string, removing src (we'll set it to 800w default)
  // and ensuring loading/fetchPriority are correct
  let attrs = existingAttrs
    .replace(/\s*src\s*=\s*(?:"[^"]*"|'[^']*')/g, '')
    .replace(/\s*loading\s*=\s*(?:"[^"]*"|'[^']*')/g, '')
    .replace(/\s*fetchPriority\s*=\s*(?:"[^"]*"|'[^']*')/g, '')
    .replace(/\s*fetchpriority\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
    .trim();

  const loadingAttr = isHero ? 'loading="eager"' : 'loading="lazy"';
  const fetchPriorityAttr = isHero ? '\n                      fetchPriority="high"' : '';

  return `<picture>
                    <source
                      type="image/webp"
                      srcSet="${s400} 400w, ${s800} 800w, ${s1600} 1600w"
                      sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
                    />
                    <img
                      src="${s800}"
                      ${attrs}
                      ${loadingAttr}${fetchPriorityAttr}
                    />
                  </picture>`;
}

/**
 * For simple string-based image arrays (like UserChallengesCarousel, FAQs),
 * just replace the URL string with the 800w WebP path.
 * These are used as src= in dynamic <img> tags, not as static JSX.
 */
function replaceUrlInStringContext(content, oldUrl, sizes) {
  // Replace bare string URL references (in object literals, arrays, etc.)
  return content.split(oldUrl).join(sizes[800]);
}

async function processFile(relPath) {
  const filePath = join(ROOT, relPath);
  let content = await readFile(filePath, 'utf8');
  const original = content;

  // Determine if this file uses images in JSX <img> tags or in string arrays
  // Files with string arrays: UserChallengesCarousel.tsx, FAQs.tsx
  const isStringArray = relPath.includes('UserChallengesCarousel') || relPath.includes('FAQs');

  if (isStringArray) {
    // Simple URL replacement in string context — these use dynamic src={imageMap[n]}
    for (const [url, sizes] of Object.entries(urlToSizes)) {
      if (content.includes(url)) {
        content = replaceUrlInStringContext(content, url, sizes);
      }
    }
  } else {
    // JSX <img> tag replacement with <picture> element
    // Match <img ... src="URL" ... /> patterns (multiline)
    for (const [url, sizes] of Object.entries(urlToSizes)) {
      if (!content.includes(url)) continue;

      // Match the full <img ... /> block containing this URL
      // We use a regex that captures the full self-closing img tag
      const imgRegex = /<img\b([^>]*?)\/>/gs;
      content = content.replace(imgRegex, (match, attrs) => {
        if (!attrs.includes(url)) return match;

        // Determine if this is the hero/LCP image
        const isHero = attrs.includes('fetchPriority') || attrs.includes('fetchpriority') ||
                       (attrs.includes('loading="eager"') || attrs.includes("loading='eager'"));

        return buildPicture(sizes, attrs, isHero);
      });
    }

    // Handle local image replacements
    for (const [localPath, { id, sizes }] of Object.entries(localSizes)) {
      if (!content.includes(localPath)) continue;

      const imgRegex = /<img\b([^>]*?)\/>/gs;
      content = content.replace(imgRegex, (match, attrs) => {
        if (!attrs.includes(localPath)) return match;
        const isHero = attrs.includes('fetchPriority') || attrs.includes('loading="eager"');
        return buildPicture(sizes, attrs, isHero);
      });
    }
  }

  if (content !== original) {
    await writeFile(filePath, content, 'utf8');
    const changed = (content.match(/manuscdn/g) || []).length;
    const remaining = (original.match(/manuscdn/g) || []).length;
    console.log(`  ✓ ${relPath} (${remaining - changed} refs replaced, ${changed} remaining)`);
  } else {
    console.log(`  - ${relPath} (no changes)`);
  }
}

console.log('Updating source files...');
for (const f of FILES) {
  await processFile(f);
}

// Final check: any remaining manuscdn refs?
console.log('\nChecking for remaining manuscdn references...');
for (const f of FILES) {
  const content = await readFile(join(ROOT, f), 'utf8');
  const count = (content.match(/manuscdn/g) || []).length;
  if (count > 0) console.log(`  ⚠ ${f}: ${count} remaining`);
}
console.log('Done.');
