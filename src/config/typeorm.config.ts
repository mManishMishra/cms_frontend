import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

import config from '../config';

const databaseConfig = config().database;

export const dbConfig: DataSourceOptions = {
  type: databaseConfig.type as any,
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.name,
  ssl: false,
  entities: [join(__dirname, '../', '**/', '*.entity.{ts,js}')],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: databaseConfig.synchronize as any,
  logging: true,
  logger: 'advanced-console',
  uuidExtension: 'uuid-ossp',
};
// console.log(dbConfig);
