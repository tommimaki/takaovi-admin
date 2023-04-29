import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";

export default function ForSaleForm({
  _id,
  title: currentTitle,
  description: currentDescription,
  images: existingImages,
  apartments: existingApartments,
  location: currentLocation,
  address: currentAddress,
}) {
  // in edit view set the const values to existing ones, else empty
  const [title, setTitle] = useState(currentTitle || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [location, setLocation] = useState(currentLocation || "");
  const [address, setAddress] = useState(currentAddress || "");
  const [goToProjects, setGoToProjects] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingApt, setIsUploadingApt] = useState(false);
  const [apartments, setApartments] = useState(existingApartments || []);
  const [openApartments, setOpenApartments] = useState({});

  const toggleApartment = (index) => {
    setOpenApartments((prevOpen) => ({
      ...prevOpen,
      [index]: !prevOpen[index],
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { title, description, images, apartments, location, address };
    console.log(data);
    // if project has ID = is existing project, update it
    if (_id) {
      await axios.put("/api/saleApi", { ...data, _id });
    } else {
      // otherwise create new project
      await axios.post("/api/saleApi", data);
    }

    setGoToProjects(true);
  }

  if (goToProjects) {
    router.push("/ForSale");
  }

  async function uploadImages(event) {
    console.log(event);
    const files = event.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/upload", data);
      //setting existing images + new images via link that's returned when uploading
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  const addApartment = () => {
    setApartments((prevApartments) => [
      ...prevApartments,
      {
        title: "",
        description: "",
        type: "",
        area: 0,
        floor: 0,
        sellingPrice: 0,
        debtFreePrice: 0,
        maintenanceFee: 0,
        images: [],
      },
    ]);

    setOpenApartments((prevOpen) => {
      const newIndex = apartments.length;
      return { ...prevOpen, [newIndex]: true };
    });
  };

  const deleteImage = (imageToDelete) => {
    setImages((oldImages) => {
      return oldImages.filter((image) => image !== imageToDelete);
    });
  };

  const Cancel = () => {
    router.back();
  };
  async function uploadApartmentImages(event, apartmentIndex) {
    const files = event.target?.files;
    if (files?.length > 0) {
      setIsUploadingApt(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/upload", data);
      setApartments((prevApartments) =>
        prevApartments.map((apt, index) =>
          index === apartmentIndex
            ? { ...apt, images: [...apt.images, ...res.data.links] }
            : apt
        )
      );
      setIsUploadingApt(false);
    }
  }

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
            placeholder="Helsinki"
            value={location}
            onChange={(ev) => setLocation(ev.target.value)}
          ></input>
          <label>Address</label>
          <input
            type="text"
            placeholder="Kuukatu 16"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          ></input>

          {apartments.map((apartment, index) => (
            <div key={index} className="flex flex-col  mb-4 border-b-2 ">
              {/* Apartment title */}
              <div className="flex justify-between items-center">
                <div>
                  {!openApartments[index] && (
                    <label>{apartment.title || "Untitled Apartment"}</label>
                  )}
                </div>
                <button type="button" onClick={() => toggleApartment(index)}>
                  {openApartments[index] ? (
                    <div className="flex">
                      <p>Hide</p>
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
                          d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex">
                      <p>show more</p>
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
                          d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>

              {openApartments[index] && (
                <>
                  {/* Apartment title */}
                  <label>Apartment Title</label>
                  <input
                    type="text"
                    value={apartment.title}
                    onChange={(ev) => {
                      const newTitle = ev.target.value;
                      setApartments((prevApartments) =>
                        prevApartments.map((apt, aptIndex) =>
                          aptIndex === index ? { ...apt, title: newTitle } : apt
                        )
                      );
                    }}
                  />

                  {/* Apartment description */}
                  <label>Apartment Description</label>
                  <textarea
                    value={apartment.description}
                    onChange={(ev) => {
                      const newDescription = ev.target.value;
                      setApartments((prevApartments) =>
                        prevApartments.map((apt, aptIndex) =>
                          aptIndex === index
                            ? { ...apt, description: newDescription }
                            : apt
                        )
                      );
                    }}
                  />

                  {/* Type */}
                  <label>Type</label>
                  <input
                    type="text"
                    value={apartment.type}
                    onChange={(ev) => {
                      const newType = ev.target.value;
                      setApartments((prevApartments) =>
                        prevApartments.map((apt, aptIndex) =>
                          aptIndex === index ? { ...apt, type: newType } : apt
                        )
                      );
                    }}
                  />

                  {/* Area */}
                  <label>Area</label>
                  <input
                    type="number"
                    value={apartment.area}
                    onChange={(ev) => {
                      const newArea = ev.target.value;
                      setApartments((prevApartments) =>
                        prevApartments.map((apt, aptIndex) =>
                          aptIndex === index ? { ...apt, area: newArea } : apt
                        )
                      );
                    }}
                  />

                  {/* Floor */}
                  <label>Floor</label>
                  <input
                    type="number"
                    value={apartment.floor}
                    onChange={(ev) => {
                      const newFloor = ev.target.value;
                      setApartments((prevApartments) =>
                        prevApartments.map((apt, aptIndex) =>
                          aptIndex === index ? { ...apt, floor: newFloor } : apt
                        )
                      );
                    }}
                  />

                  {/* Selling price */}
                  <label>Selling Price</label>
                  <input
                    type="number"
                    value={apartment.sellingPrice}
                    onChange={(ev) => {
                      const newSellingPrice = ev.target.value;
                      setApartments((prevApartments) =>
                        prevApartments.map((apt, aptIndex) =>
                          aptIndex === index
                            ? { ...apt, sellingPrice: newSellingPrice }
                            : apt
                        )
                      );
                    }}
                  />

                  {/* Debt-free price */}
                  <label>Debt-free Price</label>
                  <input
                    type="number"
                    value={apartment.debtFreePrice}
                    onChange={(ev) => {
                      const newDebtFreePrice = ev.target.value;
                      setApartments((prevApartments) =>
                        prevApartments.map((apt, aptIndex) =>
                          aptIndex === index
                            ? { ...apt, debtFreePrice: newDebtFreePrice }
                            : apt
                        )
                      );
                    }}
                  />

                  {/* Maintenance fee */}
                  <label>Maintenance Fee</label>
                  <input
                    type="number"
                    value={apartment.maintenanceFee}
                    onChange={(ev) => {
                      const newMaintenanceFee = ev.target.value;
                      setApartments((prevApartments) =>
                        prevApartments.map((apt, aptIndex) =>
                          aptIndex === index
                            ? { ...apt, maintenanceFee: newMaintenanceFee }
                            : apt
                        )
                      );
                    }}
                  />

                  {/* Apartment images */}
                  <label>Apartment Images</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {!!apartment.images?.length &&
                      apartment.images.map((link) => (
                        <div
                          className="inline-block rounded-lg w-22 h-22 relative"
                          key={link}
                        >
                          <img
                            src={link}
                            alt="apartment img"
                            className="rounded-lg w-20"
                          />
                          <button
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            onClick={() => {
                              setApartments((prevApartments) =>
                                prevApartments.map((apt, aptIndex) =>
                                  aptIndex === index
                                    ? {
                                        ...apt,
                                        images: apt.images.filter(
                                          (img) => img !== link
                                        ),
                                      }
                                    : apt
                                )
                              );
                            }}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    {isUploadingApt && (
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
                      <input
                        className="hidden"
                        onChange={(event) =>
                          uploadApartmentImages(event, index)
                        }
                        type="file"
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
          ))}
          <button type="button" className="btnGreen" onClick={addApartment}>
            Add New Apartment
          </button>
          <div className="flex gap-4 mt-10 justify-center">
            <button type="submit" className="btnGreen">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
