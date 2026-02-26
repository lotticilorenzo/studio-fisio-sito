const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));

let changed = 0;
files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        let content = fs.readFileSync(file, 'utf8');

        // Match string patterns like /images/real/filename.jpg
        let newContent = content.replace(/\/images\/real\/([^"'}?]+)\.(jpg|jpeg|png)/gi, '/images/real/$1.webp');

        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log('Updated image references in:', path.basename(file));
            changed++;
        }
    }
});
console.log('\nTotal React files updated with .webp references:', changed);
