/*
  Warnings:

  - You are about to drop the column `tmpr_pswd` on the `user_cert_info` table. All the data in the column will be lost.
  - You are about to drop the column `tmpr_pswd_crt_dt` on the `user_cert_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."user_cert_info" DROP COLUMN "tmpr_pswd",
DROP COLUMN "tmpr_pswd_crt_dt";
