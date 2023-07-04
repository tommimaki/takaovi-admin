import Layout from "@/components/Layout";
import SitesData from "@/components/SitesData";
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
      <div>
        {user ? (
          <p>Welcome! User with email: {user.email}.</p>
        ) : (
          <p>You are not signed in</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold">Construction Sites</h2>
          <SitesData />
        </div>
      </div>
    </Layout>
  );
}
