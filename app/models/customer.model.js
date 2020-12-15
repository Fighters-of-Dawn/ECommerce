const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  this.username = customer.username;
  this.email = customer.email;
  this.password = customer.password;
};

Customer.create = (newCustomer, result) => {
  sql.query(
    "INSERT INTO customers SET custID = createCustID (?,?), username = ?, email = ?, password = ?", 
    [newCustomer.username, newCustomer.email, newCustomer.username, newCustomer.email, newCustomer.password], 
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { ...newCustomer });
    result(null, { ...newCustomer });
  });
};

Customer.findByUsername = (username, result) => {
  sql.query(`SELECT * FROM customers WHERE username = '${username}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateByUsername = (username, customer, result) => {
  sql.query(
    "UPDATE customers SET username = ?, email = ?, password = ? WHERE username = ?",
    [customer.username, customer.email, customer.password, username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { ...customer });
      result(null, {...customer });
    }
  );
};

Customer.remove = (username, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", username, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", username);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;