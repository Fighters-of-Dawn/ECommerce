const Order = require("../models/order.model.js");

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

const order = new Order({
    orderID: req.body.orderID,
    userID: req.body.userID,
    address: req.body.address,
    totalItem: req.body.totalItem,
    totalPrice: req.body.totalPrice,
    delievered: req.body.delievered
  });

Order.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    else res.send(data);
  });

};