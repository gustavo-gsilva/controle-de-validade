import DashboardLayout from "../layouts/DashboardLayout";
import { getProducts } from "../services/productService";
import type { Product } from "../types/productTypes";

import plusIcon from "../assets/plus-icon-white.svg";

import { useState, useEffect } from "react";

function ProductsComponent() {
   const [products, setProducts] = useState<Product[]>([]);

   async function loadProducts() {
      const productData = await getProducts();

      setProducts(productData);
   }

   useEffect(() => {
      loadProducts();
   }, []);

   return (
      <DashboardLayout>
         <section className="mx-11 mt-8">
            <div className="bg-blue-50 rounded-2xl py-7">
               <div className="flex justify-between items-center px-8">
                  <h2 className="text-[1.7rem] font-medium">Produtos</h2>

                  <button className="flex items-center gap-2.5 bg-blue-500 text-blue-50 text-[1.3rem] font-medium cursor-pointer rounded-[0.6rem] px-6 py-3">
                     <img
                        className="w-8"
                        src={plusIcon}
                        alt="ícone de adicionar produto"
                     />
                     Adicionar Produto
                  </button>
               </div>

               <div className="border border-b-gray-400 mt-7"></div>

               <div className="px-8 mt-7">
                  <div className="grid grid-cols-4 bg-gray-300 rounded-[0.4rem] py-3.5 px-5">
                     <p className="text-[1.3rem] font-medium text-gray-700">
                        Marca
                     </p>

                     <p className="text-[1.3rem] font-medium text-gray-700">
                        Nome
                     </p>

                     <p className="text-[1.3rem] font-medium text-gray-700">
                        Código
                     </p>

                     <p className="text-[1.3rem] font-medium text-gray-700">
                        Categoria
                     </p>
                  </div>

                  <div className="max-h-[55vh] overflow-y-auto scroll-smooth">
                     {products.map((product) => (
                        <div
                           key={product.id}
                           className="grid grid-cols-4 items-center border-b border-gray-400 px-5"
                        >
                           <p className="text-[1.4rem] font-medium py-5">
                              {product.brand}
                           </p>

                           <p className="text-[1.4rem] font-medium">
                              {product.name}
                           </p>

                           <p className="text-[1.4rem] font-medium text-gray-700">
                              {product.code}
                           </p>

                           <p className="text-[1.4rem] font-medium text-gray-700">
                              {product.category}
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

export default ProductsComponent;
