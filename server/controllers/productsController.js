const Product = require("../models/product");

module.exports = {
  readProducts: (req, res) => {
    Product.find({}).exec((err, products) => {
      if (err) console.log("get Product Mongoose Error ---------------", err);
      console.log("products-----", products);
      res.status(200).json({ products });
    });
  },

  readProduct: (req, res) => {
    const { id } = req.params;
    Product.findById(id).exec((err, product) => {
      if (err) console.log("get single product error -----------", err);

      console.log("product -----", product);

      res.status(200).json({ product });
    });
  }
};
