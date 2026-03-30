const fs = require('fs');

const jsxPath = 'd:/builder/client/src/pages/Dashboard/BillingPage.jsx';
const stylesPath = 'd:/builder/client/src/pages/Dashboard/BillingPage.styles.js';

let content = fs.readFileSync(jsxPath, 'utf8');

const startIdx = content.indexOf('const fadeUp');
const endIdx = content.indexOf('const PLANS =');

const styledChunk = content.slice(startIdx, endIdx);

// Add export to all const
const exportedChunk = styledChunk.replace(/^const /gm, 'export const ');

const importNames = [];
const constMatches = styledChunk.match(/^const ([a-zA-Z0-9_]+)/gm);
if (constMatches) {
    constMatches.forEach(m => {
        importNames.push(m.replace('const ', ''));
    });
}

const stylesContent = `import styled, { keyframes } from "styled-components";\n\n${exportedChunk}`;

fs.writeFileSync(stylesPath, stylesContent);

const newJsxContent = content.slice(0, content.indexOf('import styled')) + 
               content.slice(content.indexOf('import { Check'), startIdx) +
               `import { ${importNames.join(', ')} } from "./BillingPage.styles";\n\n` +
               content.slice(endIdx);

fs.writeFileSync(jsxPath, newJsxContent);
console.log("Refactoring complete");
