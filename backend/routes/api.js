const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const addOrderToFile = (order, filename) => {
  const filePath = path.join(__dirname, '..', '..', 'src', 'data', filename);
  const fileData = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
    : [];

  fileData.push(order);
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
};

// POST /api/addOrder
router.post('/addOrder', (req, res) => {
  const order = req.body;
  if (!order) return res.status(400).send("No order provided.");

  addOrderToFile(order, 'orders.json');
  addOrderToFile(order, 'orderHistory.json');
  res.send({ success: true });
});

module.exports = router;
