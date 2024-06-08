import { auth } from "@/server/auth";
import {
  IconMail,
  IconPhone,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import Logo from "../../public/Logo/logo-1.png";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import UserButton from "./user-button";

export default async function Nav() {
  const session = await auth();

  return (
    <header>
      <div className="bg-gray-Pri text-white font-BLight text-sm p-2">
        <div className="container flex justify-between">
          <div>
            <p className="">Welcome to Eltern Technologies</p>
          </div>
          <div className="flex">
            <span className="flex mx-2 items-center">
              <IconMail stroke={1.5} className="mx-1 text-yellow-Sec" />
              <p className="py-[1px]">info@elterntech.com</p>
            </span>
            <span className="flex mx-2 items-center">
              <IconPhone stroke={1.5} className="mx-1 text-yellow-Sec" />
              <p className="py-[1px]">(800) 555‑0175</p>
            </span>
          </div>
        </div>
      </div>
      <div className="container bg-white font-BMedium text-md">
        <nav className="flex justify-between py-4 border-b-2 border-gray-One">
          <Link href={"/"}>
            <Image className="h-14" src={Logo} alt="Eltern-Technologies-Logo" />
          </Link>
          <ul className="flex items-center">
            <li>
              <Input className="py-2 px-2 mx-1 min-w-[36rem] md:min-w-[24rem] max-w-full cursor-pointer" />
            </li>
          </ul>
          <ul className="flex items-center">
            <li className="py-2 px-2 mx-1 hover:bg-slate-50 rounded-lg cursor-pointer">
              <Link href={"/about"}>About</Link>
            </li>
            <li className="py-2 px-2 mx-1 hover:bg-slate-50 rounded-lg cursor-pointer">
              <Link href={"/shop"}>Shop</Link>
            </li>
            <li className="py-2 px-2 mx-1 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center gap-1">
              <IconShoppingCart className="text-blue-Sec" />
              <span>Cart</span>
            </li>
            {session ? (
              <>
                <li>
                  <UserButton expires={session.expires} user={session.user} />
                </li>
              </>
            ) : (
              <li className="py-2 px-2 mx-1 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center gap-1">
                <Link href="/auth/signin">
                  <div className="flex items-center gap-1">
                    <IconUser className="text-blue-Sec" />
                    <span>Sign Up/Sign In</span>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
