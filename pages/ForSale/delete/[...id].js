import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteSalePage() {
  const router = useRouter();
  const { id } = router.query;
  const [saleInfo, setSaleInfo] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/saleApi?id=" + id).then((response) => {
      setSaleInfo(response.data);
    });
  }, [id]);

  function cancel() {
    router.push("/Sales");
  }

  async function deleteSale() {
    console.log("deleting, ", id);
    await axios.delete("/api/saleApi?id=" + id);
    router.push("/ForSale");
  }
  return (
    <Layout>
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
    </Layout>
  );
}
