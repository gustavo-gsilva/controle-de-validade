import { AppError } from "../errors/AppError.js";

export function validateBatchDates(
   entryDateImput: unknown,
   expirationDateImput: unknown
) {
   // Verificar se os valores existem e são string
   if (
      typeof entryDateImput !== "string" ||
      typeof expirationDateImput !== "string"
   ) {
      throw new AppError("As datas devem ser enviadas no formato string.");
   }

   // Converter para Date
   const entryDate = new Date(entryDateImput);
   const expirationDate = new Date(expirationDateImput);

   // Verificar se são datas válidas
   if (isNaN(entryDate.getTime()) || isNaN(expirationDate.getTime())) {
      throw new AppError("Uma ou ambas as datas são inválidas.");
   }

   // Criar referência do momento atual
   const now = new Date();

   // Regra: entry_date não pode estar no futuro
   if (entryDate > now) {
      throw new AppError("A data de entrada não pode estar no futuro.");
   }

   // Regra: expiration_date não pode estar no passado
   if (expirationDate < now) {
      throw new AppError("A data de validade não pode estar no passado.");
   }

   // Regra: validade não pode ser menor que entrada
   if (expirationDate <= entryDate) {
      throw new AppError(
         "A data de validade deve ser posterior à data de entrada."
      );
   }

   return { entryDate, expirationDate };
}
