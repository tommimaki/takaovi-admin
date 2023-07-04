import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DeleteIcon } from "@/assets/Icons";

export default function Newsletters() {
  const [letters, setLetters] = useState([]);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}newsletter`)
      .then((response) => {
        setLetters(response.data);
      });
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const copyEmails = () => {
    const emailList = letters.map((letter) => letter.email).join(", ");
    navigator.clipboard.writeText(emailList).then(
      () => {
        alert("Email addresses copied to clipboard");
      },
      (err) => {
        console.error("Could not copy email addresses: ", err);
      }
    );
  };

  const handleDelete = async (id) => {
    if (userRole !== "admin") {
      alert("Demo users can't change data.");
      return;
    }
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}newsletter/${id}`
      );
      setLetters((prevLetters) =>
        prevLetters.filter((letter) => letter._id !== id)
      );
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  };
  return (
    <Layout>
      <h1 className="mb-4">Newsletter</h1>
      <button onClick={copyEmails} className="btnGreen">
        Copy All Addresses
      </button>
      <table className="basic">
        <thead>
          <tr>
            <th>Newsletter subscribers</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {letters.map((letter) => (
            <tr key={letter._id}>
              <td>{letter.email}</td>
              <td>
                <div className="flex gap-4">
                  <button
                    className="btnRed"
                    onClick={() => handleDelete(letter._id)}
                  >
                    <DeleteIcon />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
