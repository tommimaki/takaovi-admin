import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Site } from "@/models/SiteModel";
import mongoose from "mongoose";

export default async function handle(req, res) {
  const { method } = req;
  //setting up mongoDB connection via mongoose
  await mongooseConnect();

  if (method === "GET") {
    //if req is from edit with id query, use findOne
    if (req.query?.id) {
      res.json(await Site.findOne({ _id: req.query.id }));
    }
    //if req is from main sites listing find all
    res.json(await Site.find());
  }

  if (method === "POST") {
    const { title, description } = req.body;
    //creating site document in the DB
    const siteDoc = await Site.create({
      title,
      description,
    });
    res.json(siteDoc);
  }

  if (method === "PUT") {
    const { title, description, _id } = req.body;
    await Site.updateOne({ _id }, { title, description });
    res.json(true);
  }

  if (method === "DELETE") {
    console.log("deleting in api", req.query?.id);
    if (req.query?.id) {
      await Site.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
