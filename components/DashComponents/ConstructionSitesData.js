import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import ProjectsCarousel from "../ProjectCarousel";

const ConstructionSitesData = () => {
  const [constructionSites, setConstructionSites] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}sites`)
      .then((response) => {
        setConstructionSites(response.data);
      });
  }, []);

  const totalApartments = constructionSites.reduce((sum, site) => {
    const numApartments = parseInt(site.numberOfApartments) || 0;
    return sum + numApartments;
  }, 0);

  return (
    <>
      <h1 className="text-center text-xl my-4 font-bold">
        Ongoing construction sites
      </h1>
      <hr></hr>
      <div className="flex justify-between">
        <div>
          <p className="text-md m-2">
            Total projects: <b>{constructionSites.length}</b>
          </p>
          <p className=" text-md m-2">
            Total apartments being constructed: <b>{totalApartments}</b>
          </p>
        </div>
        <Link href={"/Sites"}>
          <button className="btnNeutral m-4 "> To sites</button>
        </Link>
      </div>
      <ProjectsCarousel projects={constructionSites} />
      {constructionSites.length > 0 ? (
        <ul>
          {constructionSites.map((site) => (
            <li key={site._id}>
              <div className="flex justify-between m-4">
                <h2 className="text-center text-lg">{site.title}</h2>
                <a
                  href={`https://backdoor.netlify.app/inconstruction/${site._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300 font-extrabold underline"
                >
                  <p>View listing</p>
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No construction sites found.</p>
      )}
    </>
  );
};

export default ConstructionSitesData;
