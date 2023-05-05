import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
{
  /* logged in as {session.user.email} */
} //put in settings

export default function Layout({ children }) {
  // const { data: session } = useSession();
  // if (!session) {
  //   return (
  //     <div className="bg-green-300 w-screen h-screen flex items-center">
  //       <div className="text-center w-full">
  //         <button
  //           onClick={() => signIn("google")}
  //           className="bg-white p-2 px-4 rounded-lg"
  //         >
  //           login
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="min-h-screen flex bg-green-700">
      <Nav />
      <div className="bg-white flex-grow my-4 mr-4 shadow-lg rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}
