import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";

const VisitRequests = () => {
  const [visitRequests, setVisitRequests] = useState([]);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    fetchVisitRequests();
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  async function fetchVisitRequests() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/visit-requests`
      );
      setVisitRequests(response.data);
    } catch (error) {
      console.error("Error fetching visit requests", error.message);
    }
  }

  async function handleUpdateStatus(id, status) {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/visit-requests/${id}`,
        { status }
      );
      fetchVisitRequests();
    } catch (error) {
      console.error("Error updating visit request status", error.message);
    }
  }

  async function handleDelete(id) {
    if (userRole !== "admin") {
      alert("Demo users can't remove data.");
      return;
    }
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/visit-requests/${id}`
      );
      fetchVisitRequests();
    } catch (error) {
      console.error("Error deleting visit request", error.message);
    }
  }

  function formatDate(date) {
    const parsedDate = new Date(date);
    return `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
  }
  return (
    <Layout>
      <div>
        <h2 className="text-2xl mb-4">Visit Requests</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Name
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Email
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Phone
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {visitRequests.map((request) => (
              <tr key={request._id} className="hover:bg-grey-lightest">
                <td className="py-4 px-6 border-b border-grey-light">
                  {request.name}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {request.email}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {request.phone}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {formatDate(request.date)}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <select
                    value={request.status}
                    onChange={(e) =>
                      handleUpdateStatus(request._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                  </select>
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded"
                    onClick={() => handleDelete(request._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default VisitRequests;
