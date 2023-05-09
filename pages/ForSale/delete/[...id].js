/* eslint-disable react/no-unescaped-entities */
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteSalePage() {
  const router = useRouter();
  const { id } = router.query;
  const [saleInfo, setSaleInfo] = useState();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/sales/${id}`)
      .then((response) => {
        setSaleInfo(response.data);
      });
  }, [id]);

  function cancel() {
    router.push("/ForSale");
  }

  async function deleteSale() {
    console.log("deleting, ", id);
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/sales/${id}`
    );
    router.push("/ForSale");
  }

  return (
    <Layout>
      {userRole === "admin" ? (
        <div className="flex flex-col min-h-full items-center justify-center">
          <h1 className="text-center mb-4">
            Are you sure you want to delete <b>{saleInfo?.title}?</b>
          </h1>
          <div className="flex gap-2 justify-center">
            <button className="btnRed" onClick={deleteSale}>
              Yes
            </button>
            <button className="btnNeutral" onClick={cancel}>
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-full items-center justify-center">
          <h1 className="text-center mb-4">
            Demo user can't modify data, sorry!
          </h1>
        </div>
      )}
    </Layout>
  );
}
