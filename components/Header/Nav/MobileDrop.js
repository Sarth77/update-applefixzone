"use client";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
const MobileDrop = ({ links, open, category }) => {
  return (
    <div
      className="fixed z-[100] h-full w-screen snap-none insert-0 l-0 top-0  backdrop-blur-xl bg-gray-500 bg-opacity-60 md:hidden"
      onClick={open && category}
    >
      <div className="m-2 bg-white rounded-xl p-5">
        <div className="flex items-center justify-between">
          <h1>Menu</h1>
          <div className="cursor-pointer">
            <IoCloseOutline
              className="w-7 h-7 hover:scale-110 transition-all"
              onClick={open}
            />
          </div>
        </div>
        <div className="mt-5 divide-y select-none">
          {links.map((link) => {
            return (
              <div key={link.display} onClick={open}>
              <Link
                href={link.href}
                className="block py-2 text-zinc-500 hover:bg-blue-100 transition-all"
              >
                <div className="select-none">{link.display}</div>
              </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileDrop;
