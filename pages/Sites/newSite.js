import Layout from "@/components/Layout";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewSite() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goToSites, setGoToSites] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { title, description };
    await axios.post("/api/sitesApi", data);
    setGoToSites(true);
  }

  if (goToSites) {
    router.push("/Sites");
  }
  return (
    <Layout>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="flex flex-col">
          <h1 className="mb-4">New Construction Site</h1>
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
    </Layout>
  );
}
