import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "@/assets/Icons";

export default function Sites() {
  const [sites, setSites] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}sites`)
      .then((response) => {
        setSites(response.data);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <Layout>
      <div className="flex justify-center items-center flex-col relative overflow-x-auto shadow-lg sm:rounded-lg">
        <h1 className="text-center my-8 text-3xl "> Sites in construction </h1>
        <table className="basic mt-4">
          <thead>
            <tr>
              <th>Site Name</th>
              <th>Finishing Date</th>
              <th>Location</th>
              <th>Number of Apartments</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site._id}>
                <td>{site.title}</td>
                <td>{formatDate(site.finishingDate)}</td>
                <td>{site.location}</td>
                <td>{site.numberOfApartments}</td>
                <td>
                  <div className="flex gap-4">
                    <Link className="btnGreen" href={"/Sites/edit/" + site._id}>
                      <EditIcon />
                      Edit
                    </Link>

                    <Link className="btnRed" href={"/Sites/delete/" + site._id}>
                      <DeleteIcon />
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link className="btnGreen my-2" href={"/Sites/newSite"}>
          Add a new site
        </Link>
      </div>
    </Layout>
  );
}
