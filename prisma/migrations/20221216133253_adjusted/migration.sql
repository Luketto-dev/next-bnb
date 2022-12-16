/*
  Warnings:

  - You are about to alter the column `price` on the `apartment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `apartment` MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(500) NOT NULL;
