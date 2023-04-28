import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  if (!session) return;
  return (
    <Layout>
      <div className="flex text-gray-900  bg-neutral-300  rounded-lg p-4 justify-between">
        <h2 className="my-auto">
          Hi, <b>{session?.user?.name} </b>!
        </h2>

        <div className="flex bg-slate-100 pr-2 rounded-md shadow-xl overflow-hidden gap-2">
          <img
            src={session?.user?.image}
            alt="goole profile img"
            className="w-6 h-6"
          />
          {session?.user?.email}
        </div>
      </div>
    </Layout>
  );
}
