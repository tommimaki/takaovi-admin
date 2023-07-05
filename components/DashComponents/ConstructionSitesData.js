import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const ConstructionSitesData = () => {
  const [constructionSites, setConstructionSites] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}sites`)
      .then((response) => {
        setConstructionSites(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      {constructionSites.length > 0 ? (
        <ul>
          {constructionSites.map((site) => (
            <li key={site.id}>
              <Link href="/Sites">
                <p>sites</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No construction sites found.</p>
      )}
    </div>
  );
};

export default ConstructionSitesData;
