import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const VisitRequests = () => {
  const [visitRequests, setVisitRequests] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const localizer = momentLocalizer(moment);

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

  // function to set colorcoding for table
  function getStatusColor(status) {
    switch (status) {
      case "accepted":
        return "bg-green-400 text-black ";
      case "declined":
        return "bg-red-200 text-black";
      default:
        return "bg-gray-200 text-black";
    }
  }
  // function for setting color code to Calendar
  function getCalendarColor(status) {
    switch (status) {
      case "accepted":
        return "#68D391";
      case "declined":
        return "#FC8181";
      default:
        return "#CBD5E0";
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-10">
        <h2 className=" text-center text-3xl">Visit Requests</h2>
        <table
          className="mb-4 shadow-xl overflow-y-scroll"
          style={{ maxHeight: "400px" }}
        >
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
                    className={`rounded-md p-1 ${getStatusColor(
                      request.status
                    )}`}
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

        <Calendar
          style={{ minHeight: "400px" }}
          localizer={localizer}
          events={visitRequests.map((request) => {
            return {
              title: request.name,
              start: new Date(new Date(request.date).toUTCString()),
              end: new Date(new Date(request.date).toUTCString()),
              allDay: true,
              color: getCalendarColor(request.status),
            };
          })}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          eventPropGetter={(event) => ({
            style: { backgroundColor: event.color, color: "#000" },
          })}
        />
      </div>
    </Layout>
  );
};

export default VisitRequests;
