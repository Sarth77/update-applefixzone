"use client";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import MobileDrop from "./MobileDrop";
import Categories from "./Categories";
const MobileMenu = ({ links }) => {
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  return (
    <>
      <div className="flex justify-between max-w-[90%] m-auto">
        <div
          className="flex relative items-center bg-[#f6f9fc] py-1 px-2 text-xl rounded drop-shadow cursor-pointer select-none gap-1"
          onClick={() => setOpenCategory((prev) => !prev)}
        >
          <div>
            <BiCategory />
          </div>
          <div className="text-zinc-600">Categories</div>
          <div className="">
            {openCategory ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
          </div>
        </div>
        <div className="mt-1">
          <div
            className="text-xl pt-1 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <AiOutlineMenu />
          </div>
        </div>
      </div>
      {open ? (
        <MobileDrop
          links={links}
          open={() => setOpen(false)}
          category={() => setOpenCategory(false)}
        />
      ) : (
        <></>
      )}
      {openCategory ? (
        <div className="absolute left-[5%] rounded">
          <Categories close={() => setOpenCategory(false)} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MobileMenu;
