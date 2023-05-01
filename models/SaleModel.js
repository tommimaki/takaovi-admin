const { Schema, model, models } = require("mongoose");

const ApartmentSchema = new Schema({
  title: String,
  description: String,
  type: String,
  area: Number,
  floor: Number,
  sellingPrice: Number,
  debtFreePrice: Number,
  maintenanceFee: Number,
  images: [{ type: String }],
});
const SaleSchema = new Schema({
  title: String,
  description: String,
  images: [{ type: String }],
  apartments: [ApartmentSchema],
  location: String,
  address: String,
  buildingType: String,
  floors: Number,
  numberOfApartments: Number,
});

//if exists create new
export const Sale = models.Sale || model("Sale", SaleSchema);
