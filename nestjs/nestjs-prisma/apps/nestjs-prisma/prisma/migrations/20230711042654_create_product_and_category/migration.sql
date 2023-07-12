-- CreateTable
CREATE TABLE `User` (
    `userUUID` VARCHAR(36) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NULL,
    `createdAt` TIMESTAMP NOT NULL,
    `updatedAt` TIMESTAMP NOT NULL,

    UNIQUE INDEX `User_userUUID_key`(`userUUID`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userUUID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `postUUID` VARCHAR(36) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `content` VARCHAR(191) NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `authorId` VARCHAR(36) NULL,
    `createdAt` TIMESTAMP NOT NULL,
    `updatedAt` TIMESTAMP NOT NULL,

    UNIQUE INDEX `Post_postUUID_key`(`postUUID`),
    INDEX `Post_authorId_idx`(`authorId`),
    PRIMARY KEY (`postUUID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`userUUID`) ON DELETE SET NULL ON UPDATE CASCADE;
