import { NavLink } from "react-router-dom";

import logo from "../assets/logo.svg";
import dashBoardIcon from "../assets/dashboard_icon.svg";
import productsIcon from "../assets/products_icon.svg";
import batchesIcon from "../assets/batches_icon.svg";

const menuItems = [
   {
      label: "Dashboard",
      icon: dashBoardIcon,
      path: "/",
   },

   {
      label: "Produtos",
      icon: productsIcon,
      path: "/products",
   },

   {
      label: "Lotes",
      icon: batchesIcon,
      path: "/batches",
   },
];

function Slidebar() {
   return (
      <aside className="flex flex-col justify-between w-md h-screen bg-blue-950">
         <div className="flex flex-col">
            <img className="w-32" src={logo} alt="Logo" />

            <div className="border border-b-gray-300 mt-3"></div>

            <nav className="pr-5 pt-4">
               <ul>
                  {menuItems.map((item) => (
                     <li key={item.label}>
                        <NavLink
                           to={item.path}
                           className={({ isActive }) =>
                              `flex items-center gap-5 px-9 py-4 rounded-r-lg ${isActive ? "bg-blue-500 border-l-4 border-blue-800" : ""}`
                           }
                        >
                           <img
                              className="w-11"
                              src={item.icon}
                              alt="ícones de navegação"
                           />

                           <span className="text-2xl text-blue-100 font-medium">
                              {item.label}
                           </span>
                        </NavLink>
                     </li>
                  ))}
               </ul>
            </nav>
         </div>

         <div className="flex items-center gap-5 cursor-pointer bg-blue-900 duration-300 hover:bg-blue-500 px-9 py-4">
            <img
               className="rounded-4xl"
               src="https://placehold.co/40x40"
               alt="Foto de perfil"
            />

            <h3 className="text-2xl text-blue-100 font-medium">
               Perfil Placeholder
            </h3>
         </div>
      </aside>
   );
}

export default Slidebar;
