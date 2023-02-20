/*
  Warnings:

  - You are about to drop the column `city` on the `Sale` table. All the data in the column will be lost.
  - Made the column `orderId` on table `Sale` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Sale` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Sale` DROP FOREIGN KEY `sale_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `Sale` DROP FOREIGN KEY `sale_userId_fkey`;

-- AlterTable
ALTER TABLE `Sale` DROP COLUMN `city`,
    ADD COLUMN `taxAmount` VARCHAR(191) NULL,
    MODIFY `orderId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
