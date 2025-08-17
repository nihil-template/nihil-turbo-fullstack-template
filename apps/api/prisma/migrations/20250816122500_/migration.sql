/*
  Warnings:

  - You are about to drop the `user_auths` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."user_auths" DROP CONSTRAINT "user_auths_user_id_fkey";

-- DropTable
DROP TABLE "public"."user_auths";

-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "public"."user_info" (
    "user_id" TEXT NOT NULL,
    "eml_addr" TEXT NOT NULL,
    "user_nm" TEXT NOT NULL,
    "user_role" "public"."UserRole" NOT NULL DEFAULT 'USER',
    "profl_img" TEXT,
    "user_biogp" TEXT,
    "actvtn_yn" BOOLEAN NOT NULL DEFAULT true,
    "last_lgn_dt" TIMESTAMP(3),
    "crt_dt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updt_dt" TIMESTAMP(3) NOT NULL,
    "del_dt" TIMESTAMP(3),

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."user_cert_info" (
    "user_cert_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "encpt_pswd" TEXT NOT NULL,
    "resh_token" TEXT,
    "del_yn" BOOLEAN NOT NULL DEFAULT false,
    "crt_dt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updt_dt" TIMESTAMP(3) NOT NULL,
    "del_dt" TIMESTAMP(3),

    CONSTRAINT "user_cert_info_pkey" PRIMARY KEY ("user_cert_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_info_eml_addr_key" ON "public"."user_info"("eml_addr");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_user_nm_key" ON "public"."user_info"("user_nm");

-- CreateIndex
CREATE INDEX "user_info_eml_addr_idx" ON "public"."user_info"("eml_addr");

-- CreateIndex
CREATE INDEX "user_info_user_nm_idx" ON "public"."user_info"("user_nm");

-- CreateIndex
CREATE UNIQUE INDEX "user_cert_info_user_id_key" ON "public"."user_cert_info"("user_id");

-- AddForeignKey
ALTER TABLE "public"."user_cert_info" ADD CONSTRAINT "user_cert_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_info"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
