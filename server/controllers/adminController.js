const Product = require("../models/product");
const User = require("../models/user");

module.exports = {
  getAdminUsers: (req, res) => {
    User.find().exec((err, users) => {
      if (err) console.log("find admin users error ------", err);

      res.status(200).json({ users });
    });
  },
  createProduct: (req, res) => {
    const { name, description, price } = req.body;

    let newProduct = new Product({
      name,
      description,
      price
    });

    newProduct.save();

    res.status(200).json({ product: newProduct });
  },
  updateProduct: (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    Product.findById(id).exec((err, product) => {
      if (err) console.log("updated product error ---------", err);

      product.name = name;
      product.description = description;
      product.price = price;

      product.save();

      res.status(200).json({ product });
    });
  },
  deleteProduct: (req, res) => {
    const { id } = req.params;
    Product.deleteOne({ _id: id }).exec((err, product) => {
      if (err) console.log("delete one error -----------", err);
      res.status(200).json({ product });
    });
  }
};
