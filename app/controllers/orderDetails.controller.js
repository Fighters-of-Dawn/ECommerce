const OrderDetails = require("../models/orderDetails.model.js");

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const orderDetails = new OrderDetails({
    orderID: req.body.orderID,
    productID: req.body.productID
  });

  OrderDetails.create(orderDetails, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    else res.send(data);
  });
};