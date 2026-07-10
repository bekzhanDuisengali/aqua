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
  console.log(`[build:scss] ${path.basename(outputFile)} updated`);
}

try {
  build();
} catch (error) {
  console.error('[build:scss] Failed to compile SCSS');
  console.error(error.toString());
  process.exit(1);
}
