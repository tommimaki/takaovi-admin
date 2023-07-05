import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MailIcon } from "@/assets/Icons";
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
    <div className="w-full">
      <h1 className="text-center text-xl my-4 font-bold">Newsletters</h1>
      <hr></hr>
      <div className="flex justify-around mt-4 align-middle">
        <h3>
          Current subscribers: <b>{newsletterData.length}</b>
        </h3>
        <Link href="/Newsletter">
          <button className="btnNeutral flex gap-2 mr-4">
            Manage Newsletter
            <MailIcon />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewsletterData;
