const fs = require('fs');
const path = require('path');
const sass = require('sass');
const inputFile = path.resolve(__dirname, '../assets/scss/styles.scss');
const outputFile = path.resolve(__dirname, '../assets/css/styles.css');

function build() {
  const result = sass.compile(inputFile, {
    style: 'expanded',
    sourceMap: false,
  });

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, result.css);
  console.log(`[watch:scss] ${path.basename(outputFile)} updated at ${new Date().toLocaleTimeString()}`);
}

try {
  build();
} catch (error) {
  console.error('[watch:scss] Initial compile failed');
  console.error(error.toString());
}

fs.watchFile(inputFile, { interval: 300 }, (current, previous) => {
  if (current.mtimeMs === previous.mtimeMs) return;

  try {
    build();
  } catch (error) {
    console.error(`[watch:scss] Failed after change in ${inputFile}`);
    console.error(error.toString());
  }
});

console.log('[watch:scss] Watching assets/scss for changes...');
