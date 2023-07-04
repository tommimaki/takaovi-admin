import Layout from "@/components/Layout";
import ConstructionSitesData from "@/components/DashComponents/ConstructionSitesData";
import ForSaleData from "@/components/DashComponents/ForSaleData";
import NewsletterData from "@/components/DashComponents/NewsletterData";
import ShowingsData from "@/components/Dashcomponents/ShowingsData/";
import { useState, useEffect } from "react";
import { auth } from "../firebase";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div>
          {user ? (
            <p>Welcome! User with email: {user.email}.</p>
          ) : (
            <p>You are not signed in</p>
          )}
        </div>
        <div className="flex flex-1 overflow-hidden">
          <h1> in progress</h1>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
            <div className="col-span-1 row-span-1 flex items-stretch">
              <h2 className="text-lg font-semibold">Construction Sites</h2>
              <ConstructionSitesData />
            </div>
            <div className="col-span-1 row-span-1 flex items-stretch">
              <h2 className="text-lg font-semibold">For Sale</h2>
              <ForSaleData />
            </div>
            <div className="col-span-1 row-span-1 flex items-stretch">
              <h2 className="text-lg font-semibold">Newsletter</h2>
              <NewsletterData />
            </div>
            <div className="col-span-1 row-span-1 flex items-stretch">
              <h2 className="text-lg font-semibold">Showings</h2>
              <ShowingsData />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
