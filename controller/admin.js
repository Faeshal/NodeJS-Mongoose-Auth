const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("index", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/",
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
  res.render("add", {
    pageTitle: "Add Product",
    path: "/add",
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const title =
    req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1);
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const stock = req.body.stock;
  const description =
    req.body.description.charAt(0).toUpperCase() +
    req.body.description.slice(1);

  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    stock: stock,
    description: description
  });
  product
    .save()
    .then(result => {
      console.log("Created Product");
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("edit", {
        pageTitle: "Edit Product",
        path: "/edit",
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedStock = req.body.stock;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.stock = updatedStock;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/");
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log("Delete Succesfull");
      res.redirect("/");
    })
    .catch(err => console.log(err));
};
