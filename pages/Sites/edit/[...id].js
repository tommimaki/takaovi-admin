import Layout from "@/components/Layout";
import SiteForm from "@/components/SiteForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditSitePage() {
  const router = useRouter();
  const { id } = router.query;
  const [siteInfo, setSiteInfo] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    //getting info for site by id
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}sites/${id}`)
      .then((response) => {
        setSiteInfo(response.data);
      });
  }, [id]);

  return (
    <Layout>
      <h1 className="mb-4 text-center text-2xl">Edit The Site</h1>
      {siteInfo && <SiteForm {...siteInfo} />}
    </Layout>
  );
}
