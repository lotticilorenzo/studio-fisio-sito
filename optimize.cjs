const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public', 'images', 'real');

async function processImages() {
    const files = fs.readdirSync(dir);
    let savedBytes = 0;

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(dir, file);
            const parsed = path.parse(file);
            const outputPath = path.join(dir, `${parsed.name}.webp`);

            const inputStats = fs.statSync(inputPath);

            try {
                await sharp(inputPath)
                    .webp({ quality: 80, effort: 6 })
                    .toFile(outputPath);

                const outputStats = fs.statSync(outputPath);

                if (outputStats.size < inputStats.size) {
                    savedBytes += (inputStats.size - outputStats.size);
                    console.log(`Converted ${file} to .webp. Saved ${((inputStats.size - outputStats.size) / 1024 / 1024).toFixed(2)} MB`);
                    fs.unlinkSync(inputPath); // Delete original
                } else {
                    // If webp is magically larger (unlikely for 2mb photos but good safety net)
                    console.log(`Skipped ${file}, original is smaller.`);
                    fs.unlinkSync(outputPath);
                }
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }

    console.log(`\n==============\nTotal disk space saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB\n==============\n`);
}

processImages();
