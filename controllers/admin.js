const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: +price,
      imageUrl: imageUrl,
      description: description,
      userId: req.user.id,
    })
    .then((result) => {
      console.log("product created");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err.message));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findAll({ where: { id: prodId } })
    .then((product) => {
      if (!product[0]) {
        res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product[0],
      });
    })
    .catch((err) => console.log(err.message));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.update(
    {
      title: updatedTitle,
      imageUrl: updatedImageUrl,
      price: updatedPrice,
      description: updatedDescription,
    },
    { where: { id: prodId } }
  )
    .then(res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((pruduct) => {
      pruduct
        .destroy()
        .then(res.redirect("/admin/products"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
