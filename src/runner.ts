const day = process.argv[2] || 'day0';
const dayPath = `${__dirname}/${day}/index.ts`;

import(dayPath)
    .catch(error => {
        console.error(`Failed to load day: ${day}:`, error.message);
        process.exit(1);
    });
