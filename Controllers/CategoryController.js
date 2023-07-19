const Category = require("../Models/Category");

// create category
const createCategory = async (req, res) => {
  // find if category already exist

  let category = await Category.findOne({
    categoryName: req.body.categoryName.toLowerCase(),
  });

  if (category == null) {
    await Category.create({
      categoryName: req.body.categoryName.toLowerCase(),
    });
    res.json({
      success: true,
      message: "category created successfully!",
    });
  } else {
    res.json({
      success: false,
      message: "this category is already exist!",
    });
  }
};

///get category
const getCategory = async (req, res) => {
  const get = await Category.find({});
  res.json({
    data: get,
    message: "successfully fetch category",
  });
};

module.exports = {
  createCategory,
  getCategory,
};
