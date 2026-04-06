import { DataSource } from 'typeorm';
import { dbConfig } from './typeorm.config';

const dataSource = new DataSource(dbConfig);
dataSource.initialize();
export default dataSource;
