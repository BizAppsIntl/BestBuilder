import mysql from 'mysql2/promise';

console.log('\n\n\n\Trying to create Pool for GET Request for Items-Pool: \n', 
`Host: ${process.env.NEXT_PUBLIC_HOST}\n,  User: ${process.env.NEXT_PUBLIC_USER}\n,  DB: ${process.env.NEXT_PUBLIC_DB}\n,  PW: ${process.env.NEXT_PUBLIC_PW} \n`)

const pool = mysql.createPool({
  // host:'localhost',
  // user:'bizapps_DB',
  // password:'EY4GxCbTJLLXkgVMbgP9',
  // database:'bizapps_DB',

  host:process.env.NEXT_PUBLIC_HOST,
  user:process.env.NEXT_PUBLIC_USER,
  password:process.env.NEXT_PUBLIC_PW,
  database:process.env.NEXT_PUBLIC_DB,

  // acquireTimeout: 30000, //30 secs
  acquireTimeout: 300000, //300 secs

  waitForConnections:'true',
   connectionLimit:50,
   queueLimit:0
});

export default pool;