import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { CalendarIcon } from "@/assets/Icons";
const ShowingsData = () => {
  const [showingsData, setShowingsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}visit-requests`)
      .then((response) => {
        setShowingsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Showings data:", error);
      });
  }, []);

  const totalShowings = showingsData.length;

  const acceptedShowings = showingsData.filter(
    (item) => item.status === "accepted"
  ).length;
  const pendingShowings = showingsData.filter(
    (item) => item.status === "pending"
  ).length;
  const rejectedShowings = showingsData.filter(
    (item) => item.status === "declined"
  ).length;

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-center text-xl my-4 font-bold">Showings</h2>
      <hr></hr>
      <div className="flex justify-around">
        <div className="mt-4">
          <p>
            Accepted showings: <b>{acceptedShowings}</b>
          </p>
          <p>
            Pending showings: <b>{pendingShowings}</b>
          </p>
          <p>
            Rejected showings: <b>{rejectedShowings}</b>
          </p>
          <p className="mt-4">
            Total: <b>{totalShowings}</b>
          </p>
        </div>

        <Link href="/Showings">
          {" "}
          <div>
            <button className="btnNeutral m-4 flex gap-2">
              Manage Requests <CalendarIcon />
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ShowingsData;
