require('dotenv').config()

const ormconfig = {
  "driver": "postgres",
  "type": "postgres",
  "port": 5432,
  "host"   : process.env.DB_HOST,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database":  process.env.DB_NAME,
  "entities": ["dist/**/**.entity.js"],
  "migrations": [
    "src/migration/*.ts"
  ],
  "seeds": [
    "seeds/**/*.seed.ts"
  ],
  "cli": {
    "migrationsDir": "src/migration"
  },
  "synchronize": true
}
if (process.env.NODE_ENV == 'prod' && process.env.START) {
  ormconfig.entities = ["dist/src/**/**.entity.js"];
  ormconfig.migrations = [
    "dist/src/migration/*.js"
  ];
  ormconfig.seeds = [
    "dist/seeds/**/*.seed.js"
  ];
} 
module.exports = ormconfig;