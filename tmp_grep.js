const fs = require('fs');

const data = fs.readFileSync('C:\\Users\\leifs\\.gemini\\antigravity\\brain\\4ab9b173-ea73-4fc7-a07f-0255259596a7\\.system_generated\\logs\\overview.txt', 'utf8');

const regex = /const SERVICES_DATA[\s\S]{0,4000}/g;
const matches = [...data.matchAll(regex)];

if (matches.length > 0) {
    // Print the last 3 occurrences in case some are chopped
    for (let i = Math.max(0, matches.length - 3); i < matches.length; i++) {
        console.log('====== MATCH', i, '======');
        console.log(matches[i][0].substring(0, 3000));
    }
} else {
    console.log("Not found.");
}
