import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ProjectsCarousel from "../ProjectCarousel";

const ForSaleData = () => {
  const [forSaleData, setForSaleData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}sales`)
      .then((response) => {
        setForSaleData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching For Sale data:", error);
      });
  }, []);

  const totalApartmentsForSale = forSaleData.reduce((sum, item) => {
    // Checking if the 'apartments' property exists and is an array, then counting total lenghts
    const numApartments = Array.isArray(item.apartments)
      ? item.apartments.length
      : 0;
    return sum + numApartments;
  }, 0);

  return (
    <div>
      <h2 className="text-center text-xl my-4 font-bold">For Sale</h2>
      <hr></hr>
      <div className="flex justify-between">
        <div>
          <p className=" text-md m-2">
            Total buildings: <b>{forSaleData.length}</b>
          </p>
          <p className=" text-md m-2">
            Total apartments for sale: <b>{totalApartmentsForSale}</b>
          </p>
        </div>
        <div className="flex justify-end">
          <Link href={"/ForSale"}>
            <button className="btnNeutral m-4">View All For Sale</button>
          </Link>
        </div>
      </div>
      <ProjectsCarousel projects={forSaleData} />

      {forSaleData.map((item) => (
        <div className="flex justify-between m-2" key={item._id}>
          <p className="text-lg ">{item.title}</p>
          <a
            href={`https://backdoor.netlify.app/project/${item._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-300 font-extrabold underline"
          >
            <p>View listing</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ForSaleData;
