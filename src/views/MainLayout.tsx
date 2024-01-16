
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-backgroundGray min-h-screen">
      <div className="px-5 py-3  bg-primary ">
        <div className=" mx-auto max-w-7xl">
          <div className=" bg-[#ffff] pt-2 pb-2 p-2 inline-block ">
            {/* <img src={HeaderLogo} alt="Rikcy and Morty" className="w-40 h-10" /> */}
            <h1 className="font-bold text-primary ">Ricky and Morty</h1>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
