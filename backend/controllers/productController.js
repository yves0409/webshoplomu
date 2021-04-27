import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//Route : GET /api/products
//What it does: FETCHING ALL PRODUCTS
//Who : Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const products = await Product.find({ ...keyword });
  res.json(products);
});

//Route : GET /api/products/:id
//What it does: FETCHING A SINGLE PRODUCT
//Who : Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

//Route : DELETE /api/products/:id
//What it does: DELETE A SINGLE PRODUCT
//Who : Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

//Route : POST /api/products/:id
//What it does: CREATE A SINGLE PRODUCT
//Who : Private
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Enter name",
    price: 0,
    user: req.user.id,
    image: "/images/sample.jpg",
    brand: "Select brand",
    category: "Select category",
    countInStock: 0,
    numReviews: 0,
    description: "Enter description",
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

//Route : PUT /api/products/:id
//What it does: UPDATE A SINGLE PRODUCT
//Who : Private
const updatedProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//Route : POST /api/products/:id/review
//What it does: POST A REVIEW
//Who : Private
const giveReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const reviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (reviewed) {
      res.status(400);
      throw new Error("You already reviewed this product");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Thanks for reviewing this product" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//Route : GET /api/products/top
//What it does: FETCHING THE BEST RATED PRODUCTS
//Who : Public
const getBestRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  giveReview,
  deleteProduct,
  createProduct,
  updatedProduct,
  getBestRatedProducts,
};
