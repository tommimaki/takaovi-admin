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
    //get info for Sale by id
    axios.get("/api/saleApi?id=" + id).then((response) => {
      setSaleInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1 className="mb-4">Edit The Sale</h1>
      {/* pass the info to the form with conditional rendering */}
      {SaleInfo && <SaleForm {...SaleInfo} />}
    </Layout>
  );
}
