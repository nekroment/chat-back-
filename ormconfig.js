const ormconfig = {
  "driver": "postgres",
  "type": "postgres",
  "port": 5432,
  "host"   : process.env['DB_HOST'] || "localhost",
  "username": process.env['DB_USER'] || "postgres",
  "password": process.env['DB_PASS'] || "382001a",
  "database":  process.env['DB_NAME'] || "chat",
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