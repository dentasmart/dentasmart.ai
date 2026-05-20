/**
 * ONE-TIME USE SCRIPT — do not re-run.
 * This script was run once to migrate all images from files.manuscdn.com
 * to locally-served optimized WebP files in client/public/images/optimized/.
 *
 * Usage (if ever needed again): node scripts/migrate-images.mjs
 *
 * What it does:
 *  1. Downloads all 49 remote images from files.manuscdn.com
 *  2. Converts each to WebP at 3 responsive sizes: 400w, 800w, 1600w (80% quality)
 *  3. Saves to client/public/images/optimized/
 *  4. Writes scripts/image-mapping.json with old URL → new local paths
 */

import sharp from '../node_modules/sharp/lib/index.js';
import { mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'client/public/images/optimized');
const MAPPING_FILE = join(__dirname, 'image-mapping.json');

const SIZES = [400, 800, 1600];
const QUALITY = 80;

// ── Remote images — exact list extracted from source code ─────────────────────
const REMOTE_IMAGES = [
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/AfieCruvYKKqBoIa.png',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/BkdckSOLLUMzPWAC.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/ChlTSVZDNZEOfine.png',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/DGwZUVQlOgLZAvil.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/DawnQOxKtdjguhLp.jpeg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/EOTithFPkyVmOBis.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/FQmXcgOOtzipJgcp.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/FpadAgriSErcKtgI.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/GXvgxLOgMTanohTM.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/GqjyClSdowSQrUkA.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/JQpBfeUURrCKTqFU.png',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/MVOEXBpESLROdzsK.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/MonqdoKhyFBpISXD.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/MvlpeGIipAfhvGbU.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/OmKqTEPOiEaBSwig.png',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/PriyWZEyjWTnjbVz.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/QCxaOOzMPDUukYbC.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/QUJzfPwTjdiBdwFs.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/QmtzzNkXnZNbJvtj.png',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/WsZHNLHpfJioFYxr.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/XZusOpUDOktZBHbT.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/XlgHEMbZpBAbEXnM.jpeg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/YSjOjqlpUabDbzAW.png',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/ZDzeChpbpgMeHJVN.png',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/ZTdIbrjtUSmXULHA.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/ZwswpLjHnfyByaVR.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/aCHSoYIkHQxoISFY.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/aCeHxvEyoAWpKkct.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/anhNbpYEsjYAENrG.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/bcRFjqplGSaXwUpZ.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/dOrOUbRuSUXPRulY.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/dXXgcWAdPttMxeda.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/eugbQZohrtgtbTJx.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/gGapYAFZQmpdrPCF.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/jXdMmoTEdbWUcSpb.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/kQkbFcHfULXNLoOD.png',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/kqbtmhnnWjXBFwxN.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/lBzNqmERojJqlfJE.jpeg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/llLRbXoCzeyMeAfn.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/nlpGZGfIENeWYTMQ.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/oaONyntFCCtQKvAL.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/oqHjapRifpwhrZqg.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/ortFUKlUXMHBiXYm.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/qOeGvQuJnUqtvRvT.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/qohnbjBwaOkXXhcC.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/qxBXHmKeIMzYHljf.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/vMkUwiRFfsZCpBey.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/vWIVfyPBobntLGIz.jpg',
  'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/zazpdkPwKVVuwMrq.jpg',
];

// ── Local images to also optimize ─────────────────────────────────────────────
const LOCAL_IMAGES = [
  { src: join(ROOT, 'client/public/images/team/kashif_mueen.png'),      key: 'local:team/kashif_mueen' },
  { src: join(ROOT, 'client/public/images/team/peter_fuentes.png'),     key: 'local:team/peter_fuentes' },
  { src: join(ROOT, 'client/public/images/team/qasim_mueen.png'),       key: 'local:team/qasim_mueen' },
  { src: join(ROOT, 'client/public/images/team/saba_ahmed.png'),        key: 'local:team/saba_ahmed' },
  { src: join(ROOT, 'client/public/images/team/tyrette_hamilton.png'),  key: 'local:team/tyrette_hamilton' },
  { src: join(ROOT, 'client/public/images/narrator-thumbnail.png'),     key: 'local:narrator-thumbnail' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function extractId(url) {
  const parts = url.split('/');
  return parts[parts.length - 1].replace(/\.[^.]+$/, '');
}

async function processImage(buffer, id) {
  const results = {};
  for (const w of SIZES) {
    const filename = `${id}-${w}.webp`;
    const outPath = join(OUTPUT_DIR, filename);
    const webPath = `/images/optimized/${filename}`;
    await sharp(buffer)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);
    results[w] = webPath;
  }
  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const mapping = {};

  console.log(`Processing ${REMOTE_IMAGES.length} remote + ${LOCAL_IMAGES.length} local images...`);

  // Remote images
  for (const url of REMOTE_IMAGES) {
    const id = extractId(url);
    process.stdout.write(`  [remote] ${id} ... `);
    try {
      const buf = await fetchBuffer(url);
      const sizes = await processImage(buf, id);
      mapping[url] = { id, sizes };
      console.log(`✓ (${Math.round(buf.length / 1024)}KB → 3 WebP sizes)`);
    } catch (e) {
      console.log(`✗ ERROR: ${e.message}`);
      mapping[url] = { id, error: e.message };
    }
  }

  // Local images
  for (const { src, key } of LOCAL_IMAGES) {
    const id = key.replace('local:', '').replace('/', '-');
    process.stdout.write(`  [local]  ${id} ... `);
    try {
      const buf = await readFile(src);
      const sizes = await processImage(buf, id);
      mapping[key] = { id, originalPath: src.replace(ROOT, ''), sizes };
      console.log(`✓ (${Math.round(buf.length / 1024)}KB → 3 WebP sizes)`);
    } catch (e) {
      console.log(`✗ ERROR: ${e.message}`);
      mapping[key] = { id, error: e.message };
    }
  }

  await writeFile(MAPPING_FILE, JSON.stringify(mapping, null, 2));
  console.log(`\nDone! Mapping written to scripts/image-mapping.json`);
  console.log(`Output directory: client/public/images/optimized/`);
}

main().catch(console.error);
