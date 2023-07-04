import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ShowingsData = () => {
  const [showingsData, setShowingsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}showings`)
      .then((response) => {
        setShowingsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Showings data:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold">Showings</h2>
      {/* Render the Showings data */}
      {showingsData.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          {/* Add more properties to display as needed */}
        </div>
      ))}
      {/* Link to the corresponding site */}
      <Link href="/Showings">View All Showings</Link>
    </div>
  );
};

export default ShowingsData;
