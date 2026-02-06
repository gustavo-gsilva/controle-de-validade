export function validateProduct(data: any) {
   const { name, brand, category, code } = data;

   if (!name || !brand || !category) {
      throw new Error("Campos obrigatórios não informados.");
   }

   return {
      // O trim impede cadastrar um produto com espaços no inicío ou final da string EX: "Sabão "
      name: name.trim(),
      brand: brand.trim(),
      category: category.trim(),
      code: code.trim(),
   };
}

export function validateUpdateProduct(data: any) {
   const { name, brand, category, code } = data;

   const updateData: any = {};

   if (typeof name === "string" && name.trim() !== "") {
      updateData.name = data.name.trim();
   }

   if (typeof brand === "string" && brand.trim() !== "") {
      updateData.brand = data.brand.trim();
   }

   if (typeof category === "string" && category.trim() !== "") {
      updateData.category = data.category.trim();
   }

   if (typeof code === "string" && code.trim() !== "") {
      updateData.code = data.code.trim();
   }

   // Se nenhum campo válido foi enviado → erro
   if (Object.keys(updateData).length === 0) {
      throw new Error("Nenhum campo válido para atualização.");
   }

   return updateData;
}

export function validateProductId(id: unknown): number {
   const parseId = Number(id);

   if (!Number.isInteger(parseId) || parseId <= 0) {
      throw new Error("O ID informado é invalido");
   }

   return parseId;
}
