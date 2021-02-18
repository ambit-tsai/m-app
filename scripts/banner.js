const fs = require('fs');
const path = require('path');


const filePath = path.resolve(__dirname, '../package.json');
const fileStr = fs.readFileSync(filePath, 'utf8');
const config = JSON.parse(fileStr);


module.exports = `
/**
 * ${config.name}
 * ${config.description}
 * @version ${config.version}
 * @author ${config.author}
 * @license ${config.license}
 * @see {@link ${config.homepage}}
 */`;