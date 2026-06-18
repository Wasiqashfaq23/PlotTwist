const asyncHandler = require('express-async-handler');
const Property = require('../Model/Property');

const getProperties = asyncHandler(async (req, res) => {
  const { city, type, minPrice, maxPrice } = req.query;

  const filter = {};

  if (city) filter.city = { $regex: city, $options: 'i' };
  if (type) filter.type = type;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const properties = await Property.find(filter)
    .populate('owner', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json(properties);
});

const getProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).populate(
    'owner',
    'name email'
  );

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  res.status(200).json(property);
});

const createProperty = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    type,
    city,
    address,
    bedrooms,
    bathrooms,
    area,
    images,
  } = req.body;

  if (!title || !description || !price || !type || !city || !address) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  const property = await Property.create({
    title,
    description,
    price,
    type,
    city,
    address,
    bedrooms,
    bathrooms,
    area,
    images,
    owner: req.user._id,
  });

  res.status(201).json(property);
});

const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  if (property.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this property');
  }

  await property.deleteOne();

  res.status(200).json({ message: 'Property removed', id: req.params.id });
});

const getMyProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json(properties);
});

module.exports = {
  getProperties,
  getProperty,
  createProperty,
  deleteProperty,
  getMyProperties,
};
