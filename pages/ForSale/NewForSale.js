import ForSaleProjectForm from "@/components/ForSaleForm";
import Layout from "@/components/Layout";
import ForSaleForm from "@/components/ForSaleForm";
export default function NewSite() {
  return (
    <Layout>
      <h1 className="mb-4">New Sales Listing</h1>
      <ForSaleForm />
    </Layout>
  );
}
