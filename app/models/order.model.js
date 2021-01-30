const sql = require("./db.js");

// constructor
const Order = function(order) {
  this.orderID = order.orderID;
  this.userID = order.userID;
  this.address = order.address;
  this.totalItem =  order.totalItem;
  this.totalPrice = order.totalPrice;
  this.delievered = order.delievered;
};

Order.create = (newOrder, result) => {
  sql.query(
    "INSERT INTO orders SET orderID = ?, userID = ?, address = ?, totalItem = ?, totalPrice = ?, delievered = ?", 
    [newOrder.orderID, newOrder.userID, newOrder.address, newOrder.totalItem, newOrder.totalPrice, newOrder.delievered], 
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order: ", { ...newOrder });
    result(null, { ...newOrder });
  });
};

module.exports = Order;