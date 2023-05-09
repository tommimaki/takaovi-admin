import Layout from "./Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";

export default function SiteForm({
  _id,
  title: currentTitle,
  description: currentDescription,
  location: currentLocation,
  address: currentAddress,
  numberOfApartments: currentNumberOfApartments,
  finishingDate: currentFinishingDate,
  images: existingImages,
}) {
  //in edit view set the const values to existing ones, else empty
  const [title, setTitle] = useState(currentTitle || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [goToSites, setGoToSites] = useState(false);
  const [location, setLocation] = useState(currentLocation || "");
  const [address, setAddress] = useState(currentAddress || "");
  const [numberOfApartments, setNumberOfApartments] = useState(
    currentNumberOfApartments || ""
  );
  const [finishingDate, setFinishingDate] = useState(
    currentFinishingDate || ""
  );
  const [userRole, setUserRole] = useState(null);
  const [images, setImages] = useState(existingImages || []);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (userRole !== "admin") {
      alert("Demo users can't change data.");
      return;
    }

    const data = {
      title,
      description,
      images,
      location,
      address,
      numberOfApartments,
      finishingDate,
    };
    // if product has ID = is existing product, update it
    if (_id) {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/sites/${_id}`,
        data
      );
    } else {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/sites`,
        data
      );
    }

    setGoToSites(true);
  }

  if (goToSites) {
    router.push("/Sites");
  }

  async function uploadImages(event) {
    if (userRole !== "admin") {
      alert("Demo users can't change data.");
      return;
    }
    const files = event.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/image-upload`,
        data
      );
      //setting existing images + new images via link that's returned when uploading
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  const deleteImage = (imageToDelete) => {
    if (userRole !== "admin") {
      alert("Demo users can't change data.");
      return;
    }
    setImages((oldImages) => {
      return oldImages.filter((image) => image !== imageToDelete);
    });
  };

  const Cancel = () => {
    router.back();
  };
  return (
    <div>
      <div className=" flex justify-end">
        <button className="btnNeutral" onClick={Cancel}>
          Cancel
        </button>
      </div>
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
          <div className="flex flex-wrap gap-2 mb-2">
            {!!images?.length &&
              images.map((link) => (
                <div
                  className="inline-block rounded-lg  w-22 h-22 relative"
                  key={link}
                >
                  <img src={link} alt="site img" className="rounded-lg w-20" />
                  <button
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={() => deleteImage(link)}
                  >
                    &times;
                  </button>
                </div>
              ))}

            {isUploading && (
              <div className="h-24 bg-green-400 p-2 flex items-center">
                <Spinner />
              </div>
            )}
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
          <label>Location</label>
          <input
            type="text"
            placeholder="Site location"
            value={location}
            onChange={(ev) => setLocation(ev.target.value)}
          ></input>
          <label>Address</label>
          <input
            type="text"
            placeholder="Site address"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          ></input>
          <label>Number of Apartments</label>
          <input
            type="number"
            placeholder="Number of apartments"
            value={numberOfApartments}
            onChange={(ev) => setNumberOfApartments(ev.target.value)}
          ></input>
          <label>Finishing Date</label>
          <input
            type="date"
            placeholder="Finishing date"
            value={finishingDate}
            onChange={(ev) => setFinishingDate(ev.target.value)}
          ></input>
          <button type="submit" className="linkAddButton">
            save
          </button>
        </div>
      </form>
    </div>
  );
}
