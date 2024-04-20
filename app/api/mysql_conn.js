// import mysql from 'mysql2/promise';
const mysql =require ('mysql2');

const MySQL_Conn=mysql.createConnection({
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

MySQL_Conn.connect(err=>{
console.log('\n\nTrying to make connection\n\n')  
if(err)  console.log('ERROR Connecting to MySQL Database', err)
else     console.log('Successfully Connected to MySQL Database')

})

// export default MySQL_Conn;
module.exports = MySQL_Conn