const { Schema, model, models } = require("mongoose");

const SaleSchema = new Schema({
  title: String,
  description: String,
  images: [{ type: String }],
});

//if exists create new
export const Sale = models.Sale || model("Sale", SaleSchema);
