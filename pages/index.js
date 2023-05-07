// import Layout from "@/components/Layout";
// import { useRouter } from "next/router";

// export default function Home() {
//   return (
//     <Layout>
//       <div className="flex text-gray-900  bg-neutral-300  rounded-lg p-4 justify-between">
//         <h2 className="my-auto">
//           Hi, <b>{session?.user?.name} </b>!
//         </h2>

//         <div className="flex bg-slate-100 pr-2 rounded-md shadow-xl overflow-hidden gap-2">
//           <img
//             src={session?.user?.image}
//             alt="goole profile img"
//             className="w-6 h-6"
//           />
//           {session?.user?.email}
//         </div>
//       </div>
//     </Layout>
//   );
// }
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
