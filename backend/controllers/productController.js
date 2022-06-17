import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
// @response { products:[{ <product1> }, { <product2> }, ...], page, pages }
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12; //TODO const for set how many product in one page, make this available in admin console
  const page = Number(req.query.pageNumber) || 1;

  // req.query will return a JS object after the query string is parsed.
  // $regex Provides regular expression capabilities for pattern matching strings in queries
  // $option: i Case insensitive
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  // count how many product fit for search param
  const count = await Product.countDocuments(keyword);
  // limit: limit the return products to pageSize; skip: skip (page-1) page
  const products = await Product.find(keyword)
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single products
// @route GET /api/products/:id
// @access Public
// @response { <product> }
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Delete a product
// @route Delete /api/products/:id
// @access Private/admin
// @response { { message: 'Product removed' } }
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc create a product
// @route POST /api/products
// @access Private/admin
// @response { <product> }
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/image/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numberReviews: 0,
    description: 'Sample description',
    rating: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc update a product
// @route PUT /api/products/:id
// @access Private/admin
// @response { <updatedProduct> }
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.price = price;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product no found');
  }
});

// @desc Create new Review
// @route POST /api/products/:id/reviews
// @access Private
// @response { message: 'Review created' }
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numberReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review created' });
  } else {
    res.status(404);
    throw new Error('Product no found');
  }
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
// @response { message: 'Review created' }
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);

  res.json(products);
});
export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
};
