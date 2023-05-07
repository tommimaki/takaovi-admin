import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";

import Nav from "@/components/Nav";
import SignIn from "@/components/SignIn";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="min-h-screen flex bg-green-700">
      <Nav />
      <div className="bg-white flex-grow my-4 mr-4 shadow-lg rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}
