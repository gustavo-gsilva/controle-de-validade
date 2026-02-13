/*
  Warnings:

  - A unique constraint covering the columns `[product_id,batch_code]` on the table `batch` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "batch_product_id_batch_code_key" ON "batch"("product_id", "batch_code");
