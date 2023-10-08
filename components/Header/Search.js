import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";
import Cart from "../Buttons/Cart";

const Search = () => {
  return (
    <>
      <section className="px-0 py-[20px] w-full">
        <div className="max-w-[90%] m-auto flex justify-between items-center gap-x-4">
          <div className="flex items-center gap-x-2 justify-start">
            <Link href="/">
              <div className="w-[2.5rem] h-[2.5rem]">
                <Image
                  className=" object-cover"
                  src={logo}
                  alt="logo"
                />
              </div>
            </Link>
            <div className="hidden lg:flex">
              <Link href="/">
                <h1 className="text-xl font-semibold text-black">
                  AppleFixZone
                </h1>
              </Link>
            </div>
          </div>
          <div className="hidden xs:flex w-[60%] border-2 border-solid text-center opacity-50 rounded-full items-center flex-wrap">
            <SearchBar />
          </div>
          <div className="icon flex items-center text-xl justify-end select-none">
            <div className="flex items-center gap-x-6 select-none">
              <div className="bg-[#f6f9fc] h-10 w-10 rounded-full flex justify-center items-center drop-shadow-md hover:scale-110 cursor-pointer select-none focus-none outline-none">
                <ProfileMenu />
              </div>
              <div className="bg-[#f6f9fc] h-10 w-10 rounded-full flex justify-center items-center drop-shadow-md hover:scale-110 select-none focus-none outline-none">
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
