import { useState, useEffect } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getProducts } from "../services/productService";
import type { Product } from "../types/productTypes";

import {
   getBatchesValid,
   getBatchesExpiringInDays,
   getBatchesExpired,
} from "../services/batchService";
import type { Batch } from "../types/batchTypes";

function DashBoard() {
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
               <div className="w-md h-44 bg-blue-500 rounded-2xl p-8">
                  <p className="text-2xl text-blue-50 font-medium">
                     Total de Produtos
                  </p>

                  <p className="text-5xl text-blue-50 font-bold">
                     {productsQuantity}
                  </p>
               </div>

               <div className="w-md h-44 bg-green-400 rounded-2xl p-8">
                  <p className="text-2xl text-blue-50 font-medium">
                     Lotes Válidos
                  </p>

                  <p className="text-5xl text-blue-50 font-bold">
                     {batchesValidQuantity}
                  </p>
               </div>

               <div className="w-md h-44 bg-orange-300 rounded-2xl p-8">
                  <p className="text-2xl text-blue-50 font-medium">
                     Próximos do Vencimento
                  </p>

                  <p className="text-5xl text-blue-50 font-bold">
                     {batchesExpiringQuantity}
                  </p>
               </div>

               <div className="w-md h-44 bg-red-600 rounded-2xl p-8">
                  <p className="text-2xl text-blue-50 font-medium">
                     Lotes Vencidos
                  </p>

                  <p className="text-5xl text-blue-50 font-bold">
                     {batchesExpiredQuantity}
                  </p>
               </div>
            </div>

            <div className="border border-b-gray-400"></div>
         </DashboardLayout>
      </div>
   );
}

export default DashBoard;
