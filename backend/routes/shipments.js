var express = require('express');
const crypto = require("crypto");
var router = express.Router();

router.get('/', (req, res) => {
  // Send the products as a response to the client
  res.send(shipments);
});

router.post('/', (req, res) => {
  let shipment = new Shipment(
    req.body.companyName,
    new Date(req.body.scheduledDate),
    ShipmentStatus.CREATED,
    req.body.items
  );
  shipments.push(shipment);
  res.send(shipment);
});

router.put('/:id', (req, res) => {
  const index = shipments.findIndex(shipment => shipment.id === req.params.id);
  if (index !== -1) {
    shipments[index] = {
      id: req.params.id,
      companyName: req.body.companyName,
      scheduledDate: new Date(req.body.scheduledDate),
      items: req.body.items
    };
    res.send(shipments[index]);
  } else {
    res.status(404).send("Shipment not found");
  }
});

router.delete('/:id', (req, res) => {
  const index = shipments.findIndex(shipment => shipment.id === req.params.id);
  if (index !== -1) {
    shipments.splice(index, 1);
    res.send(shipments);
  } else {
    res.status(404).send("Shipment not found");
  }
});

module.exports = router;


const Shipment = function(companyName, scheduledDate, status, items) {
  this.id = crypto.randomBytes(16).toString("hex");
  this.companyName = companyName;
  this.created = new Date();
  this.scheduledDate = scheduledDate;
  this.status = status;
  this.items = items;
}

const ShipmentItem = function(productRef, quantity) {
  this.productRef = productRef;
  this.quantity = quantity;
}

const ShipmentStatus = Object.freeze({
  CREATED: 'CREATED',
  PREPARED: 'PREPARED',
  SHIPPED: 'SHIPPED'
});

const shipments = [
  new Shipment('Beautiful Company', new Date(), ShipmentStatus.CREATED, [
    new ShipmentItem(1, 5),
    new ShipmentItem(2, 1),
  ]),
  new Shipment('Interesting CO', new Date(), ShipmentStatus.PREPARED, [
    new ShipmentItem(2, 2),
    new ShipmentItem(3, 2),
  ]),
];


