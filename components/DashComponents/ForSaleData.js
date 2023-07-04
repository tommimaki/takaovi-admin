import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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

  return (
    <div>
      <h2 className="text-lg font-semibold">For Sale</h2>
      {/* Render the For Sale data */}
      {forSaleData.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          {/* Add more properties to display as needed */}
        </div>
      ))}
      {/* Link to the corresponding site */}
      <Link href="/ForSale">View All For Sale</Link>
    </div>
  );
};

export default ForSaleData;
