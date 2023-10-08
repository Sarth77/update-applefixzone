import Head from "./Head";
import Navbar from "./Navbar";
import Search from "./Search";
const Header = () => {
  return (
    <>
      <div className="top-0 sticky z-[80] bg-white">
        <div className="hidden md:block">
          <Head />
        </div>
        <Search />
        <Navbar />
      </div>
    </>
  );
};

export default Header;
