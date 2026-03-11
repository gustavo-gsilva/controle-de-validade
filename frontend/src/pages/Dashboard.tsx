import { useState, useEffect } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getProducts } from "../services/productService";
import type { Product } from "../types/productTypes";

import { getBatchesValid } from "../services/batchService";
import type { Batch } from "../types/batchTypes";

function DashBoard() {
   // Variável de estado que armazena um array baseado no type Product
   const [products, setProducts] = useState<Product[]>([]);

   // Função que carrega os produtos e atualiza o estado products
   async function loadProducts() {
      try {
         const data = await getProducts();

         setProducts(data);
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      loadProducts();
   }, []);

   const totalQuantity = products.length;

   // Variável de estado que armazena um array baseado no type Batch
   const [batches, setBatches] = useState<Batch[]>([]);

   // Função que carrega os lotes válidos e atualiza o estado batches
   async function loadBatchesValid() {
      try {
         const data = await getBatchesValid();

         setBatches(data);
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      loadBatchesValid();
   }, []);

   const totalBatches = batches.length;

   return (
      <div>
         <DashboardLayout>
            <div className="flex justify-between mx-11 py-8">
               <div className="w-md h-44 bg-blue-500 rounded-2xl">
                  <p>Total de Produtos</p>

                  <p className="text-3xl">{totalQuantity}</p>
               </div>

               <div className="w-md h-44 bg-green-400 rounded-2xl">
                  <p>Lotes Válidos</p>

                  <p>{totalBatches}</p>
               </div>

               <div className="w-md h-44 bg-orange-300 rounded-2xl">
                  <p>Próximos do Vencimento</p>
               </div>

               <div className="w-md h-44 bg-red-600 rounded-2xl">
                  <p>Lotes Vencidos</p>
               </div>
            </div>

            <div className="border border-b-gray-400"></div>
         </DashboardLayout>
      </div>
   );
}

export default DashBoard;
