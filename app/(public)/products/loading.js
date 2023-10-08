import Image from "next/image";
import FormatPrice from "@/helper/FormatPrice";
export default function StoresLoading() {

   const curElem ={
    picture: "/Loading-icon.gif",
    name:"Loading..",
    description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    price:999,
   }
  return (
    <section className="bg-[#fff]">
    <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
      <h1 className="text-black text-2xl font-semibold font-sans mb-4">
        All Products
      </h1>
      <div className="my-[2em] mx-0 grid gap-12 grid-cols-autofill place-items-center place-content-center">
      {Array.from({ length: 12 }).map((_, i) => (
                 <div className="w-52  flex flex-col" key={i}>
                   <div className="bg-blue-100 p-5 h-52 rounded-xl overflow-hidden relative flex items-center justify-center">
                     <Image
                       width={208}
                       height={208}
                       src={curElem.picture}
                       alt="productpicture"
                       className="w-[100%] h-[100%] object-contain"
                     />
                   </div>
                   <div className="mt-2">
                     <h3 className="font-bold capitalize truncate">{curElem.name}</h3>
                   </div>
                   <p className="text-sm mt-1 leading-4 text-gray-500 h-20">
                     {curElem.description.slice(0, 90)}...Read More
                   </p>
                 <div className="flex">
                   <div className="text-2xl font-bold grow flex gap-3">
                     <h3>
                       <FormatPrice price={curElem.price} />
                     </h3>
                   </div>
                   <button
                     className="bg-emerald-400 drop-shadow-md hover:scale-105 hover:bg-emerald-500 text-white px-3 rounded-xl flex justify-center items-center"
                   >
                     +
                   </button>
                 </div>
               </div>
        ))}
      </div>
    </div>
  </section>
  )
}