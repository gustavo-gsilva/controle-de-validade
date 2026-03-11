import { useLocation } from "react-router-dom";

import notificationIcon from "../assets/notification_bell_icon.svg";

function Header() {
   const location = useLocation();

   const pageTitles: Record<string, string> = {
      "/": "Dashboard",
      "/products": "Produtos",
      "/batches": "Lotes",
   };

   const title = pageTitles[location.pathname];

   return (
      <header className="w-full">
         <div className="h-31 flex justify-between items-center">
            <h1 className="text-3xl font-medium ml-11">{title}</h1>

            <div className="flex items-center gap-36">
               <div className="flex gap-2">
                  <p className="text-2xl font-light">Bem-vindo de volta,</p>

                  <strong className="text-2xl">Placeholder!</strong>
               </div>

               <div className="flex gap-10 mr-11">
                  <button className="cursor-pointer">
                     <img
                        className="w-9"
                        src={notificationIcon}
                        alt="ícone de notificação"
                     />
                  </button>

                  <img
                     className="rounded-4xl"
                     src="https://placehold.co/40x40"
                     alt="foto de perfil do usuário"
                  />
               </div>
            </div>
         </div>

         <div className="border border-b-gray-400"></div>
      </header>
   );
}

export default Header;
