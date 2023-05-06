import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Newsletters() {
  const [letters, setLetters] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/newsletter`)
      .then((response) => {
        setLetters(response.data);
      });
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

  return (
    <Layout>
      <h1 className="text-center mb-4">Newsletter</h1>
      <button onClick={copyEmails} className="btnGreen">
        Copy All Addresses
      </button>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Newsletter subscribers</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {letters.map((letter) => (
            <tr key={letter._id}>
              <td>{letter.email}</td>
              <td>
                <div className="flex gap-4">
                  <Link
                    className="btnRed"
                    href={"/Newsletters/delete/" + letter._id}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
