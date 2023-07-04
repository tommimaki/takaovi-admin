import { useState, useEffect } from "react";

import Layout from "@/components/Layout";
import { auth } from "../firebase";
import Dashboard from "./Dashboard";

export default function Home() {
  return <Dashboard />;
}
