const { Schema, model, models } = require("mongoose");

const SiteSchema = new Schema({
  title: String,
  description: String,
  images: [{ type: String }],
  location: String,
  address: String,
  numberOfApartments: Number,
  finishingDate: Date,
});

//if exists create new
export const Site = models.Site || model("Site", SiteSchema);
