import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Sale } from "@/models/SaleModel";
import mongoose from "mongoose";

export default async function handle(req, res) {
  const { method } = req;
  //setting up mongoDB connection via mongoose
  await mongooseConnect();

  if (method === "GET") {
    //if req is from edit with id query, use findOne
    if (req.query?.id) {
      res.json(await Sale.findOne({ _id: req.query.id }));
    } else {
      //if req is from main Sales listing find all
      res.json(await Sale.find());
    }
    return;
  }

  if (method === "POST") {
    const { title, description, images } = req.body;
    //creating Sale document in the DB
    const SaleDoc = await Sale.create({
      title,
      description,
      images,
    });
    res.json(SaleDoc);
    return;
  }

  if (method === "PUT") {
    const { title, description, images, _id } = req.body;
    await Sale.updateOne({ _id }, { title, description, images });
    res.json(true);
    return;
  }

  if (method === "DELETE") {
    console.log("deleting in api", req.query?.id);
    if (req.query?.id) {
      await Sale.deleteOne({ _id: req.query?.id });
      res.json(true);
      return;
    }
  }
}
