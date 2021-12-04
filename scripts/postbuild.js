const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../public/build/bundle.js');
var file = fs.readFileSync(filePath);
fs.writeFileSync(
    filePath,
    file.toString().replace('VERSION_NUMBER', new Date().toString())
);