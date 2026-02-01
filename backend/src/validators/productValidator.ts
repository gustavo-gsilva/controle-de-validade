export function validateCreateProduct(data: any) {
   const { name, brand, category } = data;

   if (!name || !brand || !category) {
      throw new Error("Campos obrigatórios não informados.");
   }

   return {
      // O trim impede cadastrar um produto com espaços no inicío ou final da string EX: "Sabão "
      name: name.trim(),
      brand: brand.trim(),
      category,
   };
}

export function validateProductId(id: unknown): number {
   const parseId = Number(id);

   if (!Number.isInteger(parseId) || parseId <= 0) {
      throw new Error("O id informado é invalido");
   }

   return parseId;
}
