import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sites() {
  const [sites, setSites] = useState([]);
  useEffect(() => {
    axios.get("/api/sitesApi").then((response) => {
      setSites(response.data);
    });
  }, []);
  return (
    <Layout>
      <Link className="linkAddButton" href={"/Sites/newSite"}>
        Add a new site
      </Link>
      <table className="basic mt-20">
        <thead>
          <tr>
            <td> Site name</td>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site.title}>
              <td>{site.title}</td>
              <td>buttons</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
