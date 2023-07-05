import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import {
  HomeIcon,
  ToolIcon,
  SaleIcon,
  CalendarIcon,
  MailIcon,
} from "@/assets/Icons";

export default function Nav() {
  const inactiveLink = "flex gap-2 p-2";
  const activeLink =
    inactiveLink + " bg-gray-800 shadow-lg gap-2 p-2  rounded-l-lg";
  const router = useRouter();
  const { pathname } = router;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <aside className="text-white p-4 pr-0">
      <nav className="flex flex-col gap-4">
        <Link
          className={
            pathname.includes("/Dashboard") ? activeLink : inactiveLink
          }
          href={"/Dashboard"}
        >
          <HomeIcon />
          <span>Dashboard </span>
        </Link>
        <Link
          className={pathname.includes("/Sites") ? activeLink : inactiveLink}
          href={"/Sites"}
        >
          <ToolIcon />
          <span>Construction </span>
        </Link>
        <Link
          className={pathname.includes("/ForSale") ? activeLink : inactiveLink}
          href={"/ForSale"}
        >
          <SaleIcon />

          <span> For Sale </span>
        </Link>
        <Link
          className={
            pathname.includes("/Newsletter") ? activeLink : inactiveLink
          }
          href={"/Newsletter"}
        >
          <MailIcon />

          <span> Newsletter </span>
        </Link>
        <Link
          className={pathname.includes("/Showings") ? activeLink : inactiveLink}
          href={"/Showings"}
        >
          <CalendarIcon />

          <span> Showings </span>
        </Link>
        <button className="btnRed mx-2" onClick={handleLogout}>
          Log out
        </button>
      </nav>
    </aside>
  );
}
