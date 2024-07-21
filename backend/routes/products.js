var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  // Send the products as a response to the client
  res.send(products);
});

module.exports = router;


const Product = function(id, imageUrl, name, description, unitPrice, quantity) {
  this.id = id;
  this.imageUrl = imageUrl;
  this.name = name;
  this.description = description;
  this.unitPrice = unitPrice;
  this.quantity = quantity;
}

const products = [
  new Product(1, 'https://image.alza.cz/products/PA231i9d3/PA231i9d3.jpg', 'Printer EPSON DJ456', 'This is a printer for every occasion, heavy duty...', 9.99, 10),
  new Product(2, 'https://image.alza.cz/products/SaGWu1/SaGWu1.jpg', 'Samsung Smart Watch GH54', 'Smart Watch Samsung', 19.99, 20),
  new Product(3, 'https://image.alza.cz/products/AGDTGB0003/AGDTGB0003.jpg','Product 3', 'This is product 3', 29.99, 30),
];
