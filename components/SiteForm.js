import Layout from "./Layout";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SiteForm({
  _id,
  title: currentTitle,
  description: currentDescription,
  images,
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

  async function uploadImages(event) {
    console.log(event);
    const files = event.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
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
        <label>Photos</label>
        <div>
          {!images?.length && <p> No photos yet</p>}
          <label className="flex items-center justify-center w-24 h-24 text-sm text-center gap-1 text-green-900 rounded-lg bg-gray-200 hover:bg-green-300 cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p>Upload</p>
            <input className="hidden" onChange={uploadImages} type="file" />
          </label>
        </div>
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
