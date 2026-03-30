const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('d:/builder/client/src');

files.forEach(jsxPath => {
    let content = fs.readFileSync(jsxPath, 'utf8');
    
    // Skip if it doesn't look like sizes exist
    if (!content.includes('size={')) return;
    
    // Find all size={X}
    const regex = /size=\{([0-9]+)\}/g;
    let match;
    const sizes = new Set();
    
    while ((match = regex.exec(content)) !== null) {
        sizes.add(match[1]);
    }
    
    if (sizes.size > 0) {
        let styleMatch = content.match(/from\s+["'](\.[^"']+\.styles)["']/);
        let stylesPath = null;
        let styleModuleString = null;

        if (styleMatch) {
            styleModuleString = styleMatch[1];
            stylesPath = path.resolve(path.dirname(jsxPath), styleModuleString + '.js');
        } else {
            const potentialStylePath = jsxPath.replace('.jsx', '.styles.js');
            if (fs.existsSync(potentialStylePath)) {
                stylesPath = potentialStylePath;
                styleModuleString = "./" + path.basename(stylesPath).replace('.js', '');
            }
        }
        
        if (!stylesPath || !fs.existsSync(stylesPath)) {
            console.log("No styles file found for", jsxPath);
            return;
        }

        sizes.forEach(size => {
            const constName = `ICON_SIZE_${size}`;
            
            // Replace in JSX
            const sizeRegex = new RegExp(`size=\\{${size}\\}`, 'g');
            content = content.replace(sizeRegex, `size={${constName}}`);
            
            // Update import block
            if (styleMatch) {
                // Escape any regex characters in styleMatch[1] just in case
                const escapedStyleStr = styleMatch[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const importBlockRegex = new RegExp(`import\\s*\\{([\\s\\S]*?)\\}\\s*from\\s*["']${escapedStyleStr}["']`);
                content = content.replace(importBlockRegex, function(fullMatch, inner) {
                    if (!inner.includes(constName)) {
                        let cleaned = inner.trim();
                        if (cleaned.endsWith(',')) cleaned = cleaned.slice(0, -1);
                        // Handle empty imports case
                        if (cleaned.length === 0) return `import { ${constName} } from "${styleMatch[1]}"`;
                        return `import {\n    ${cleaned},\n    ${constName}\n} from "${styleMatch[1]}"`;
                    }
                    return fullMatch;
                });
            } else if (!content.includes(constName)) {
                // If no style import block existed but file exists, add it at the top 
                content = `import { ${constName} } from "${styleModuleString}";\n` + content;
                styleMatch = [null, styleModuleString];
            }
            
            // Append to styles file
            let stylesContent = fs.readFileSync(stylesPath, 'utf8');
            if (!stylesContent.includes(`export const ${constName} =`)) {
                stylesContent += `\nexport const ${constName} = ${size};\n`;
                fs.writeFileSync(stylesPath, stylesContent);
            }
        });
        
        fs.writeFileSync(jsxPath, content);
        console.log("Updated", jsxPath);
    }
});
console.log("Done refactoring icons");
