import Layout from "./Layout";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SiteForm({
  _id,
  title: currentTitle,
  description: currentDescription,
}) {
  //in edit view set the const values to existing ones, else empty
  const [title, setTitle] = useState(currentTitle || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [goToSites, setGoToSites] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { title, description };
    // if product has ID = is existing product, update it
    if (_id) {
      await axios.put("/api/sitesApi", { ...data, _id });
    } else {
      //otherwiser create new product
      await axios.post("/api/sitesApi", data);
    }
    setGoToSites(true);
  }

  if (goToSites) {
    router.push("/Sites");
  }
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="flex flex-col">
        <label>Name</label>
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
        <button type="submit" className="linkAddButton">
          save
        </button>
      </div>
    </form>
  );
}
