import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import SitesData from "@/components/SitesData";

export default function Sites() {
  return (
    <Layout>
      <SitesData />
    </Layout>
  );
}
