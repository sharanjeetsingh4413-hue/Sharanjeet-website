/* =============================================================
   build.js — injects shared partials into every page

   The nav and footer used to be copy-pasted into eight files, so every
   nav change was an eight-file edit and the footers had drifted apart.
   They now live in partials/header.html and partials/footer.html.

   USAGE
     node build.js          inject partials into every page
     node build.js --check  exit 1 if any page is out of date (no writes)

   Each page carries a pair of markers. Everything between them is
   replaced with the partial's contents, so the built page is also the
   source file — no separate src/ tree, no generated directory:

     <!-- @include header -->
     ...whatever is here gets overwritten...
     <!-- @end header -->

   IMPORTANT — deployment: the generated HTML is committed to the repo.
   Both GitHub Pages (.github/workflows/deploy-gh-pages.yml publishes the
   repo root as-is) and Vercel serve these files directly, with no build
   step configured on either side. Do not add a build command there.
   Run this script locally after editing a partial and commit the result.
   `node build.js --check` will tell you if you forgot.

   No dependencies, no package.json — deliberately. Adding a package.json
   with a build script would make Vercel try to run a build and change
   how the project deploys.
   ============================================================= */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PARTIALS = {
  header: path.join(ROOT, 'partials', 'header.html'),
  footer: path.join(ROOT, 'partials', 'footer.html'),
};

const checkOnly = process.argv.includes('--check');

const read = (file) => fs.readFileSync(file, 'utf8');

// Pages live in the repo root. Anything under partials/ or r/ is left alone —
// the /r/ lead magnets are standalone landing pages with their own layout.
const pages = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith('.html'))
  .sort();

const partialContent = {};
for (const [name, file] of Object.entries(PARTIALS)) {
  if (!fs.existsSync(file)) {
    console.error(`Missing partial: ${path.relative(ROOT, file)}`);
    process.exit(1);
  }
  partialContent[name] = read(file).trim();
}

const markerRe = (name) =>
  new RegExp(
    `([ \\t]*)<!--\\s*@include ${name}\\s*-->[\\s\\S]*?<!--\\s*@end ${name}\\s*-->`,
    'g'
  );

let changed = [];
let missingMarkers = [];

for (const page of pages) {
  const file = path.join(ROOT, page);
  const original = read(file);
  let output = original;

  for (const name of Object.keys(PARTIALS)) {
    const re = markerRe(name);
    if (!re.test(output)) {
      missingMarkers.push(`${page} → @include ${name}`);
      continue;
    }
    re.lastIndex = 0;
    output = output.replace(re, (_match, indent) => {
      // Re-indent the partial to sit where the marker sits.
      const body = partialContent[name].split('\n').join('\n' + indent);
      return `${indent}<!-- @include ${name} -->\n${indent}${body}\n${indent}<!-- @end ${name} -->`;
    });
  }

  if (output !== original) {
    changed.push(page);
    if (!checkOnly) fs.writeFileSync(file, output);
  }
}

if (missingMarkers.length) {
  console.warn('Pages without include markers (skipped):');
  missingMarkers.forEach((m) => console.warn('  ' + m));
}

if (checkOnly) {
  if (changed.length) {
    console.error('Out of date — run `node build.js` and commit:');
    changed.forEach((p) => console.error('  ' + p));
    process.exit(1);
  }
  console.log(`All ${pages.length} pages are up to date.`);
} else {
  console.log(
    changed.length
      ? `Updated ${changed.length} page(s): ${changed.join(', ')}`
      : `No changes — all ${pages.length} pages already up to date.`
  );
}
