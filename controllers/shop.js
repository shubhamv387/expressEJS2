const Product = require("../models/product");
const Cart = require("../models/cart");
const e = require("express");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err.message));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then((product) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product[0].title,
        path: "/products",
      });
    })
    .catch((err) => {
      res.redirect("/products");
      console.log(err.message);
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err.message));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.findAll()
      .then((products) => {
        const cartProducts = [];
        for (product of products) {
          const cartProdcutData = cart.products.find(
            (prod) => Number(prod.id) === product.id
          );
          if (cartProdcutData) {
            cartProducts.push({
              productData: product,
              qty: cartProdcutData.qty,
            });
          }
        }
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: cartProducts,
        });
      })
      .catch((err) => console.log(err.message));

    // Product.fetchAll((products) => {
    //   const cartProducts = [];
    //   for (product of products) {
    //     const cartProdcutData = cart.products.find(
    //       (prod) => prod.id === product.id
    //     );
    //     if (cartProdcutData) {
    //       cartProducts.push({ productData: product, qty: cartProdcutData.qty });
    //     }
    //   }
    //   res.render("shop/cart", {
    //     path: "/cart",
    //     pageTitle: "Your Cart",
    //     products: cartProducts,
    //   });
    // });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      Cart.addProduct(prodId, product.price);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log(prodId);
  Product.findByPk(prodId)
    .then((product) => {
      Cart.deleteProduct(prodId, product.price);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
