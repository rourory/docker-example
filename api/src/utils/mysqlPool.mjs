import mysql from 'mysql2';

const MYSQL_HOST = process.env.MYSQL_HOST || 'default_host';
const PORT = process.env.MYSQL_PORT || '3306';
const USER = process.env.MYSQL_USER || 'username';
const PASSWORD = process.env.MYSQL_ROOT_PASSWORD || 'password';
const DATABASE = process.env.MYSQL_DATABASE || 'default';

console.log('_____ALL THE ENVIRONMENT VARIABLES:______');
console.log(process.env);
console.log('_________________________________________');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: MYSQL_HOST,
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS times (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId);
    const createTimeTable = CREATE_TIMES_TABLE_SQL;
    connection.query(createTimeTable, (err) => {
      if (!err) {
        console.log('Times table was created');
      }
    });
    connection.release();
  }
});

export default pool;
