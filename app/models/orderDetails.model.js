const sql = require("./db.js");

// constructor
const OrderDetails = function(orderDetails) {
  this.orderID = orderDetails.orderID;
  this.productID = orderDetails.productID;
};

OrderDetails.create = (newOrderDetails, result) => {
  sql.query(
    "CALL insertOrderDetails(?, ?)", 
    [newOrderDetails.orderID, newOrderDetails.productID], 
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order: ", { ...newOrderDetails });
    result(null, { ...newOrderDetails });
  });
};

module.exports = OrderDetails;