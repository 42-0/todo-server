-- CreateTable
CREATE TABLE `Todos` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `userId` BIGINT UNSIGNED NOT NULL,
    `checkedAt` TIMESTAMP(3),
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP(3),
    `deletedAt` TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(255),
    `lastName` VARCHAR(255),
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(95),
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `profileImage` VARCHAR(128),
    `provider` ENUM('GOOGLE', 'FACEBOOK', 'NAVER', 'KAKAO'),
    `uuid` BINARY(16) NOT NULL,
    `isChecked` BOOLEAN,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP(3),
    `deletedAt` TIMESTAMP(3),

    UNIQUE INDEX `Users.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Todos` ADD FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
