import DashboardLayout from "../layouts/DashboardLayout";
import { getBatches } from "../services/batchService";
import type { Batch } from "../types/batchTypes";

import plusIcon from "../assets/plus-icon-white.svg";

import { useState, useEffect } from "react";

function BatchesComponent() {
   const [batches, setBatches] = useState<Batch[]>([]);

   async function loadBatches() {
      const batchData = await getBatches();
      console.log(batchData);

      setBatches(batchData);
   }

   useEffect(() => {
      loadBatches();
   }, []);

   // Função que converte a data para o formato de calendário
   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("pt-BR");
   };

   return (
      <DashboardLayout>
         <section className="mx-11 mt-8">
            <div className="bg-blue-50 rounded-2xl py-7">
               <div className="flex justify-between items-center px-8">
                  <h2 className="text-[1.7rem] font-medium">Lotes</h2>

                  <button className="flex items-center gap-2.5 bg-blue-500 text-blue-50 text-[1.3rem] font-medium cursor-pointer rounded-[0.6rem] px-6 py-3">
                     <img
                        className="w-8"
                        src={plusIcon}
                        alt="ícone de adicionar produto"
                     />
                     Adicionar Lote
                  </button>
               </div>

               <div className="border border-b-gray-400 mt-7"></div>

               <div className="px-8 mt-7">
                  <div className="grid grid-cols-5 bg-gray-300 rounded-[0.4rem] py-3.5 px-5">
                     <p className="text-[1.3rem] font-medium text-gray-700">
                        Id
                     </p>

                     <p className="text-[1.3rem] font-medium text-gray-700">
                        Nome
                     </p>

                     <p className="text-[1.3rem] font-medium text-gray-700">
                        Código
                     </p>

                     <p className="text-[1.3rem] font-medium text-gray-700">
                        Entrada
                     </p>

                     <p className="text-[1.3rem] font-medium text-gray-700">
                        Vencimento
                     </p>
                  </div>

                  <div className="max-h-[55vh] overflow-y-auto scroll-smooth">
                     {batches.map((batch) => (
                        <div
                           key={batch.id}
                           className="grid grid-cols-5 items-center border-b border-gray-400 px-5"
                        >
                           <p className="text-[1.4rem] font-medium py-5">
                              {batch.id}
                           </p>

                           <p className="text-[1.4rem] font-medium text-gray-700">
                              {batch.product.name}
                           </p>

                           <p className="text-[1.4rem] font-medium text-gray-700">
                              {batch.batch_code}
                           </p>

                           <p className="text-[1.4rem] font-medium text-gray-700">
                              {formatDate(batch.entry_date)}
                           </p>

                           <p className="text-[1.4rem] font-medium text-gray-700">
                              {formatDate(batch.expiration_date)}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>
      </DashboardLayout>
   );
}

export default BatchesComponent;
