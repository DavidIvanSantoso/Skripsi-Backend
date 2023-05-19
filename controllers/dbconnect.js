const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api_backend',
  password: '123456',
  port: 5432,
})
// setInterval(() => {
//   if (pool.idleCount > 0) {
//     console.log(`Closing ${pool.idleCount} idle connections`);
//     pool.destroyAllNow();
//   }
// }, 30000);

module.exports = pool;