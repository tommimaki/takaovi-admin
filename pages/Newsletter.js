import Layout from "@/components/Layout";
import Snackbar from "@/components/Snackbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DeleteIcon } from "@/assets/Icons";

export default function Newsletters() {
  const [letters, setLetters] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [snackbar, setSnackbar] = useState({});
  const [newEmail, setNewEmail] = useState("");

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

  const handleNewEmailSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== "admin") {
      alert("Demo users can't add data.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}newsletter/subscribe`,
        { email: newEmail }
      );
      setLetters((prevLetters) => [...prevLetters, response.data]);
      setNewEmail("");
    } catch (error) {
      console.error("Error adding email:", error);
    }
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

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    const recipients = letters.map((letter) => letter.email);

    const emailData = {
      subject: emailSubject,
      body: emailBody,
      recipients: recipients,
    };

    axios
      .post("/api/send-email", emailData)
      .then((response) => {
        console.log("Email sent successfully");
        setSnackbar({
          message: "Email sent successfully!",
          type: "success",
        });
        setTimeout(() => setSnackbar({}), 3000);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setSnackbar({
          message: "Error sending email.",
          type: "error",
        });
        setTimeout(() => setSnackbar({}), 3000);
      });

    setEmailSubject("");
    setEmailBody("");
  };

  return (
    <Layout>
      {snackbar.message && (
        <Snackbar message={snackbar.message} type={snackbar.type} />
      )}
      <h1 className="mb-10 text-center text-3xl">Newsletter manager</h1>

      <div className="flex  items-stretch flex-wrap">
        <div
          className="w-2/3 shadow-xl overflow-y-scroll"
          style={{ maxHeight: "400px" }}
        >
          <table>
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
        </div>

        <div className="flex flex-col w-1/3  self-stretch  ">
          <form
            className="flex flex-col mt-1  mx-auto space-y-4"
            onSubmit={handleNewEmailSubmit}
          >
            <label htmlFor="newEmail" className="font-bold text-lg">
              Add new Email to mailing list:
            </label>
            <input
              type="email"
              id="newEmail"
              name="newEmail"
              placeholder="Enter new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="rounded-lg px-4 py-2 shadow-inner border border-green-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
            />

            <button type="submit" className="btnGreen w-full">
              Add Email
            </button>
          </form>

          <div className="mx-auto">
            <button
              onClick={copyEmails}
              className="mt-2 rounded-full bg-gray-600 hover:bg-gray-400 focus:ring-gray-800 text-white  w-full px-7 py-2"
            >
              Copy All Addresses in list
            </button>
          </div>
        </div>
      </div>
      <div className="flex mt-4 flex-col w-full p-4  bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center ">
          {" "}
          Send an Email to mailing list
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleEmailSubmit}>
          <label htmlFor="subject" className="font-bold text-lg text-green-500">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Enter email subject"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            required
            className="rounded-lg px-4 py-2 shadow-inner border border-green-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
          />

          <label htmlFor="body" className="font-bold text-lg text-green-500">
            Body:
          </label>
          <textarea
            id="body"
            name="body"
            placeholder="Enter email body"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            required
            className="h-48 rounded-lg px-4 py-2 shadow-inner border border-green-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
          />

          <button
            type="submit"
            className="py-2 px-4 rounded-full text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg"
          >
            Send Email
          </button>
        </form>
      </div>
    </Layout>
  );
}
