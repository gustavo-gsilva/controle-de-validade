export type Product = {
   id: number;
   name: string;
   brand: string;
   category: string;
   code: string;
};

export type ProductsResponse = {
   product: Product[];
   totalProduct: number;
};
