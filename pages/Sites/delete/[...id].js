/* eslint-disable react/no-unescaped-entities */
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteSitePage() {
  const router = useRouter();
  const { id } = router.query;
  const [siteInfo, setSiteInfo] = useState();
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
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/sites/${id}`)
      .then((response) => {
        setSiteInfo(response.data);
      });
  }, [id]);

  function cancel() {
    router.push("/Sites");
  }

  async function deleteSite() {
    console.log("deleting, ", id);
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/sites/${id}`
    );
    router.push("/Sites");
  }

  return (
    <Layout>
      {userRole === "admin" ? (
        <div className="flex flex-col min-h-full items-center justify-center">
          <h1 className="text-center mb-4">
            Are you sure you want to delete <b>{siteInfo?.title}?</b>
          </h1>
          <div className="flex gap-2 justify-center">
            <button className="btnRed" onClick={deleteSite}>
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
