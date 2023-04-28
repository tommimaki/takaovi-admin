import Layout from "@/components/Layout";
import { useState } from "react";

export default function NewSite() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Layout>
      <div className="flex flex-col">
        <h1 className="mb-4">New Construction Site</h1>
        <label>name</label>
        <input
          type="text"
          placeholder="Site name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        ></input>
        <label>Description</label>
        <textarea
          type="text"
          placeholder="Site description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
        <button className="linkAddButton"> save</button>
      </div>
    </Layout>
  );
}
