import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Site } from "@/models/SiteModel";
import mongoose from "mongoose";

export default async function handle(req, res) {
  const { method } = req;
  //setting up mongoDB connection via mongoose
  await mongooseConnect();

  if (method === "GET") {
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
}
