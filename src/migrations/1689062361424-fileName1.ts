import { MigrationInterface, QueryRunner } from "typeorm";

export class fileName11689062361424 implements MigrationInterface {
    name = 'fileName11689062361424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`path\` varchar(255) NULL, \`methods\` varchar(255) NULL, \`data\` varchar(255) NULL, \`result\` int NOT NULL DEFAULT '0', \`userkId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`gender\` int NOT NULL, \`photo\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NULL, \`password\` varchar(255) NULL, \`courseName\` varchar(255) NULL, \`profileId\` int NULL, UNIQUE INDEX \`REL_9466682df91534dd95e4dbaa61\` (\`profileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_roles_rel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`rolesId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_auth_rel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rolesId\` int NULL, \`authId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`auth\` (\`id\` int NOT NULL AUTO_INCREMENT, \`authName\` varchar(255) NULL, \`authLevel\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`staff\` (\`id\` int NOT NULL AUTO_INCREMENT, \`staffID\` varchar(255) NULL, \`staffName\` varchar(255) NULL, \`deptment\` varchar(255) NULL, \`email\` varchar(255) NULL, \`age\` varchar(255) NULL, \`gender\` varchar(255) NULL, \`phoneNum\` varchar(255) NULL, \`kpiScore\` float NOT NULL, \`address\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles\` (\`userId\` int NOT NULL, \`rolesId\` int NOT NULL, INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` (\`userId\`), INDEX \`IDX_21db462422f1f97519a29041da\` (\`rolesId\`), PRIMARY KEY (\`userId\`, \`rolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`courseName\``);
        await queryRunner.query(`DROP INDEX \`REL_9466682df91534dd95e4dbaa61\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profileId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`courseName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_9466682df91534dd95e4dbaa61\` (\`profileId\`)`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD UNIQUE INDEX \`IDX_a24972ebd73b106250713dcddd\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`path\` \`path\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`methods\` \`methods\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`data\` \`data\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`result\` \`result\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_9466682df91534dd95e4dbaa61\` ON \`user\` (\`profileId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`logs\` ADD CONSTRAINT \`FK_29864bd109efa96a1c114242616\` FOREIGN KEY (\`userkId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9466682df91534dd95e4dbaa616\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_roles_rel\` ADD CONSTRAINT \`FK_6365b7a2483cbf5fc517d0449d7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_roles_rel\` ADD CONSTRAINT \`FK_ef042c20f0169f7dc642738c6c4\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_auth_rel\` ADD CONSTRAINT \`FK_5f5a080b761ba0d727d06c6972a\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_auth_rel\` ADD CONSTRAINT \`FK_0c5d17785097dd1c20408fcd7a6\` FOREIGN KEY (\`authId\`) REFERENCES \`auth\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_776b7cf9330802e5ef5a8fb18dc\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_21db462422f1f97519a29041da0\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_21db462422f1f97519a29041da0\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_776b7cf9330802e5ef5a8fb18dc\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`ALTER TABLE \`roles_auth_rel\` DROP FOREIGN KEY \`FK_0c5d17785097dd1c20408fcd7a6\``);
        await queryRunner.query(`ALTER TABLE \`roles_auth_rel\` DROP FOREIGN KEY \`FK_5f5a080b761ba0d727d06c6972a\``);
        await queryRunner.query(`ALTER TABLE \`user_roles_rel\` DROP FOREIGN KEY \`FK_ef042c20f0169f7dc642738c6c4\``);
        await queryRunner.query(`ALTER TABLE \`user_roles_rel\` DROP FOREIGN KEY \`FK_6365b7a2483cbf5fc517d0449d7\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9466682df91534dd95e4dbaa616\``);
        await queryRunner.query(`ALTER TABLE \`logs\` DROP FOREIGN KEY \`FK_29864bd109efa96a1c114242616\``);
        await queryRunner.query(`DROP INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\``);
        await queryRunner.query(`DROP INDEX \`REL_9466682df91534dd95e4dbaa61\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`result\` \`result\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`data\` \`data\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`methods\` \`methods\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`logs\` CHANGE \`path\` \`path\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP INDEX \`IDX_a24972ebd73b106250713dcddd\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_9466682df91534dd95e4dbaa61\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profileId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`courseName\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profileId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_9466682df91534dd95e4dbaa61\` ON \`user\` (\`profileId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`courseName\` varchar(255) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_21db462422f1f97519a29041da\` ON \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` ON \`users_roles\``);
        await queryRunner.query(`DROP TABLE \`users_roles\``);
        await queryRunner.query(`DROP TABLE \`staff\``);
        await queryRunner.query(`DROP TABLE \`auth\``);
        await queryRunner.query(`DROP TABLE \`roles_auth_rel\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`user_roles_rel\``);
        await queryRunner.query(`DROP INDEX \`REL_9466682df91534dd95e4dbaa61\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
        await queryRunner.query(`DROP TABLE \`logs\``);
    }

}
