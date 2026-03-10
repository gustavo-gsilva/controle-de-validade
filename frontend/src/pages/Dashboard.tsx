import DashboardLayout from "../layouts/DashboardLayout";

function DashBoard() {
   return (
      <div>
         <DashboardLayout>
            <div className="flex justify-center">
               <div>
                  <p>Total de Produtos</p>
               </div>

               <div>
                  <p>Lotes Válidos</p>
               </div>

               <div>
                  <p>Próximos do Vencimento</p>
               </div>

               <div>
                  <p>Lotes Vencidos</p>
               </div>
            </div>
         </DashboardLayout>
      </div>
   );
}

export default DashBoard;
