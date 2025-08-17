-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."users" (
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

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."user_auths" (
    "user_cert_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "encpt_pswd" TEXT NOT NULL,
    "resh_token" TEXT,
    "del_yn" BOOLEAN NOT NULL DEFAULT false,
    "crt_dt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updt_dt" TIMESTAMP(3) NOT NULL,
    "del_dt" TIMESTAMP(3),

    CONSTRAINT "user_auths_pkey" PRIMARY KEY ("user_cert_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_eml_addr_key" ON "public"."users"("eml_addr");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_nm_key" ON "public"."users"("user_nm");

-- CreateIndex
CREATE INDEX "users_eml_addr_idx" ON "public"."users"("eml_addr");

-- CreateIndex
CREATE INDEX "users_user_nm_idx" ON "public"."users"("user_nm");

-- CreateIndex
CREATE UNIQUE INDEX "user_auths_user_id_key" ON "public"."user_auths"("user_id");

-- AddForeignKey
ALTER TABLE "public"."user_auths" ADD CONSTRAINT "user_auths_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
