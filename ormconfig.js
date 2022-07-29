module.exports = {
  type: 'mysql',
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  synchronize: true,
  entities: ['dist/entities/**{.ts,.js}'],
  cli: {
    'entitiesDir': 'src/entities'
  }
};
