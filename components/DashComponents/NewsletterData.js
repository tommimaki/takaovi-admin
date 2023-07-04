import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const NewsletterData = () => {
  const [newsletterData, setNewsletterData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}newsletter`)
      .then((response) => {
        setNewsletterData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Newsletter data:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold">Newsletter</h2>
      {/* Render the Newsletter data */}
      {newsletterData.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          {/* Add more properties to display as needed */}
        </div>
      ))}
      {/* Link to the corresponding site */}
      <Link href="/Newsletter">View All Newsletters</Link>
    </div>
  );
};

export default NewsletterData;
