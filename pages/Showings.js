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
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}visit-requests`
      );
      setVisitRequests(response.data);
    } catch (error) {
      console.error("Error fetching visit requests", error.message);
    }
  }

  async function handleUpdateStatus(id, status) {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}visit-requests/${id}`,
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
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}visit-requests/${id}`
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
        <table className="basic">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visitRequests.map((request) => (
              <tr key={request._id} className="hover:bg-grey-lightest">
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.phone}</td>
                <td>{formatDate(request.date)}</td>
                <td>
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
                <td>
                  <button
                    className="btnRed"
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
