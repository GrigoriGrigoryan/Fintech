import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitDatabase1690319402559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'analytics',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'from',
            type: 'varchar',
          },
          {
            name: 'to',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'varchar',
          },
          {
            name: 'blockNumber',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('analytics');
  }
}
