import { useState, useEffect } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import checkIcon from "../assets/check_icon_white.svg";
import warningIcon from "../assets/warning_triangle_icon_white.svg";
import trendIcon from "../assets/trend_chart_icon_white.svg";

import { getProducts } from "../services/productService";

import {
   getBatchesValid,
   getBatchesExpiringInDays,
   getBatchesExpired,
} from "../services/batchService";
import type { Batch } from "../types/batchTypes";
import type { Product } from "../types/productTypes";

function Cards() {
   // Variáveis de estado que armazenam arrays baseados nos types
   const [products, setProducts] = useState<Product[]>([]);
   const [batches, setBatches] = useState<Batch[]>([]);
   const [expiring, setExpiring] = useState<Batch[]>([]);
   const [expired, setExpired] = useState<Batch[]>([]);

   // Função que carrega os informações gerais e atualiza as variáveis de estado
   useEffect(() => {
      async function loadCardsDashboard() {
         try {
            const productsData = await getProducts();
            const batchesValidData = await getBatchesValid();
            const batchesExpiringData = await getBatchesExpiringInDays();
            const batchesExpiredData = await getBatchesExpired();

            setProducts(productsData);
            setBatches(batchesValidData);
            setExpiring(batchesExpiringData);
            setExpired(batchesExpiredData);
         } catch (error) {
            console.error(error);
         }
      }

      loadCardsDashboard();
   }, []);

   const productsQuantity = products.length;
   const batchesValidQuantity = batches.length;
   const batchesExpiringQuantity = expiring.length;
   const batchesExpiredQuantity = expired.length;

   return (
      <div>
         <DashboardLayout>
            <div className="flex justify-between mx-11 py-8">
               <div className="w-md h-44 bg-blue-500 rounded-2xl p-8 relative">
                  <p className="text-2xl text-blue-50 font-medium">
                     Total de Produtos
                  </p>

                  <p className="text-5xl text-blue-50 font-bold mt-1.5">
                     {productsQuantity}
                  </p>

                  <div className="absolute right-7 bottom-5 bg-blue-400 rounded-lg px-2">
                     <button className="text-4xl text-blue-50 font-bold mb-2 cursor-pointer">
                        +
                     </button>
                  </div>
               </div>

               <div className="w-md h-44 bg-green-700 rounded-2xl p-8 relative">
                  <p className="text-2xl text-blue-50 font-medium">
                     Lotes Válidos
                  </p>

                  <p className="text-5xl text-blue-50 font-bold mt-1.5">
                     {batchesValidQuantity}
                  </p>

                  <div className="absolute right-7 bottom-5 bg-green-600 rounded-lg px-1.5 py-1.5">
                     <img
                        className="w-9"
                        src={checkIcon}
                        alt="ícone de check"
                     />
                  </div>
               </div>

               <div className="w-md h-44 bg-orange-400 rounded-2xl p-8 relative">
                  <p className="text-2xl text-blue-50 font-medium">
                     Próximos do Vencimento
                  </p>

                  <p className="text-5xl text-blue-50 font-bold mt-1.5">
                     {batchesExpiringQuantity}
                  </p>

                  <div className="absolute right-7 bottom-5 bg-orange-300 rounded-lg px-1.5 py-1.5">
                     <img
                        className="w-9"
                        src={warningIcon}
                        alt="ícone de atenção"
                     />
                  </div>
               </div>

               <div className="w-md h-44 bg-red-800 rounded-2xl p-8 relative">
                  <p className="text-2xl text-blue-50 font-medium">
                     Lotes Vencidos
                  </p>

                  <p className="text-5xl text-blue-50 font-bold mt-1.5">
                     {batchesExpiredQuantity}
                  </p>

                  <div className="absolute right-7 bottom-5 bg-red-500 rounded-lg px-1.5 py-1.5">
                     <img
                        className="w-9"
                        src={trendIcon}
                        alt="ícone de trend"
                     />
                  </div>
               </div>
            </div>

            <div className="border border-b-gray-400"></div>
         </DashboardLayout>
      </div>
   );
}

export default Cards;
