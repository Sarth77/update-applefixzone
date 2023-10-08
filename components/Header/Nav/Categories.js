import { useRouter } from "next/navigation";
const Categories = ({ close }) => {
  const router = useRouter();
  const data = [
    {
      cateImg:
        "https://firebasestorage.googleapis.com/v0/b/applefixzone01.appspot.com/o/Boards%2F11-DONOR.png?alt=media&token=9cc796ac-f10c-4b09-8859-a7b828f16780",
      cateName: "motherboards",
      path: "Boards",
    },
    {
      cateImg:
        "https://firebasestorage.googleapis.com/v0/b/applefixzone01.appspot.com/o/Battery%2Fapple-iphone-11-battery.png?alt=media&token=b1357502-4e84-488d-9561-32059e913e42",
      cateName: "batteries",
      path: "battery",
    },
    {
      cateImg:
        "https://firebasestorage.googleapis.com/v0/b/applefixzone01.appspot.com/o/Displays%2FIPHONE-11-COMBO-500x500.png?alt=media&token=ffe43f80-e0f5-4094-af52-611d96990736",
      cateName: "Screens",
      path: "display",
    },
  ];
  const handleClick = (path) => {
    close();
    router.push(`/category/${path}`);
  };
  return (
    <>
      <div className="w-auto fixed z-[99999] border shadow-md h-auto py-[15px] px-0 rounded bg-white border-t-0 mt-1 ">
        {data.map((value, index) => {
          return (
            <div
              className="flex bg-white items-center justify-between p-2 m-3 hover:bg-blue-100 rounded-r-lg cursor-pointer border-l-transparent hover:border-l-blue-400 border-l-4"
              key={index}
              onClick={() => handleClick(value.path)}
            >
              <span className="capitalize">{value.cateName}</span>
              <img
                src={value.cateImg}
                alt={value.cateName}
                className="w-[30px] h-[30px] object-contain"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
