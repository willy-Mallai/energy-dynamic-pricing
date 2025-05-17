const fs = require('fs');
const path = require('path');

function addOrderToFile(order, filename) {
  const filePath = path.join(__dirname, '..', 'src', 'data', filename);
  const fileContent = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    : [];

  fileContent.push(order);
  fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
}

module.exports = { addOrderToFile };
