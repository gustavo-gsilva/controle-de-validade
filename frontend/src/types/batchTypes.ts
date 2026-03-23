export type Batch = {
   id: number;
   product_id: number;
   product: {
      id: number;
      name: string;
   };
   batch_code: string;
   expiration_date: string;
   entry_date: string;
};
