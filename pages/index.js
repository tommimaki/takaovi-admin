import { useState, useEffect } from "react";

import Layout from "@/components/Layout";
import { auth } from "../firebase";

export default function Home() {
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
    </Layout>
  );
}
