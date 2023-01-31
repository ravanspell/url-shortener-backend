import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { DATABASE_PROVIDER } from 'src/constants';
import { ShortLinks } from 'src/urlshorten/urlshorten.entity';

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDER,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: process.env.DB_DIALECT as Dialect,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([ShortLinks]);
      console.log('====================================');
      console.log('Database connected!');
      console.log('====================================');
      await sequelize.sync();
      console.log('====================================');
      console.log('Database items synced!');
      console.log('====================================');
      return sequelize;
    },
  },
];
