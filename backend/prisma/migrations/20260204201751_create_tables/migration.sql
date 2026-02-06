-- CreateTable
CREATE TABLE "batch" (
    "id" BIGSERIAL NOT NULL,
    "product_id" BIGINT NOT NULL,
    "batch_code" VARCHAR(50) NOT NULL,
    "expiration_date" DATE NOT NULL,
    "entry_date" DATE NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "brand" VARCHAR(100) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "code" VARCHAR(50),
    "image_url" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_batch_product_id" ON "batch"("product_id");

-- AddForeignKey
ALTER TABLE "batch" ADD CONSTRAINT "batch_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
