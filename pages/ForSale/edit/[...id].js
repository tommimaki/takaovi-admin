/* eslint-disable react/no-unescaped-entities */
import Layout from "@/components/Layout";
import SaleForm from "@/components/ForSaleForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditSalePage() {
  const router = useRouter();
  const { id } = router.query;
  const [SaleInfo, setSaleInfo] = useState(null);

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

  return (
    <Layout>
      <h1 className="mb-4 text-3xl">Edit the project for sale</h1>
      <h2 className="italic">
        {" "}
        remember to click the "Save Changes" after all changes made
      </h2>
      {/* pass the info to the form with conditional rendering */}
      {SaleInfo && <SaleForm {...SaleInfo} />}
    </Layout>
  );
}
