import Layout from "@/components/Layout";
import ConstructionSitesData from "@/components/DashComponents/ConstructionSitesData";
import ForSaleData from "@/components/DashComponents/ForSaleData";
import NewsletterData from "@/components/DashComponents/NewsletterData";
import ShowingsData from "@/components/DashComponents/ShowingsData/";
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
        <div className="text-center text-xl my-4">
          {user ? (
            <p>Welcome! User with email: {user.email}.</p>
          ) : (
            <p>You are not signed in</p>
          )}
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="grid grid-cols-2 grid-rows-2  gap-4 h-full w-full grid-container">
            <div className="col-span-1 row-span-1 shadow-xl border-2 border-green-600 rounded-lg  flex-grow items-stretch">
              <ConstructionSitesData />
            </div>
            <div className="col-span-1 row-span-1 flex flex-grow border-2 border-green-600 rounded-lg shadow-xl items-stretch">
              <ForSaleData />
            </div>
            <div className="col-span-1 row-span-1 flex  border-2 border-green-600 rounded-lg shadow-xl ">
              <NewsletterData />
            </div>
            <div className="col-span-1 row-span-1 flex  border-2 border-green-600 rounded-lg shadow-xl ">
              <ShowingsData />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
