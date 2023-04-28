import Layout from "@/components/Layout";
import Link from "next/link";

export default function Sites() {
  return (
    <Layout>
      <Link className="linkAddButton" href={"/Sites/new"}>
        Add a new site
      </Link>
    </Layout>
  );
}
