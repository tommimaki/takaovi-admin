import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "@/assets/Icons";

export default function ForSaleProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}sales`)
      .then((response) => {
        setProjects(response.data);
      });
  }, []);

  const apartments = projects.flatMap((project) =>
    project.apartments.map((apartment) => ({
      ...apartment,
      projectTitle: project.title,
    }))
  );

  return (
    <Layout>
      <div className="flex justify-center items-center flex-col relative overflow-x-auto shadow-lg sm:rounded-lg">
        <h1 className="text-center my-4 text-lg ">
          Buildings and apartments constructed and listed for sale{" "}
        </h1>

        <table className="basic">
          <thead>
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Number of Apartments</th>
              <th scope="col">Available Apartments</th>
              <th scope="col">Type of Building</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, i) => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>{project.numberOfApartments}</td>
                <td>{project.apartments.length}</td>
                <td>{project.buildingType}</td>
                <td>
                  <div className="flex gap-4">
                    <Link
                      className="btnGreen"
                      href={"/ForSale/edit/" + project._id}
                    >
                      <EditIcon />
                      Edit
                    </Link>
                    <Link
                      className="btnRed"
                      href={"/ForSale/delete/" + project._id}
                    >
                      <DeleteIcon />
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link className="btnGreen  mt-4 p-10" href={"/ForSale/NewForSale"}>
          Add a new project
        </Link>

        <h1 className="text-center my-4 font-sans ">Apartment details</h1>

        <table className="basic">
          <thead>
            <tr>
              <th scope="col">Apartment Type</th>
              <th scope="col">Building Name</th>
              <th scope="col">Size</th>
              <th scope="col">Price</th>
              <th scope="col">Listing</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((apartment, i) => (
              <tr key={i}>
                <td>{apartment.description}</td>
                <td>{apartment.projectTitle}</td>
                <td>{apartment.area}m2</td>
                <td>{apartment.sellingPrice}€</td>
                <td>
                  <Link
                    href={`https://backdoor.netlify.app/apartment/${apartment._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-blue-300 font-extrabold underline "
                  >
                    View Listing
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
